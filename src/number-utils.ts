export default function intToRoman(value: number): string {
  // Check value limitation
  if (value == null || value < 0 || value > 100) return null;

  const hundreds = ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'];
  const tens = ['', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'];
  const ones = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];

  return `${hundreds[Math.floor(value / 100)]}${
    tens[Math.floor((value % 100) / 10)]
  }${ones[(value % 100) % 10]}`;
}
