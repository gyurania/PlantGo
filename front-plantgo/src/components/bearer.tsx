const Bearer = {
  headers: {
    headers: {
      'Authorization' : `Bearer ${sessionStorage.getItem('loginToken')}`
    }
  }
}

export default Bearer;