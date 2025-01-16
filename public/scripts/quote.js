const input_amount = document.getElementById(`amount_input`);
const div_offers = document.getElementById(`offers`);
const div_payment_methods_wrap = document.getElementById(`payment_methods_wrap`);
const div_payment_methods = document.getElementById(`payment_methods`);
const div_quote_details = document.getElementById(`quote_details`);
const div_xel_quote = document.getElementById(`xel_quote`);
const input_address = document.getElementById(`input_address`);
const btn_continue = document.getElementById(`btn_continue`);

class Quote {
  currency_code = "USD";
  amount = 100;
  offer = null;
  payment_method = null;
  address = "";
  timer = 60;
  timer_id = null;
  loading = false;

  constructor() {
    select_currency.set_currency(this.currency_code);
    let input_amount_timeout_id;
    input_amount.addEventListener(`input`, (e) => {
      clearTimeout(input_amount_timeout_id);
      input_amount_timeout_id = setTimeout(() => {
        this.amount = parseFloat(e.target.value);
        this.load_quote();
      }, 250);
    });

    //let input_address_timeout_id;
    input_address.addEventListener(`input`, (e) => {
      //clearTimeout(input_address_timeout_id);
      //input_address_timeout_id = setTimeout(() => {
      this.address = e.target.value;
      //this.validate_address();
      //}, 250);
    });

    this.load_quote();
  }

  async load_quote() {
    //if (this.loading) return;
    //this.loading = true;

    this.stop_time_quote();
    this.set_loading_offers();
    this.set_loading_payment_methods();
    this.set_loading_xel_quote();
    btn_continue.classList.add(`hidden`);

    const res = await this.fetch_quote({
      amount: this.amount,
      currency: this.currency_code,
    })
    //this.loading = false;

    if (res.ok) {
      const data = await res.json();
      if (data.offers) {
        this.set_offers(data.offers);

        if (data.offers.length > 0) {
          // select first offer by default
          this.select_offer(data.offers[0]);
          this.start_time_quote();
          return;
        }
      }
    } else {
      this.set_load_err(res.statusText);
    }

    this.set_no_offers();
    this.set_no_payment_methods();
    this.set_no_xel_quote();
  }

  fetch_quote(params) {
    return fetch(`/quote`, {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        amount: params.amount,
        currency: params.currency
      })
    })
  }

  set_load_err(text) {
    const load_err = document.getElementById(`load_err`);
    load_err.classList.remove(`hidden`);
    load_err.innerHTML = `Error occurred: ${text}`;
  }

  create_offer_item(offer) {
    const content = document.createElement(`div`);
    content.id = `offer_${offer.name}`;
    const name = document.createElement(`div`);
    name.innerHTML = offer.name ? offer.name : ``;
    content.append(name);

    if (offer.fee) {
      const sub = document.createElement(`div`);
      sub.innerHTML = `Fee: ${offer.fee} ${this.currency_code}`;
      content.append(sub);
    }

    content.addEventListener('click', () => {
      this.select_offer(offer);
    });

    return content;
  }

  set_offers(offers = []) {
    if (offers.length === 0) {
      this.set_no_offers();
      return;
    }

    div_offers.innerHTML = ``;
    offers.forEach((offer) => {
      const element = this.create_offer_item(offer);
      div_offers.append(element);
    });
  }

  select_offer(offer) {
    const div_offer = document.getElementById(`offer_${offer.name}`);
    div_offers.childNodes.forEach((o) => o.classList.remove("selected"));
    div_offer.classList.add(`selected`);
    this.offer = offer;

    this.set_payment_methods(offer.paymentMethods);
    if (offer.paymentMethods.length > 0) {
      this.select_payment_method(offer.paymentMethods[0]);
    }
  }

  select_payment_method(payment_method) {
    const div_payment_method = document.getElementById(`payment_method_${payment_method.name}`);
    div_payment_methods.childNodes.forEach((o) => o.classList.remove("selected"));
    div_payment_method.classList.add(`selected`);
    this.payment_method = payment_method;

    this.set_xel_quote();
  }

  set_no_offers() {
    div_offers.innerHTML = ``;
    let element = this.create_offer_item({ name: 'No offers' });
    div_offers.append(element);
    //div_payment_methods_wrap.classList.add(`hidden`);
  }

  set_no_payment_methods() {
    div_payment_methods.innerHTML = ``;
    let element = this.create_payment_method_item({ name: 'No payments' });
    div_payment_methods.append(element);
  }

  set_loading_offers() {
    div_offers.innerHTML = ``;

    let elements = [];
    for (let i = 0; i < 3; i++) {
      const element = this.create_offer_item({});
      element.classList.add(`row-item-loading`);
      elements.push(element);
    }

    div_offers.append(...elements);
  }

  create_payment_method_item(payment_method) {
    const content = document.createElement(`div`);
    content.id = `payment_method_${payment_method.name}`;
    const name = document.createElement(`div`);
    name.innerHTML = payment_method.name ? this.get_payment_method_name(payment_method) : ``;
    content.append(name);
    if (payment_method.fee) {
      const sub = document.createElement(`div`);
      sub.innerHTML = `Fee: ${payment_method.fee} ${this.currency_code}`;
      content.append(sub);
    }

    content.addEventListener('click', () => {
      this.select_payment_method(payment_method);
    });

    return content;
  }

  set_loading_payment_methods() {
    div_payment_methods.innerHTML = ``;

    let elements = [];
    for (let i = 0; i < 3; i++) {
      const element = this.create_payment_method_item({});
      element.classList.add(`row-item-loading`);
      elements.push(element);
    }

    div_payment_methods.append(...elements);
  }

  set_payment_methods(payment_methods = []) {
    div_payment_methods_wrap.classList.remove("hidden");
    div_payment_methods.innerHTML = ``;
    payment_methods.forEach((pm) => {
      const element = this.create_payment_method_item(pm);
      div_payment_methods.append(element);
    });
  }

  stop_time_quote() {
    if (this.timer_id) clearTimeout(this.timer_id);
    this.timer = 60;
  }

  start_time_quote() {
    const time_quote = document.getElementById(`time_quote`);
    time_quote.innerHTML = `${this.timer}s`;

    const self = this;
    function decrease() {
      if (self.timer <= 0) {
        self.load_quote();
        return;
      }

      time_quote.innerHTML = `${self.timer}s`;
      self.timer--;
      self.timer_id = setTimeout(decrease, 1000);
    }

    decrease();
  }

  set_xel_quote() {
    div_xel_quote.classList.remove(`xel-quote-loading`, `xel-quote-none`);
    div_xel_quote.innerHTML = ``;
    const div_fiat_amount = document.createElement(`div`);
    const currency = currencies.find((x) => x.code === this.currency_code);
    const country_code = currency.country_code.toLowerCase();
    div_fiat_amount.innerHTML = `<i class="fi fi-${country_code} fis round-icon"></i>${this.amount.toFixed(2)} ${this.currency_code}`;
    const div_arrow = document.createElement(`div`);
    div_arrow.innerHTML = `<svg width="2rem" height="2rem"><use href="./assets/arrow_right.svg#icon" /></svg>`;
    const div_xel_amount = document.createElement(`div`);
    div_xel_amount.innerHTML = `${this.offer.xelAmount.toFixed(2)} XEL<img alt="" src="./assets/xelis_circle_logo.png" width="25px" height="25px" />`;
    div_xel_amount.title = `${this.offer.xelAmount} XEL`;
    div_xel_quote.append(div_fiat_amount, div_arrow, div_xel_amount);
    this.set_quote_details();
  }

  set_quote_details() {
    div_quote_details.innerHTML = ``;
    const div_time_quote = document.createElement(`div`);
    div_time_quote.innerHTML = `<div>New quote in</div><div id="time_quote">${this.timer}s</div>`;
    const div_offer = document.createElement(`div`);
    div_offer.innerHTML = `<div>Offer</div><div>${this.offer.name} (${this.get_payment_method_name(this.payment_method)})</div>`;
    const div_rate = document.createElement(`div`);
    div_rate.innerHTML = `<div>Rate</div><div>${(this.amount / this.offer.xelAmount).toFixed(2)} ${this.currency_code} = 1 XEL</div>`;
    const div_network_fee = document.createElement(`div`);
    div_network_fee.innerHTML = `<div>Network fee</div><div>${this.offer.fee} ${this.currency_code}</div>`;
    const div_processing_fee = document.createElement(`div`);
    div_processing_fee.innerHTML = `<div>Processing fee</div><div>${this.payment_method.fee} ${this.currency_code}</div>`;
    const div_total_fee = document.createElement(`div`);
    div_total_fee.innerHTML = `<div>Total fee</div><div>${this.offer.fee + this.payment_method.fee} ${this.currency_code}</div>`;

    div_quote_details.append(div_time_quote, div_offer, div_rate, div_network_fee, div_processing_fee, div_total_fee);
    div_quote_details.classList.remove(`hidden`);

    btn_continue.classList.remove(`hidden`);
  }

  set_loading_xel_quote() {
    div_xel_quote.innerHTML = ``;
    div_xel_quote.classList.add(`xel-quote-loading`);
    div_quote_details.classList.add(`hidden`);
  }

  set_no_xel_quote() {
    div_xel_quote.classList.remove(`xel-quote-loading`);
    div_xel_quote.classList.add(`xel-quote-none`)
    div_xel_quote.innerHTML = `No offers available.`;
  }

  validate_address() {
    // TODO
  }

  get_payment_method_name(payment_method) {
    const payment_method_mapping = {
      "credit_debit_card": "Credit Card"
      // add here if there are more - there is a list for coinon available here https://www.coinon.io/api.html
    }

    const name = payment_method_mapping[payment_method.name];
    return name ? name : payment_method.name;
  }

  continue() {
    // offer and payment_method are automatically selected
    // and cannot be deselected
    // we don't have to check if they're null

    /*if (!this.offer) {
      alert('Please select a quote if any available.');
      return
    }

    if (!this.payment_method) {
      alert('Please select a payment method.');
      return
    }*/

    if (!this.address) {
      alert('Enter your XELIS address.');
      return
    }

    let redirect_url = ``;
    switch (this.offer.name) {
      case "coinon":
        const params = {
          address: this.address,
          offerType: "coinon",
          payMethod: this.payment_method.name,
          sendCurrency: this.currency_code,
          sendCurrencyAmount: this.amount,
          getCurrency: `XEL`,
          getCurrencyAmount: this.offer.xelAmount
        }

        const list = Object.keys(params).map((key) => {
          return `${key}=${params[key]}`
        });

        redirect_url = `https://onramp.coinon.io/edit?${list.join(`&`)}`;
        break;
    }

    if (redirect_url) {
      window.open(redirect_url, "_blank")
    } else {
      alert('No redirection available for this provider.');
    }
  }
}

const quote = new Quote();
