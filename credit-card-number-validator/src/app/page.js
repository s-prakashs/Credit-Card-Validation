"use client"; // This is a client component 👈🏽

import React, { useState } from 'react';

function CreditCardInput() {
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [validationError, setValidationError] = useState('');

  // Function to validate the credit card number using the Luhn algorithm
  function luhnCheck(cardNumber) {
    let sum = 0;
    let doubleUp = false;
  
    // Loop through each digit from right to left
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let curDigit = parseInt(cardNumber.charAt(i), 10);
  
      // Double every second digit
      if (doubleUp) {
        if ((curDigit *= 2) > 9) curDigit -= 9; // If the doubling results in a two-digit number, subtract 9
      }
  
      // Accumulate the digit sum
      sum += curDigit;
  
      // Alternate doubling
      doubleUp = !doubleUp;
    }
  
    // The number is valid if the sum is a multiple of 10
    return sum % 10 === 0;
  }

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate credit card number
    console.log("creditCardNumber: " + creditCardNumber);
    const isValidCreditCard = luhnCheck(creditCardNumber);

    if (isValidCreditCard) {
      // Credit card number is valid, make your API call here
      // Example: Replace this with your actual API call
      setValidationError('Success !');
      console.log('Credit card number is valid. Making API call...');
      // Call your API function here
    } else {
      setValidationError('Invalid credit card number. Please check and try again.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen min-w-64">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 min-w-80 min-h-40" onSubmit={handleSubmit}>
        <label htmlFor="creditCardNumber" className="block text-gray-700 font-bold mb-2">
          Credit Card Number
        </label>
        <input
          id="creditCardNumber"
          type="text"
          placeholder="Enter your credit card number"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={creditCardNumber}
          onChange={(e) => setCreditCardNumber(e.target.value)}
        />
        {/* Validation error message */}
        {validationError && !validationError.startsWith('Success') && (
          <p className="text-red-500 text-xs italic">{validationError}</p>
        )}
        {validationError && validationError.startsWith('Success') && (
          <p className="text-green-500 text-x">{validationError}</p>
        )}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreditCardInput;
