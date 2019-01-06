/*

──────────────────────────────────────────
──────────────────────────────────────────
ROUND
──────────────────────────────────────────
──────────────────────────────────────────

round(number, precision)

►►►  precision is optional → 3 by default

0 → 1
1 → 0.1
2 → 0.01
3 → 0.001

*/

export default function round($n, p = 3) {
  if( p < 0 || p > 3 ) throw new Error('Precision can only be between 0 and 3.');

  p = Math.pow(10, p);
  return Math.round($n * p) / p;
}
