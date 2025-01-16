import { EventContext } from "@cloudflare/workers-types";

interface Env {
  COINON_API_KEY: string;
  COINON_PARTNER_ID: string;
}

type Ctx = EventContext<Env, any, any>;