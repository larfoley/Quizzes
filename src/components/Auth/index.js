import axios from 'axios'

class Auth {

  authenticateUser(username, password, callback) {
    if (!this.isAuthenticated()) {
      axios.get('/token')
        .then(token => {
          console.log(token);
          sessionStorage.setItem('token', '123')
          callback(null)
        })
        .catch(err => callback)
    }
  }

  registerUser(email, password, cb) {
    axios.post('/api/users/register', { email, password })
      .then(res => {
        cb(null)
      })
      .catch(err => {
        cb(err)
      })
  }

  getAccessToken() {
    return window.sessionStorage.getItem('token')
  }

  isAuthenticated() {
    return !!window.sessionStorage.getItem('token')
  }

  logout() {
    sessionStorage.removeItem('token')
  }

}

export default Auth
