import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
// import { userService } from './user.service.js'
import { httpService } from './http.service.js'

const STORAGE_KEY = 'toy_DB'
const BASE_URL = 'toy/'

export const toyService = {
  query,
  getById,
  save,
  remove,
  getEmptyToy,
  getDefaultFilter,
  getLabelMap,
}

function query(filterBy = {}, sortBy = {}) {
  return httpService.get(BASE_URL, filterBy)
  // return storageService.query(STORAGE_KEY).then(toys => toys)
}
function getById(toyId) {
  return httpService.get(BASE_URL + toyId)
  // return storageService.get(STORAGE_KEY, toyId)
}
function remove(toyId) {
  // return storageService.remove(STORAGE_KEY, toyId)
  return httpService.delete(BASE_URL + toyId)
}
function save(toy) {
  const method = toy._id ? 'put' : 'post'
  return httpService[method](BASE_URL, toy)
  // return storageService[method](BASE_URL, toy)
  // if (toy._id) {
  //     return httpService.put(BASE_URL, toy)
  //     // return storageService.put(STORAGE_KEY, toy)
  // } else {
  //     return httpService.post(BASE_URL, toy)
  //     // return storageService.post(STORAGE_KEY, toy)
  // }
}

function getLabelMap() {
  return httpService.get('/api/label-map')
}

function getEmptyToy() {
  return {
    name: '',
    price: '',
    inStock: true,
    labels: [],
  }
}

function getDefaultFilter() {
  // return { txt: '', maxPrice: '', status: '', labels: [] }
  return { name: '', maxPrice: '', labels: [] }
}

function _createToys() {
  let toys = utilService.loadFromStorage(STORAGE_KEY)
  if (!toys || !toys.length) {
    toys = [
      {
        _id: 't101',
        name: 'Talking Doll',
        price: 123,
        labels: ['Doll', 'Battery Powered', 'Baby'],
        createdAt: 1631031801011,
        inStock: true,
      },
      {
        _id: 't102',
        name: 'Talking Oshri',
        price: 200,
        labels: ['Doll', 'Battery Powered', 'Baby'],
        createdAt: 1631031801011,
        inStock: true,
      },
      {
        _id: 't103',
        name: 'Talking Hemos',
        price: 199,
        labels: ['Doll', 'Battery Powered', 'Baby'],
        createdAt: 1631031801011,
        inStock: true,
      },
      {
        _id: 't104',
        name: 'Talking Puki',
        price: 90,
        labels: ['Doll', 'Battery Powered', 'Baby'],
        createdAt: 1631031801011,
        inStock: true,
      },
      {
        _id: 't105',
        name: 'Talking Muki',
        price: 150,
        labels: ['Doll', 'Battery Powered', 'Baby'],
        createdAt: 1631031801011,
        inStock: true,
      },
    ]

    utilService.saveToStorage(STORAGE_KEY, toys)
  }
}
