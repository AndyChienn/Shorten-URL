function shortenUrl() {
  const options = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  const newOptions = options.split('')

  // console.log(newOptions)
  let newURL = ''

  for (let i = 0; i < 5; i++) {
    let index = Math.floor(Math.random() * newOptions.length)
    newURL += newOptions[index]
  }


  return newURL

}

module.exports = shortenUrl