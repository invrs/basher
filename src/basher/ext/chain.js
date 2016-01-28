export default Class =>
  class extends Class {
    chain({ array, fn }, resolve) {
      resolve(
        array.reduce(
          (promise, item) => promise.then(() => fn(item)),
          Promise.resolve()
        )
      )
    }
  }
