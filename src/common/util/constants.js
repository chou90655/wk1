export const ACCESS_TOKEN = 'Access-Token'
export const TOKEN_INFO = 'Token-Info'
export const USER_INFO = 'login_user_info'
export const REM_USER = 'rem_user'
export const LOTTERY_HALL = 'Lottery_Hall'
export const USER_DETAILS = 'user_details'

const STORAGE_OPTIONS = {
  namespace: 'pro__', // key prefix
    name: 'ls', // name variable Vue.[ls] or this.[$ls],
    storage: 'local', // storage name session, local, memory
}

export default STORAGE_OPTIONS;
