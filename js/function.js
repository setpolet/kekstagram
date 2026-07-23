function checkStringLength(str, maxLength) {
  return str.length <= maxLength;
}

function isPalindrome(str) {
  const normalized = str.replaceAll(' ', '').toLowerCase();

  let reversed = '';

  for (let i = normalized.length - 1; i >= 0; i--) {
    reversed += normalized[i];
  }

  return reversed === normalized;
}

function extractDigits(value) {
  const str = value.toString();

  let digits = '';

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const parsedChar = parseInt(char, 10);

    if (!Number.isNaN(parsedChar)) {
      digits += char;
    }
  }

  return parseInt(digits, 10);
}
