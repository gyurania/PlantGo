const HOST = 'http://j7a703.p.ssafy.io:8080/'

const PHOTOCARD = 'api/photocard/'
const PLANT = 'api/plants/'
const USER = 'api/v1/users/'

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