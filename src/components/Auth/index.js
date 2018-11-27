import axios from 'axios'

class Auth {

  authenticateUser(username, password, callback) {
    if (true) {
      axios.get('https://jsonplaceholder.typicode.com/todos/1')
        .then(token => {
          sessionStorage.setItem('token', token)
          callback(null, token)
        })
        .catch(err => callback)
    }
  }

  getAccessToken() {
    return window.sessionStorage.getItem('token')
  }

  isAuthenticated() {
    return !!window.sessionStorage.getItem('token')
  }

}

export default Auth
