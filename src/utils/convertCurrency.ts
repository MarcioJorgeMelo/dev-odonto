/**
 * Converte um valor monetário em reais (BRL) para centavos.
 * @param {string} amount
 * @returns {number} O valor convertido em centavos.
 * @example
 * convertRealtoCents("1.300,50"); // Retorna 130050
 */
export function convertRealtoCents(amount: string) {
  const numericPrice = parseFloat(amount.replace(/\./g, "").replace(",", "."));

  const priceInCents = Math.round(numericPrice * 100);

  return priceInCents;
}
