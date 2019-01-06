/*

──────────────────────────────────────────
──────────────────────────────────────────
LERP
──────────────────────────────────────────
──────────────────────────────────────────

►►►  simple lerp (!== OP's algorithm used to prevent the floating-point error)

lerp(start, end, multiplier);
lerp(0, 100, 0.12);

*/

export default function lerp(s, e, m){
  return s * (1 - m) + e * m;
}
