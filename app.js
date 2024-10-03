
const countryList = {
    AED: "AE",
    AFN: "AF",
    XCD: "AG",
    ALL: "AL",
    AMD: "AM",
    ANG: "AN",
    AOA: "AO",
    AQD: "AQ",
    ARS: "AR",
    AUD: "AU",
    AZN: "AZ",
    BAM: "BA",
    BBD: "BB",
    BDT: "BD",
    XOF: "BE",
    BGN: "BG",
    BHD: "BH",
    BIF: "BI",
    BMD: "BM",
    BND: "BN",
    BOB: "BO",
    BRL: "BR",
    BSD: "BS",
    NOK: "BV",
    BWP: "BW",
    BYR: "BY",
    BZD: "BZ",
    CAD: "CA",
    CDF: "CD",
    XAF: "CF",
    CHF: "CH",
    CLP: "CL",
    CNY: "CN",
    COP: "CO",
    CRC: "CR",
    CUP: "CU",
    CVE: "CV",
    CYP: "CY",
    CZK: "CZ",
    DJF: "DJ",
    DKK: "DK",
    DOP: "DO",
    DZD: "DZ",
    ECS: "EC",
    EEK: "EE",
    EGP: "EG",
    ETB: "ET",
    EUR: "FR",
    FJD: "FJ",
    FKP: "FK",
    GBP: "GB",
    GEL: "GE",
    GGP: "GG",
    GHS: "GH",
    GIP: "GI",
    GMD: "GM",
    GNF: "GN",
    GTQ: "GT",
    GYD: "GY",
    HKD: "HK",
    HNL: "HN",
    HRK: "HR",
    HTG: "HT",
    HUF: "HU",
    IDR: "ID",
    ILS: "IL",
    INR: "IN",
    IQD: "IQ",
    IRR: "IR",
    ISK: "IS",
    JMD: "JM",
    JOD: "JO",
    JPY: "JP",
    KES: "KE",
    KGS: "KG",
    KHR: "KH",
    KMF: "KM",
    KPW: "KP",
    KRW: "KR",
    KWD: "KW",
    KYD: "KY",
    KZT: "KZ",
    LAK: "LA",
    LBP: "LB",
    LKR: "LK",
    LRD: "LR",
    LSL: "LS",
    LTL: "LT",
    LVL: "LV",
    LYD: "LY",
    MAD: "MA",
    MDL: "MD",
    MGA: "MG",
    MKD: "MK",
    MMK: "MM",
    MNT: "MN",
    MOP: "MO",
    MRO: "MR",
    MTL: "MT",
    MUR: "MU",
    MVR: "MV",
    MWK: "MW",
    MXN: "MX",
    MYR: "MY",
    MZN: "MZ",
    NAD: "NA",
    XPF: "NC",
    NGN: "NG",
    NIO: "NI",
    NPR: "NP",
    NZD: "NZ",
    OMR: "OM",
    PAB: "PA",
    PEN: "PE",
    PGK: "PG",
    PHP: "PH",
    PKR: "PK",
    PLN: "PL",
    PYG: "PY",
    QAR: "QA",
    RON: "RO",
    RSD: "RS",
    RUB: "RU",
    RWF: "RW",
    SAR: "SA",
    SBD: "SB",
    SCR: "SC",
    SDG: "SD",
    SEK: "SE",
    SGD: "SG",
    SKK: "SK",
    SLL: "SL",
    SOS: "SO",
    SRD: "SR",
    STD: "ST",
    SVC: "SV",
    SYP: "SY",
    SZL: "SZ",
    THB: "TH",
    TJS: "TJ",
    TMT: "TM",
    TND: "TN",
    TOP: "TO",
    TRY: "TR",
    TTD: "TT",
    TWD: "TW",
    TZS: "TZ",
    UAH: "UA",
    UGX: "UG",
    USD: "US",
    UYU: "UY",
    UZS: "UZ",
    VEF: "VE",
    VND: "VN",
    VUV: "VU",
    YER: "YE",
    ZAR: "ZA",
    ZMK: "ZM",
    ZWD: "ZW",
  };

  const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns=document.querySelectorAll('.dropdown select');
const btn=document.querySelector('form button');
const fromCurr=document.querySelector('.from select');
const toCurr=document.querySelector('.to select');
const mssg=document.querySelector('.mssg');
window.addEventListener('load',()=>{
  updateExchangeRate();
});

// adding all the countries inn a dropdown list.
for(let select of dropdowns){
    for(let code in countryList){
       let newOpt=document.createElement('option');
       newOpt.innerText=code;
       newOpt.value=code;
       if(select.name==='from' && code==='USD')
       {
        newOpt.selected='selected';
       }
       else if(select.name==='to' && code==='INR'){
        newOpt.selected='selected';
       }
       select.append(newOpt);
    }

    select.addEventListener('change',(evt)=>{
      updateFlag(evt.target);
    });

}
// updating the flag image..

const updateFlag=(e)=>{
  let code=e.value;
  let countryCode=countryList[code];
  let newImg=`https://flagsapi.com/${countryCode}/flat/64.png`;
 let img= e.parentElement.querySelector("img");
 img.src=newImg;
}

// gettng the exchange rate

btn.addEventListener('click',async (event)=>{
   event.preventDefault();
   updateExchangeRate();
   
});
const updateExchangeRate=async ()=>{
  let amt=document.querySelector('.amount input');
   let amtValue=amt.value;
   if(amtValue==='' || amtValue < 1)
   {
    amtValue=1;
    amt.value='1';
   }

   const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
   //we are using .value to get the value from the element and converting it to lower case bcz api works in lower case.
   let response=await fetch(URL);
   let data=await response.json();
   let rate=data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
   let finalAmt=rate * amtValue;

   mssg.innerText=`${amtValue} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
}
