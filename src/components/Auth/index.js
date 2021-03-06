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
      const date = new Date()
      const tokenExpiryTime = date.setTime(date.getTime()+( parseInt(res.expires_in, 10) * 1000));

      window.localStorage.setItem('token', JSON.stringify(res))
      window.localStorage.setItem('tokenExpiryTime', JSON.stringify(tokenExpiryTime))
    })
    .then(res => {
      axios.get(`/api/users/${username}`)
        .then(res => {
          window.localStorage.setItem('user', JSON.stringify(res.data))
          callback(null)
        })
        .catch(err => {
          console.log("status", err.status);
          callback(err)
        })
    })
    .catch(error => {
      console.log("status", error.status);
      callback(error)
    })

  }

  isAuthenticated() {
    const token = window.localStorage.getItem('token')
    const tokenExpiryTime = window.localStorage.getItem('tokenExpiryTime')
    const user = window.localStorage.getItem('user')

    if (token && tokenExpiryTime && user) {
      const expiryTime = parseInt(JSON.parse(tokenExpiryTime), 10)
      if (new Date().getTime() > expiryTime) {
        // Token expired so remove it from local storage
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('tokenExpiryTime')
        window.localStorage.removeItem('user')
        return false
      } else {
        return true
      }
    }
    return false

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
    let token = window.localStorage.getItem('token')
    if (token) {
      token = JSON.parse(token)
      return token.token_type + " " + token.access_token
    }
  }

  getUserName() {
    let user = window.localStorage.getItem('user')
    user = JSON.parse(user)
    return user ? user.userName : null
  }

  getUserId() {
    let user = window.localStorage.getItem('user')
    user = JSON.parse(user)
    return user ? user.userId : null
  }

  logout() {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('tokenExpiryTime')
    window.localStorage.removeItem('user')
  }

}

export default Auth
