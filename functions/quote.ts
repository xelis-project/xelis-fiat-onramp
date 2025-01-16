import { Request } from '@cloudflare/workers-types';

import coinon from "../providers/coinon"
import { Ctx } from '../global';

interface PaymentMethod {
  name: string;
  fee: number;
}

interface Offer {
  name: string;
  xelAmount: number;
  fee: number;
  paymentMethods: PaymentMethod[];
}

interface Quote {
  offers: Offer[];
}

interface QuoteParams {
  amount?: number;
  currency?: string;
}

function get_ip(request: Request) {
  let client_ip = request.headers.get("CF-Connecting-IP");
  if (!client_ip) {
    client_ip = request.headers.get("X-Forwarded-For");
  }

  return client_ip;
}

async function get_coinon_offer(ctx: Ctx, currency: string, fiat_amount: string): Promise<Offer> {
  const { request, env } = ctx;

  const client_ip = get_ip(request);

  const result = await coinon.get_buy_quote({
    apiKey: env.COINON_API_KEY,
    partnerID: env.COINON_PARTNER_ID,
    fiatCurrency: currency,
    cryptoCurrency: `XEL`,
    ip: client_ip || "54.251.1.0",
    fiatAmount: fiat_amount,
  });

  if (result.res.ok) {
    if (result.data.respCode === 200) {
      const data = result.data.data;

      return {
        name: "coinon",
        fee: data.networkFee,
        paymentMethods: [{
          name: data.paymentMethod,
          fee: data.processingFee,
        }],
        xelAmount: parseFloat(data.cryptoAmount)
      };
    } else {
      throw result.data.respMessage;
    }
  } else {
    throw result.res.statusText;
  }
}

export async function onRequest(ctx: Ctx) {
  let data = {} as QuoteParams;

  try {
    data = await ctx.request.json<QuoteParams>();
    if (!data.amount) {
      throw "Amount is empty.";
    }

    if (typeof data.amount !== `number`) {
      throw "Amount must be a number.";
    }

    if (!data.currency) {
      throw "Currency is empty."
    }

    if (typeof data.currency !== `string`) {
      throw "Currency must be a string."
    }
  } catch (err) {
    return new Response(JSON.stringify({ err }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }

  const quote = { offers: [] } as Quote;

  // CoinOn
  try {
    const offer = await get_coinon_offer(ctx, data.currency, data.amount.toString());
    quote.offers.push(offer);
  } catch (err) {
    console.log(err);
    // TODO
  }

  // easy to implement other providers here in the future

  return new Response(JSON.stringify(quote), {
    headers: { "Content-Type": "application/json" }
  })
}