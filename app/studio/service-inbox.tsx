"use client";
import { useState, useEffect } from "react";
import { ArrowLeft, RefreshCw, Download } from "lucide-react";
import { packages, vehicleSizes, extras, money } from "../detailing-data";
type Inquiry = {
  id: string;
  reference: string;
  name: string;
  email: string;
  phone: string;
  vehicle: string;
  vehicleSize: string;
  packageId: string;
  extras: string;
  estimate: number;
  date: string;
  time: string;
  message: string;
  status: string;
  createdAt: number;
};
export default function Inbox() {
  const [rows, setRows] = useState<Inquiry[]>([]),
    [message, setMessage] = useState("Loading service inquiries…"),
    [busy, setBusy] = useState(false);
  async function load() {
    setBusy(true);
    try {
      const r = await fetch("/api/inquiries");
      if (!r.ok) throw Error("Unable to load your service inbox.");
      setRows((await r.json()) as Inquiry[]);
      setMessage("");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Unable to load inquiries.");
    } finally {
      setBusy(false);
    }
  }
  useEffect(() => {
    void load();
  }, []);
  async function update(id: string, status: string) {
    try {
      const r = await fetch("/api/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (!r.ok) throw Error();
      setRows(rows.map((row) => (row.id === id ? { ...row, status } : row)));
      setMessage("Inquiry status updated.");
    } catch {
      setMessage("Unable to update inquiry. Please try again.");
    }
  }
  function exportRows() {
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(rows, null, 2)], { type: "application/json" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "refine-service-inquiries.json";
    a.click();
    URL.revokeObjectURL(url);
  }
  return (
    <main className="inbox">
      <a className="text-link" href="/">
        <ArrowLeft size={15} />
        BACK TO REFINE
      </a>
      <h1>
        LET’S GET
        <br />
        <em>INTO THE DETAILS.</em>
      </h1>
      <p>
        Studio inbox · {rows.length} inquiries · Privately hosted for the site
        owner.
      </p>
      <div className="inbox-actions">
        <button className="button acid" onClick={load} disabled={busy}>
          <RefreshCw size={15} />
          REFRESH INBOX
        </button>
        <button className="text-link" onClick={exportRows}>
          <Download size={15} />
          EXPORT JSON
        </button>
      </div>
      {message && (
        <div className="inbox-notice" role="status">
          {message}
        </div>
      )}
      {!busy && !rows.length && !message && (
        <div className="inbox-notice">
          Your next service inquiry will appear here. No appointments are
          confirmed automatically.
        </div>
      )}
      {rows.map((r) => (
        <article className="inbox-card" key={r.id}>
          <div className="inbox-row">
            <div>
              <span className="eyebrow">{r.reference}</span>
              <h3>{r.name}</h3>
            </div>
            <select
              aria-label={"Status for " + r.reference}
              value={r.status}
              onChange={(e) => update(r.id, e.target.value)}
            >
              {["New", "Contacted", "Assessment arranged", "Closed"].map(
                (s) => (
                  <option key={s}>{s}</option>
                ),
              )}
            </select>
          </div>
          <div className="inbox-meta">
            <a href={"mailto:" + r.email}>{r.email}</a>
            <span>{r.phone}</span>
            <span>
              {new Date(r.createdAt).toLocaleString("en-PH", {
                timeZone: "Asia/Manila",
              })}
            </span>
          </div>
          <p>
            <strong>{r.vehicle}</strong> ·{" "}
            {vehicleSizes.find((v) => v.id === r.vehicleSize)?.name}
          </p>
          <p>
            {packages.find((p) => p.id === r.packageId)?.name} · Sample estimate{" "}
            {money(r.estimate)}
          </p>
          <p>
            Extras:{" "}
            {(JSON.parse(r.extras) as string[])
              .map((id) => extras.find((e) => e.id === id)?.name)
              .join(", ") || "None"}
          </p>
          <p>
            {r.date} at {r.time} PHT · Preferred visit only, not a confirmed
            appointment
          </p>
          <p style={{ whiteSpace: "pre-wrap" }}>
            {r.message || "No additional notes."}
          </p>
        </article>
      ))}
    </main>
  );
}
