const fs = require('fs')
var toys = require('../data/toy.json')
const PAGE_SIZE = 3

function query(filterBy = {}) {
  let toysToDisplay = toys

  const { name, maxPrice, labels } = filterBy
  // console.log('labels:', labels)
  // console.log(filterBy)

  if (name) {
    const regExp = new RegExp(name, 'i')
    toysToDisplay = toys.filter(toy => regExp.test(toy.name))
  }

  if (labels && labels.length) {
    toysToDisplay = toysToDisplay.filter(toy =>
      labels.every(l => toy.labels.includes(l))
    )
  }

  // if (status !== undefined) {
  //   // filter by status (sold out / in stock)
  // }

  if (maxPrice !== undefined && maxPrice !== '') {
    toysToDisplay = toysToDisplay.filter(toy => toy.price <= maxPrice)
  }

  const pageCount = Math.ceil(toysToDisplay.length / PAGE_SIZE)
  const data = { toysToDisplay, pageCount } // returning this info to the front so that it knows how much pages there are
  return Promise.resolve(data)
}

function get(toyId) {
  const toy = toys.find(toy => toy._id === toyId)
  if (!toy) return Promise.reject('Toy not found!')
  return Promise.resolve(toy)
}

function remove(toyId) {
  const idx = toys.findIndex(toy => toy._id === toyId)
  if (idx === -1) return Promise.reject('No Such Toy')
  const toy = toys[idx]
  toys.splice(idx, 1)
  return _saveToysToFile()
}

function save(toy) {
  if (toy._id) {
    const toyToUpdate = toys.find(currToy => currToy._id === toy._id)
    if (!toyToUpdate) return Promise.reject('No such toy')
    toyToUpdate.name = toy.name
    toyToUpdate.price = toy.price
    toyToUpdate.inStock = toy.inStock
    toyToUpdate.labels = [...toy.labels]
  } else {
    toy._id = _makeId()
    toys.push(toy)
  }

  return _saveToysToFile().then(() => toy)
  // return Promise.resolve(toy)
}

function _makeId(length = 5) {
  let text = ''
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

function _saveToysToFile() {
  return new Promise((resolve, reject) => {
    const toysStr = JSON.stringify(toys, null, 2)
    fs.writeFile('data/toy.json', toysStr, err => {
      if (err) {
        return console.log(err)
      }
      console.log('The file was saved!')
      resolve()
    })
  })
}

function getLabelMap() {
  const map = toys.reduce((labelMap, toy) => {
    toy.labels.forEach(label => {
      if (label in labelMap) {
        labelMap[label]++
      } else {
        labelMap[label] = 1
      }
    })
    return labelMap
  }, {})

  return Promise.resolve(map)
}

module.exports = {
  query,
  get,
  remove,
  save,
  getLabelMap,
}
