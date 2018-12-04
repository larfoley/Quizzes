import axios from 'axios'

class Auth {

  authenticateUser(username, password, callback) {
    // if (!this.isAuthenticated()) {
      axios.get('/token')
        .then(({ data }) => {
          console.log(data);
          localStorage.setItem('token', JSON.stringify(data))
          callback(null)
        })
        .catch(err => callback)
    // }
  }

  registerUser({ userName, email, password, confirmPassword }, cb) {
    axios.post('/api/account/register', {
      userName,
      email,
      password,
      confirmPassword
    })
      .then(res => {
        cb(null)
      })
      .catch(err => {
        cb(err)
      })
  }

  getAccessToken() {
    return JSON.parse(window.localStorage.getItem('token'))
  }

  isAuthenticated() {
    return true
    // return !!window.localStorage.getItem('token')
  }

  logout() {
    localStorage.removeItem('token')
  }

}

export default Auth
