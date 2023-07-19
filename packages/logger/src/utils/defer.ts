/* eslint-disable */
export default function Defer() {
  this.promise = new Promise((resolve, reject) => {
    this.resolve = resolve
    this.reject = reject
  })
  this.then = this.promise.then.bind(this.promise)
  this.catch = this.promise.catch.bind(this.promise)
}
