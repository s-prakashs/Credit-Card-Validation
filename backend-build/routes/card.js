var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('CARD: respond with a resource');
});

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
const MIN_LENGTH = 12; // Set a minimum length requirement

router.get('/validate', function(req, res, next) {
  const cardNumber = req.query.d; // Accessing the value of 'cardNumber' query parameter
  let isValid = cardNumber >= MIN_LENGTH && luhnCheck(cardNumber);

  // Create an object with the validation status
  const validationResponse = {
    cardNumber: cardNumber,
    isValid: isValid
  };

  // Send the JSON response containing validation results
  res.json(validationResponse);
});

module.exports = router;

