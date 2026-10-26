import { z } from "zod";
import { desc, eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { inquiries } from "../../../db/schema";
import { estimate, dateError } from "../../detailing-data";
import { getChatGPTUser } from "../../chatgpt-auth";
const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(40).default(""),
  vehicle: z.string().trim().min(1).max(160),
  packageId: z.enum(["reset", "deep", "paint", "ceramic"]),
  vehicleSize: z.enum(["compact", "sedan", "suv", "van"]),
  extras: z
    .array(z.enum(["headlights", "engine", "glass", "wheels"]))
    .max(4)
    .refine(
      (a) => new Set(a).size === a.length,
      "Select each extra only once.",
    ),
  date: z.string(),
  time: z.enum(["09:00", "11:00", "13:00", "15:00"]),
  message: z.string().trim().max(4000).default(""),
  consent: z.literal("on"),
});
export async function POST(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin)
    return Response.json({ error: "Invalid request origin." }, { status: 403 });
  if (Number(request.headers.get("content-length") || 0) > 14000)
    return Response.json({ error: "Inquiry too large." }, { status: 413 });
  try {
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success)
      return Response.json(
        {
          error:
            "Please check your contact details, vehicle, service, preferred arrival, and consent.",
        },
        { status: 400 },
      );
    const { consent, ...data } = parsed.data,
      issue = dateError(data.date);
    if (issue) return Response.json({ error: issue }, { status: 400 });
    const id = crypto.randomUUID(),
      reference = "RF-" + id.slice(0, 8).toUpperCase(),
      calculated = estimate(data).total;
    await getDb()
      .insert(inquiries)
      .values({
        ...data,
        extras: JSON.stringify(data.extras),
        estimate: calculated,
        id,
        reference,
        status: "New",
        createdAt: Date.now(),
      });
    return Response.json(
      { saved: true, reference, estimate: calculated },
      { status: 201 },
    );
  } catch {
    return Response.json(
      { error: "Unable to save your service inquiry. Please try again." },
      { status: 503 },
    );
  }
}
export async function GET() {
  if (!(await getChatGPTUser()))
    return Response.json({ error: "Sign in required." }, { status: 401 });
  try {
    return Response.json(
      await getDb()
        .select()
        .from(inquiries)
        .orderBy(desc(inquiries.createdAt))
        .limit(500),
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json(
      { error: "Unable to load service inbox." },
      { status: 503 },
    );
  }
}
export async function PATCH(request: Request) {
  if (!(await getChatGPTUser()))
    return Response.json({ error: "Sign in required." }, { status: 401 });
  if (request.headers.get("origin") !== new URL(request.url).origin)
    return Response.json({ error: "Invalid request origin." }, { status: 403 });
  try {
    const parsed = z
      .object({
        id: z.string().uuid(),
        status: z.enum(["New", "Contacted", "Assessment arranged", "Closed"]),
      })
      .safeParse(await request.json());
    if (!parsed.success)
      return Response.json(
        { error: "Invalid status update." },
        { status: 400 },
      );
    await getDb()
      .update(inquiries)
      .set({ status: parsed.data.status })
      .where(eq(inquiries.id, parsed.data.id));
    return Response.json({ saved: true });
  } catch {
    return Response.json(
      { error: "Unable to update service inquiry." },
      { status: 503 },
    );
  }
}
