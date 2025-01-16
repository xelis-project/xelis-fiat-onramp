//const div_box_bot_currency = document.getElementById(`box_bot_currency`);
const div_select_currency = document.getElementById(`select_currency_list`);
const input_search_currency = document.getElementById(`search_currency_input`);
const btn_currency = document.getElementById(`currency_btn`);

class SelectCurrency {
  currency = "USD";

  constructor() {
    input_search_currency.addEventListener(`input`, (e) => {
      this.search_currency(e.target.value);
    });

    this.load_currencies(currencies);
  }

  load_currencies(list) {
    list.forEach((currency) => {
      const div = document.createElement(`div`);
      const flag = document.createElement(`i`);
      flag.classList = `fi fi-${currency.country_code.toLowerCase()} fis`;
      const text = document.createElement(`div`);
      text.innerHTML = `${currency.code} (${currency.symbol})`;
      div.append(flag, text);
      div_select_currency.append(div);

      div.addEventListener(`click`, (e) => {
        this.set_currency(currency.code);
        quote.currency_code = currency.code;
        quote.load_quote();
      });
    });
  }

  set_currency(code) {
    const currency = currencies.find((x) => x.code === code);
    btn_currency.innerHTML = `<i class="fi fi-${currency.country_code.toLowerCase()} fis round-icon"></i>${currency.code}`;
    box_bot.close_box_bot(`box_bot_currency`);
  }

  clear_currencies() {
    div_select_currency.innerHTML = ``;
  }

  search_currencies(search_value) {
    let list = currencies;

    if (search_value) {
      list = list.filter((x) => {
        return x.code.toLowerCase().indexOf(search_value.toLowerCase()) !== -1;
      });
    }

    this.clear_currencies();
    this.load_currencies(list);
  }
}

const select_currency = new SelectCurrency();
