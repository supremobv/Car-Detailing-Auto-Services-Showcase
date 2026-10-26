import { requireChatGPTUser } from "../chatgpt-auth";
import Inbox from "./service-inbox";
export const dynamic = "force-dynamic";
export default async function Page() {
  await requireChatGPTUser("/studio");
  return <Inbox />;
}
