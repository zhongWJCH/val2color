/**
 * MinMaxNormalization
 */
export function minMaxNormalization(min, max, value) {
  return (value - min) / (max - min)
}
