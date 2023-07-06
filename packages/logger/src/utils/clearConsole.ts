/**
 * Clear console log cmd line
 * similar to command + k
 */
export default function clear() {
  process.stdout.write('\u001B[2J\u001B[0;0f')
  process.stdout.write('\u001b[2J\u001b[0;0H')
  process.stdout.write('\x1B[2J\x1B[0f\u001b[0;0H')
  process.stdout.write('\x1Bc')
}
