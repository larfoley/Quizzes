import axios from 'axios'


class Auth {

  authenticateUser(username, password, callback) {

    window.fetch("/token", {
      method: 'POST',
      body: `grant_type=password&username=${username}&password=${password}`,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        const error = new Error(res.statusText)
        error.status = 400
        throw error
      }
    })
    .then(res => {
      localStorage.setItem('token', JSON.stringify(res))
      callback(null)
    })
    .catch(error => {
      callback(error)
    })

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
    const token = JSON.parse(window.localStorage.getItem('token'))
    return token.token_type + " " + token.access_token
  }

  isAuthenticated() {
    return !!window.localStorage.getItem('token')
  }

  logout() {
    localStorage.removeItem('token')
  }

}

export default Auth
