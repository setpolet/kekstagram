const checkStringLength = (str, maxLength) => str.length <= maxLength;

checkStringLength('проверяемая строка', 20)

const isPalindrome = (str) => {
  const normalized = str.replaceAll(' ', '').toLowerCase();
  let reversed = '';

  for (let i = normalized.length - 1; i >= 0; i--) {
    reversed += normalized[i];
  }

  return reversed === normalized;
};

isPalindrome('топот')

const extractDigits = (value) => {
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
};

extractDigits('2023 год')
