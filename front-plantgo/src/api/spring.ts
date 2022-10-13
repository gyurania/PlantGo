const HOST = 'https://[IP주소]/api/'

const PHOTOCARD = 'photocard/'
const PLANT = 'plants/'
const USER = 'v1/users/'

export default {
  photocard: {
    register: () => HOST + PHOTOCARD,
    modifyMemo: (photocard_id:number) => HOST + PHOTOCARD + photocard_id
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
