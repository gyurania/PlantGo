const HOST = 'https://j7a703.p.ssafy.io/api/'

const PHOTOCARD = 'photocard/'
const PLANT = 'plants/'
const USER = 'v1/users/'

export default {
  photocard: {
    register : () => HOST + PHOTOCARD
  },
  plants: {
    list: () => HOST + PLANT,
    collected: () => HOST + PLANT + 'collected',
    noncollected: () => HOST + PLANT + 'not-collected'
  },
  user: {
    getUser: () => HOST + USER
  }
}