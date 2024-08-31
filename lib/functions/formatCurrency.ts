const CURRENCY_CONVERTER = new Intl.NumberFormat('en-US', {
  currency: 'USD',
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
  style: 'currency',
});

export function formatCurrency(number: number): string {
  return CURRENCY_CONVERTER.format(number);
}
