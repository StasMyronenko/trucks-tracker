const {getToken} = require("../services/auth");
const BASE_URL = 'http://192.168.1.34:8080';

const REGISTER_URL = BASE_URL + '/api/auth/register'

const LOGIN_URL = BASE_URL + '/api/auth/login'

const FORGOT_PASSWORD_URL = BASE_URL + '/api/auth/forgot_password'

const RESTORE_PASSWORD_URL = BASE_URL + '/api/auth/restore_password/'

const USERS_URL = BASE_URL + '/api/users/me'

const CHANGE_PASSWORD_URL = BASE_URL + '/api/users/me/password'

const TRUCKS_URL = BASE_URL + '/api/trucks/'

const LOADS_URL = BASE_URL + '/api/loads'

const REGISTERED_HEADERS = {
  'Content-Type': 'application/json',
  Authorization: getToken(),
}

module.exports = {
  BASE_URL,
  REGISTER_URL,
  LOGIN_URL,
  FORGOT_PASSWORD_URL,
  RESTORE_PASSWORD_URL,
  USERS_URL,
  REGISTERED_HEADERS,
  TRUCKS_URL,
  CHANGE_PASSWORD_URL,
  LOADS_URL,
}
