export default function encodeUrl(str: string) {
  return str.replace(/(\/)/g, '-').substr(1)
}
