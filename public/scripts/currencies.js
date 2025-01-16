const currencies = [
  { currency: "United States Dollar", symbol: "$", code: "USD", country: "United States", country_code: "US" },
  { currency: "Euro", symbol: "€", code: "EUR", country: "European Union", country_code: "EU" },
  { currency: "British Pound Sterling", symbol: "£", code: "GBP", country: "United Kingdom", country_code: "GB" },
  { currency: "Japanese Yen", symbol: "¥", code: "JPY", country: "Japan", country_code: "JP" },
  { currency: "Swiss Franc", symbol: "CHF", code: "CHF", country: "Switzerland", country_code: "CH" },
  { currency: "Canadian Dollar", symbol: "$", code: "CAD", country: "Canada", country_code: "CA" },
  { currency: "Australian Dollar", symbol: "$", code: "AUD", country: "Australia", country_code: "AU" },
  { currency: "Chinese Yuan", symbol: "¥", code: "CNY", country: "China", country_code: "CN" },
  { currency: "Indian Rupee", symbol: "₹", code: "INR", country: "India", country_code: "IN" },
  { currency: "Brazilian Real", symbol: "R$", code: "BRL", country: "Brazil", country_code: "BR" },
  { currency: "Russian Ruble", symbol: "₽", code: "RUB", country: "Russia", country_code: "RU" },
  { currency: "South African Rand", symbol: "R", code: "ZAR", country: "South Africa", country_code: "ZA" },
  { currency: "Mexican Peso", symbol: "$", code: "MXN", country: "Mexico", country_code: "MX" },
  { currency: "Hong Kong Dollar", symbol: "$", code: "HKD", country: "Hong Kong", country_code: "HK" },
  { currency: "Singapore Dollar", symbol: "$", code: "SGD", country: "Singapore", country_code: "SG" },
  { currency: "New Zealand Dollar", symbol: "$", code: "NZD", country: "New Zealand", country_code: "NZ" },
  { currency: "Norwegian Krone", symbol: "kr", code: "NOK", country: "Norway", country_code: "NO" },
  { currency: "Swedish Krona", symbol: "kr", code: "SEK", country: "Sweden", country_code: "SE" },
  { currency: "South Korean Won", symbol: "₩", code: "KRW", country: "South Korea", country_code: "KR" },
  { currency: "Turkish Lira", symbol: "₺", code: "TRY", country: "Turkey", country_code: "TR" },
  { currency: "Thai Baht", symbol: "฿", code: "THB", country: "Thailand", country_code: "TH" },
  { currency: "Argentine Peso", symbol: "$", code: "ARS", country: "Argentina", country_code: "AR" },
  { currency: "UAE Dirham", symbol: "د.إ", code: "AED", country: "United Arab Emirates", country_code: "AE" },
  { currency: "Israeli New Shekel", symbol: "₪", code: "ILS", country: "Israel", country_code: "IL" },
  { currency: "Egyptian Pound", symbol: "£", code: "EGP", country: "Egypt", country_code: "EG" },
  { currency: "Czech Koruna", symbol: "Kč", code: "CZK", country: "Czech Republic", country_code: "CZ" },
  { currency: "Polish Zloty", symbol: "zł", code: "PLN", country: "Poland", country_code: "PL" },
  { currency: "Indonesian Rupiah", symbol: "Rp", code: "IDR", country: "Indonesia", country_code: "ID" },
  { currency: "Philippine Peso", symbol: "₱", code: "PHP", country: "Philippines", country_code: "PH" },
  { currency: "Malaysian Ringgit", symbol: "RM", code: "MYR", country: "Malaysia", country_code: "MY" },
  { currency: "Pakistani Rupee", symbol: "₨", code: "PKR", country: "Pakistan", country_code: "PK" },
  { currency: "Bangladeshi Taka", symbol: "৳", code: "BDT", country: "Bangladesh", country_code: "BD" },
  { currency: "Vietnamese Dong", symbol: "₫", code: "VND", country: "Vietnam", country_code: "VN" },
  { currency: "Chilean Peso", symbol: "$", code: "CLP", country: "Chile", country_code: "CL" },
  { currency: "Romanian Leu", symbol: "lei", code: "RON", country: "Romania", country_code: "RO" },
  { currency: "Hungarian Forint", symbol: "Ft", code: "HUF", country: "Hungary", country_code: "HU" },
  { currency: "Colombian Peso", symbol: "$", code: "COP", country: "Colombia", country_code: "CO" },
  { currency: "Peruvian Nuevo Sol", symbol: "S/", code: "PEN", country: "Peru", country_code: "PE" },
  { currency: "Kenyan Shilling", symbol: "KSh", code: "KES", country: "Kenya", country_code: "KE" },
  { currency: "Kazakhstani Tenge", symbol: "₸", code: "KZT", country: "Kazakhstan", country_code: "KZ" },
  { currency: "Moroccan Dirham", symbol: "د.م.", code: "MAD", country: "Morocco", country_code: "MA" },
  { currency: "Sri Lankan Rupee", symbol: "Rs", code: "LKR", country: "Sri Lanka", country_code: "LK" },
  { currency: "Icelandic Krona", symbol: "kr", code: "ISK", country: "Iceland", country_code: "IS" },
  { currency: "Bahraini Dinar", symbol: "د.ب", code: "BHD", country: "Bahrain", country_code: "BH" },
  { currency: "Qatari Rial", symbol: "ر.ق", code: "QAR", country: "Qatar", country_code: "QA" },
  { currency: "Kuwaiti Dinar", symbol: "د.ك", code: "KWD", country: "Kuwait", country_code: "KW" },
  { currency: "Omani Rial", symbol: "ر.ع.", code: "OMR", country: "Oman", country_code: "OM" },
  { currency: "Jordanian Dinar", symbol: "د.ا", code: "JOD", country: "Jordan", country_code: "JO" },
  { currency: "Lebanese Pound", symbol: "ل.ل", code: "LBP", country: "Lebanon", country_code: "LB" },
  { currency: "Syrian Pound", symbol: "ل.س", code: "SYP", country: "Syria", country_code: "SY" },
  { currency: "Yemeni Rial", symbol: "﷼", code: "YER", country: "Yemen", country_code: "YE" },
  { currency: "Mauritian Rupee", symbol: "₨", code: "MUR", country: "Mauritius", country_code: "MU" },
  { currency: "Ugandan Shilling", symbol: "USh", code: "UGX", country: "Uganda", country_code: "UG" },
  { currency: "Tanzanian Shilling", symbol: "TSh", code: "TZS", country: "Tanzania", country_code: "TZ" },
  { currency: "Botswana Pula", symbol: "P", code: "BWP", country: "Botswana", country_code: "BW" },
  { currency: "Fijian Dollar", symbol: "$", code: "FJD", country: "Fiji", country_code: "FJ" },
  { currency: "Seychellois Rupee", symbol: "₨", code: "SCR", country: "Seychelles", country_code: "SC" },
  { currency: "Mauritian Rupee", symbol: "₨", code: "MUR", country: "Mauritius", country_code: "MU" },
  { currency: "Rwandan Franc", symbol: "FRw", code: "RWF", country: "Rwanda", country_code: "RW" },
  { currency: "Zambian Kwacha", symbol: "ZK", code: "ZMW", country: "Zambia", country_code: "ZM" },
  { currency: "Nepalese Rupee", symbol: "₨", code: "NPR", country: "Nepal", country_code: "NP" },
  { currency: "Armenian Dram", symbol: "Դ", code: "AMD", country: "Armenia", country_code: "AM" },
  { currency: "Georgian Lari", symbol: "₾", code: "GEL", country: "Georgia", country_code: "GE" },
  { currency: "Mongolian Tugrik", symbol: "₮", code: "MNT", country: "Mongolia", country_code: "MN" },
  { currency: "Algerian Dinar", symbol: "د.ج", code: "DZD", country: "Algeria", country_code: "DZ" },
  { currency: "Uzbekistani Som", symbol: "лв", code: "UZS", country: "Uzbekistan", country_code: "UZ" },
  { currency: "Burmese Kyat", symbol: "Ks", code: "MMK", country: "Myanmar", country_code: "MM" },
  { currency: "Belarusian Ruble", symbol: "Br", code: "BYN", country: "Belarus", country_code: "BY" },
  { currency: "Tajikistani Somoni", symbol: "SM", code: "TJS", country: "Tajikistan", country_code: "TJ" },
  { currency: "Kyrgyzstani Som", symbol: "с", code: "KGS", country: "Kyrgyzstan", country_code: "KG" },
  { currency: "Laotian Kip", symbol: "₭", code: "LAK", country: "Laos", country_code: "LA" },
  { currency: "Cambodian Riel", symbol: "៛", code: "KHR", country: "Cambodia", country_code: "KH" },
  { currency: "Botswana Pula", symbol: "P", code: "BWP", country: "Botswana", country_code: "BW" },
  { currency: "Cayman Islands Dollar", symbol: "$", code: "KYD", country: "Cayman Islands", country_code: "KY" },
  { currency: "Saint Helena Pound", symbol: "£", code: "SHP", country: "Saint Helena", country_code: "SH" },
  { currency: "Solomon Islands Dollar", symbol: "$", code: "SBD", country: "Solomon Islands", country_code: "SB" },
  { currency: "Vanuatu Vatu", symbol: "Vt", code: "VUV", country: "Vanuatu", country_code: "VU" },
  { currency: "Samoan Tala", symbol: "T", code: "WST", country: "Samoa", country_code: "WS" },
  { currency: "Tongan Paʻanga", symbol: "T$", code: "TOP", country: "Tonga", country_code: "TO" },
  { currency: "Haitian Gourde", symbol: "G", code: "HTG", country: "Haiti", country_code: "HT" }
];
