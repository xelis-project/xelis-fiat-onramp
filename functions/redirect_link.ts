import { Ctx } from "../global";

export async function onRequest(ctx: Ctx) {
  

  return new Response(JSON.stringify(""), {
    headers: { "Content-Type": "application/json" }
  })
}