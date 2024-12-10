import React, { useState } from "react";
import "./Prectise.css";
import countryList from "./Codes.js";

const Prectise = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [error, setError] = useState("");

  const handleConvert = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    try {
      // Replace with your preferred API and key
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch exchange rates");
      }

      const data = await response.json();
      const rate = data.rates[toCurrency];

      if (!rate) {
        throw new Error("Invalid currency code");
      }

      setConvertedAmount((amount * rate).toFixed(2));
    } catch (err) {
      setError(err.message);
      setConvertedAmount(null);
    }
  };

  const getFlagUrl = (code) => `https://flagsapi.com/${countryList[code]}/flat/64.png`;

  return (
    <div className="container">
      <h2>Currency Converter</h2>
      <form onChange={handleConvert}>
        <div className="amount">
          <label>Enter Amount</label>
          <input
            type="number"
            value={amount}
            min="0"
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
          />
        </div>
        <div className="currency-row">
          <div className="dropdown">
            <label>From</label>
            <div className="dropdown-with-flag">
              <img
                src={getFlagUrl(fromCurrency)}
                alt={fromCurrency}
                className="flag-icon"
              />
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
              >
                {Object.keys(countryList).map((currency) => (
                  <option key={currency} value={currency}>
                    {currency} - {countryList[currency]}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="switch-icon">
            <i className="fa-solid fa-arrow-right-arrow-left"></i>
          </div>
          <div className="dropdown">
            <label>To</label>
            <div className="dropdown-with-flag">
              <img
                src={getFlagUrl(toCurrency)}
                alt={toCurrency}
                className="flag-icon"
              />
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
              >
                {Object.keys(countryList).map((currency) => (
                  <option key={currency} value={currency}>
                    {currency} - {countryList[currency]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {convertedAmount && (
          <div className="result">
            <p>
              {amount} {fromCurrency} = {convertedAmount} {toCurrency}
            </p>
          </div>
        )}
        {error && <div className="error">{error}</div>}
        <button disabled type="submit">Get Exchange Rate</button>
      </form>
    </div>
  );
};

export default Prectise;
