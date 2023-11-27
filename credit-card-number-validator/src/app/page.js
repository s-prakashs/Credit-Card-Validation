"use client"; // This is a client component 👈🏽

import React, { useState } from 'react';
const MIN_LENGTH = 12; // Set a minimum length requirement

function CreditCardInput() {
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [validationError, setValidationError] = useState('');
  
  const isNumber = (value) => {
    // We can use parseFloat or Number to convert the value to a number
    // and checking if it's not NaN (Not-a-Number)
    return !isNaN(parseFloat(value)) && isFinite(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!creditCardNumber || creditCardNumber.length < 1) {
      setValidationError('Please enter credit card number.');
      return;
    }

    let isValidCreditCard = isNumber(creditCardNumber) && creditCardNumber.length > MIN_LENGTH;
    //console.log("isValidCreditCard:" + isValidCreditCard + ", creditCardNumber:" + creditCardNumber + ", creditCardNumber.len: " + creditCardNumber.length);
    if (isValidCreditCard) {
      try {
        const response = await fetch(`http://localhost:3010/card/validate?d=${encodeURIComponent(creditCardNumber)}`);
        if (response.ok) {
          const data = await response.json();
          setValidationError(`Card Number: ${data.cardNumber}, isValid: ${data.isValid}`);
        } else {
          setValidationError('Error: Failed to validate the credit card.');
        }
      } catch (error) {
        setValidationError('Error: Network issue or failed to fetch data.');
      }
    } else {
      setValidationError('Invalid credit card number. Please check and try again.');
    }
  };

    /*
  // Calling the function Without Rest API
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
  };*/

  // Function to validate the credit card number using the Luhn algorithm
  /*function luhnCheck(cardNumber) {
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
  }*/

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
        {validationError && !validationError.endsWith('true') && (
          <p className="text-red-500 text-xs italic">{validationError}</p>
        )}
        {validationError && validationError.endsWith('true') && (
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
