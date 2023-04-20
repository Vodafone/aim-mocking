import stripAnsi from 'strip-ansi'

export default function ansiStrip(value) {
  if (Array.isArray(value)) {
    return value.map((val) => {
      return stripAnsi(val)
    })
  }
  return stripAnsi(value)
}
