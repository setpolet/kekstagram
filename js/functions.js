function checkStringLength(str, maxLength) {
  return str.length <= maxLength;
}

console.log(checkStringLength('проверяемая строка', 20));
console.log(checkStringLength('проверяемая строка', 18));
console.log(checkStringLength('проверяемая строка', 10));

function isPalindrome(str) {
  const normalized = str.replaceAll(' ', '').toLowerCase();

  let reversed = '';

  for (let i = normalized.length - 1; i >= 0; i--) {
    reversed += normalized[i];
  }

  return reversed === normalized;
}

console.log(isPalindrome('топот'));
console.log(isPalindrome('ДовОд'));
console.log(isPalindrome('Кекс'));
console.log(isPalindrome('Лёша на полке клопа нашёл '));

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

console.log(extractDigits('2023 год'));
console.log(extractDigits('ECMAScript 2022'));
console.log(extractDigits('1 кефир, 0.5 батона'));
console.log(extractDigits('агент 007'));
console.log(extractDigits('а я томат'));
console.log(extractDigits(2023));
console.log(extractDigits(-1));
console.log(extractDigits(1.5));
