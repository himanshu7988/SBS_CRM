export function formatIndianNumber(any) {
    const number = Number(any).toFixed(2); // Ensure the number has two decimal places
    
    // Split the integer and decimal parts (if any)
    const [integerPart, decimalPart] = number.split(".");
  
    // Format the integer part for the Indian numbering system
    const lastThreeDigits = integerPart.slice(-3); // Get the last 3 digits
    const remainingDigits = integerPart.slice(0, -3); // Get the remaining digits
    
    // Add commas to the remaining digits in groups of two
    const formattedRemaining = remainingDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
    
    // Combine the formatted parts
    const formattedInteger = remainingDigits
      ? formattedRemaining + "," + lastThreeDigits
      : lastThreeDigits;
  
    // Append the decimal part if it exists
    return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
  }
  
  export function numberToWordsIndian(num) {
    const ones = [
      "zero",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
    ];
    const teens = [
      "",
      "eleven",
      "twelve",
      "thirteen",
      "fourteen",
      "fifteen",
      "sixteen",
      "seventeen",
      "eighteen",
      "nineteen",
    ];
    const tens = [
      "",
      "ten",
      "twenty",
      "thirty",
      "forty",
      "fifty",
      "sixty",
      "seventy",
      "eighty",
      "ninety",
    ];
    const scales = ["", "thousand", "lakh", "crore"];
  
    // Convert the number part to words
    function convertToWords(number) {
      let result = "";
      if (number > 99) {
        result += ones[Math.floor(number / 100)] + " hundred ";
        number %= 100;
      }
      if (number > 10 && number < 20) {
        result += teens[number - 10] + " ";
      } else {
        result += tens[Math.floor(number / 10)] + " ";
        result += ones[number % 10] + " ";
      }
      return result.trim();
    }
  
    // Split the number into Indian number system (Crore, Lakh, Thousand, etc.)
    function splitNumberIndian(num) {
      let parts = [];
      if (num >= 10000000) {
        parts.push(Math.floor(num / 10000000)); // Crores
        num %= 10000000;
      }
      if (num >= 100000) {
        parts.push(Math.floor(num / 100000)); // Lakhs
        num %= 100000;
      }
      if (num >= 1000) {
        parts.push(Math.floor(num / 1000)); // Thousands
        num %= 1000;
      }
      parts.push(num); // Remaining hundreds and below
      return parts;
    }

    const [integerPart, fractionalPart] = num.toString().split(".");
    const numberParts = splitNumberIndian(parseInt(integerPart));
    let words = "";
  
    // Add scales to each part
    for (let i = 0; i < numberParts.length; i++) {
      if (numberParts[i] > 0) {
        words +=
          convertToWords(numberParts[i]) +
          " " +
          scales[numberParts.length - i - 1] +
          " ";
      }
    }
  
    // Add fractional part (if exists) but handle .00 as "point zero"
    if (fractionalPart != "00") {
      words += "point ";
      for (const digit of fractionalPart) {
        words += ones[parseInt(digit)] + " ";
      }
    } else {
      words += "point zero"; // Handle cases like .00 as "point zero"
    }
  
    return words.trim();
  }