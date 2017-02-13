import * as types from './action-types'
//login
export const LOGIN_SUCCESS = types.LOGIN_SUCCESS
export const LOGIN_FAIL = types.LOGIN_FAIL
export const ON_AUTH_INPUT_CHANGE = types.ON_AUTH_INPUT_CHANGE
//forgot password
export const FORGOT_PASSWORD_REQUEST = types.FORGOT_PASSWORD_REQUEST
export const FORGOT_PASSWORD_SUCCESS = types.FORGOT_PASSWORD_SUCCESS
export const FORGOT_PASSWORD_FAIL = types.FORGOT_PASSWORD_FAIL
//register
export const REGISTER_SUCCESS = types.REGISTER_SUCCESS
export const REGISTER_FAIL = types.REGISTER_FAIL
export const ON_REGISTER_INPUT_CHANGE = types.ON_REGISTER_INPUT_CHANGE
//edit
export const ON_EDIT_INPUT_CHANGE = types.ON_EDIT_INPUT_CHANGE
//edit profile
export const EDIT_PROFILE_REQUEST = types.EDIT_PROFILE_REQUEST
export const EDIT_PROFILE_SUCCESS = types.EDIT_PROFILE_SUCCESS
export const EDIT_PROFILE_FAIL = types.EDIT_PROFILE_FAIL
//logout
export const LOG_OUT = 'LOG_OUT'

export function onLoginSuccess (user) {
  return {
    user: user,
    type: types.LOGIN_SUCCESS
  }
}

export function onLoginFail (reason) {
  return {
    reason: reason,
    type: types.LOGIN_FAIL
  }
}

export function onRegisterFail (reason) {
  return {
    reason: reason,
    type: types.REGISTER_FAIL
  }}

export function onRegisterSuccess (user) {
  return {
    user: user,
    type: types.REGISTER_SUCCESS
  }
}

export function onChange (e, type=types.ON_AUTH_INPUT_CHANGE) {
  return {
    input: {
      name: e.target.name,
      value: e.target.value
    },
    type: type
  }
}

export function onLogout () {
  return {
    type: types.LOG_OUT
  }
}

export function onForgotPasswordRequest () {
  return {
    type: types.FORGOT_PASSWORD_REQUEST
  }
}

export function onForgotPasswordSuccess (successMessage) {
  return {
    type: types.FORGOT_PASSWORD_SUCCESS,
    message: successMessage
  }
}

export function onForgotPasswordFail (errorMessage) {
  return {
    type: types.FORGOT_PASSWORD_FAIL,
    reason: errorMessage
  }
}

export function onEditProfileRequest () {
  return {
    type: types.EDIT_PROFILE_REQUEST
  }
}

export function onEditProfileSuccess (successMessage) {
  return {
    type: types.EDIT_PROFILE_SUCCESS,
    message: successMessage
  }
}

export function onEditProfileFail (errorMessage) {
  return {
    type: types.EDIT_PROFILE_FAIL,
    reason: errorMessage
  }
}

/****************************************
*     Export api functions.             *
* Kept separate to have code integrity  *
****************************************/

export {
  login,
  logout,
  register,
  update,
  forgotPassword,
  facebookLogin
 } from '../api/auth-api'
