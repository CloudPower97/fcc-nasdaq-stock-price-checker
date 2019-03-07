# Information Security and Quality Assurance Projects - Nasdaq Stock Price Checker

## Description

This project is part of the **FCC Information Security and Quality Assurance Certification**.

## User stories

1. Only allow loading of _scripts_ and `CSS` from your server. This is achieved setting `Content-Security-Policy` header to `default-src 'self'`
2. I can `GET` `/api/stock-prices` with form data containing a **Nasdaq** stock ticker and recieve back an object _stockData_.
3. In _stockData_, I can see the _stock_(string, the ticker), _price_(decimal in string format), and _likes_(int).
4. I can also pass along field like as true(boolean) to have my like added to the stock(s). Only 1 like per ip should be accepted.
5. If I pass along 2 _stocks_, the return object will be an array with both stock's info but instead of likes, it will display rel_likes(the difference betwen the likes) on both.
6. All 5 functional tests are complete and passing.

## Example usage

<https://fcc-nasdaq-stock-price-checker.herokuapp.com/api/stock-prices?stock=goog>
<https://fcc-nasdaq-stock-price-checker.herokuapp.com/api/stock-prices?stock=goog&like=true>
<https://fcc-nasdaq-stock-price-checker.herokuapp.com/api/stock-prices?stock=goog&stock=msft>
<https://fcc-nasdaq-stock-price-checker.herokuapp.com/api/stock-prices?stock=goog&stock=msft&like=true>

Coded with music, coffe and love by _Claudio Cortese_
