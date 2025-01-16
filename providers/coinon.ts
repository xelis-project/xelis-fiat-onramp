import md5 from 'md5';
import queryString from 'query-string';

//let api_endpoint = `https://onramp-api.coinon.io`;
let api_endpoint = `https://onramp-api-dev.coinpal.io`;
let quote_page_link = `https://onramp.coinon.io/edit`;

interface GetBuyQuoteParams {
  partnerID: string;
  apiKey: string;
  cryptoCurrency: string;
  fiatCurrency: string;
  requestTime?: string;
  fiatAmount?: string; // must have one of cryptoAmount or fiatAmount
  cryptoAmount?: string;
  sign?: string;
  ip: string;
  paymentMethod?: string;
  offerType?: string;
}

interface ApiResponse<T> {
  res: Response;
  data: T;
}

interface BuyQuoteData {
  quoteId: string;
  fiatCurrency: string;
  cryptoCurrency: string;
  fiatAmount: string;
  cryptoAmount: string;
  paymentMethod: string;
  offerType: string;
  totalFee: string;
  processingFee: number;
  networkFee: number;
  partnerFee: number;
}

interface GetBuyQuoteResponse {
  respCode: number;
  respMessage: string;
  data: BuyQuoteData;
}

async function get_buy_quote(params: GetBuyQuoteParams): Promise<ApiResponse<GetBuyQuoteResponse>> {
  params.requestTime = Date.now().toString();
  
  let sign = md5(`${params.partnerID}${params.apiKey}${params.cryptoCurrency}${params.fiatCurrency}${params.requestTime}`);
  params.sign = sign.toString();

  const res = await fetch(`${api_endpoint}/gateway/buying/quote`, {
    method: "POST",
    body: JSON.stringify(params)
  });

  const data = await res.json() as GetBuyQuoteResponse
  return { data, res }
}

interface RedirectLinkParams {
  defaultSendCurrency?: string;
  sendCurrency?: string;
  defaultGetCurrency?: string;
  getCurrency?: string;
  defaultSendCurrencyAmount?: string;
  sendCurrencyAmount?: string;
  defaultGetCurrencyAmount?: string;
  getCurrencyAmount?: string;
  token?: string;
  payMethod?: string;
  offerType?: string;
  address?: string;
}

function get_redirect_link(params: RedirectLinkParams) {
  const query = queryString.stringify(params);
  return `${quote_page_link}?${query}`
}

export default { get_buy_quote, get_redirect_link };
