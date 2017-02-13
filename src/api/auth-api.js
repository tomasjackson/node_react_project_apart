import axios from 'axios'
import { hide, show } from 'redux-modal'
import { onLoginSuccess, onLoginFail, onRegisterFail, onRegisterSuccess, onLogout, onForgotPasswordRequest, onForgotPasswordSuccess, onForgotPasswordFail, onEditProfileRequest, onEditProfileSuccess, onEditProfileFail } from '../actions/auth-actions'
import api_endpoints from '../../config/apis'
import setAuthorizationToken from './utils/set-authorization-token'
import jwt from 'jsonwebtoken'
import toastr from 'toastr'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//TODO: move dispatches to 'actions' and keep only ajax calls here

// Auth.configure({
//   apiUrl: 'https://dev.playven.com/api',
//   authProviderPaths: {
//     facebook: '/auth/facebook'
//   },
// })
//Todo error handling
//Todo set token as default header

export function login(params) {
  return (dispatch, getState) => {
    const state = getState()
    const { credentials, onSuccess } = params;

    return axios({
      method: 'POST',
      url: `${api_endpoints.playven}/authenticate`,
      params: credentials
    }).then(res => {
      const token = res.data.auth_token
      localStorage.setItem('authToken', token)
      setAuthorizationToken(token)
      dispatch(onLoginSuccess(jwt.decode(token)))
      dispatch(hide('login'))
      if (onSuccess && typeof(onSuccess) === 'string') {
        dispatch(show(onSuccess))
      }
    })
    .catch(error => {
      if (error.response && error.response.status === 401) {
        const errorMessages = error.response.data.errors.join(', ')
        toastr.error(errorMessages)
        dispatch(hide('login'))
        dispatch(onLoginFail(error.response.data.errors.join(', ')))
      } else {
        // Something happened in setting up the request that triggered an Error
        dispatch(hide('login'))
        toastr.error(error.message)
        dispatch(onLoginFail(error.message))
      }
    });
  }
}

export function facebookLogin(params) {
  return (dispatch, getState) => {
    const state = getState()
    const { credentials, onSuccess } = params;

    return axios({
      method: 'GET',
      url: `${api_endpoints.playven}/auth/facebook`,
      params: credentials
    }).then(res => {
      
    })
    .catch(error => {
      
    });
  }
}

export function logout() {
  return (dispatch) => {
    localStorage.removeItem('authToken')
    setAuthorizationToken()
    dispatch(onLogout())
  }
}

export function register(paramsOrModal) {
  return (dispatch, getState) => {
    const state = getState()
    const { credentials, onSuccess } = paramsOrModal

    return axios({
      method: 'POST',
      url: `${api_endpoints.playven}/users`,
      data: credentials
    }).then(res => {
      const token = res.data.auth_token
      localStorage.setItem('authToken', token)
      setAuthorizationToken(token)
      dispatch(onRegisterSuccess(jwt.decode(token)))
      dispatch(hide('register'))
      if (onSuccess && typeof(onSuccess) === 'string') {
        dispatch(show(onSuccess))
      }
    })
    .catch(error => {
      let errorMessages = ''
      if (error.response && error.response.status === 422) {
        errorMessages = error.response.data.errors.join(', ')
      } else {
        // Something happened in setting up the request that triggered an Error
        errorMessages = error.message
      }

      toastr.error(errorMessages)
      dispatch(onRegisterFail(errorMessages))
    })
  }
}

export const update = (credentials, userId) => {
  return (dispatch, getState) => {
    for (var propName in credentials) {
      if (credentials[propName] === null || credentials[propName] === undefined) {
        delete credentials[propName];
      }
    }

    var reqBody = {
      "user": credentials
    }

    dispatch(onEditProfileRequest())

    return axios({
      method: 'PUT',
      url: `${api_endpoints.playven}/users/` + userId,
      data: reqBody
    }).then(res => {
      if (res.status == 200) {
        dispatch(onEditProfileSuccess(res.data.message))
        const state = getState()
        toastr.success(state.auth.messages.message)
      }
      else {
        dispatch(onEditProfileFail(res.data.message))
        const state = getState()
        toastr.error(state.auth.messages.reason)
      }
    }).catch(error => {
      let errorMessages = ''
      if (error.response && error.response.status === 422) {
        errorMessages = error.response.data.errors.join(', ')
      } else {
        // Something happened in setting up the request that triggered an Error
        errorMessages = error.message
      }

      dispatch(onEditProfileFail(errorMessages))
      toastr.error(errorMessages)
    })

  }
}

export function forgotPassword(params) {
  return (dispatch, getState) => {
    dispatch(onForgotPasswordRequest())
    return axios({
      method: 'POST',
      url: `${api_endpoints.playven}/users/reset_password`,
      data: params
    }).then(res => {
      if(res.status==200) {
        dispatch(onForgotPasswordSuccess(res.data.message))
        const state = getState()
        toastr.success(state.auth.messages.message)
      } else {
        dispatch(onForgotPasswordFail(res.data.message))
        const state = getState()
        toastr.error(state.auth.messages.reason)
      }

    })
      .catch(error => {
        let errorMessages = ''
        if (error.response && error.response.status === 422) {
          errorMessages = error.response.data.errors.join(', ')
        } else {
          // Something happened in setting up the request that triggered an Error
          errorMessages = error.message
        }

        toastr.error(errorMessages)
      })
  }
}

