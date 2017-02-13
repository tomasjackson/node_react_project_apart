import { ON_AUTH_INPUT_CHANGE, LOGIN_SUCCESS, LOGIN_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAIL, ON_REGISTER_INPUT_CHANGE, REGISTER_SUCCESS, REGISTER_FAIL, ON_EDIT_INPUT_CHANGE, LOG_OUT, EDIT_PROFILE_REQUEST, EDIT_PROFILE_SUCCESS, EDIT_PROFILE_FAIL
} from '../../actions/auth-actions'

const initialState = {
  login: {
    credentials: {}
  },
  register: {
    credentials: {}
  },
  edit: {
  },
  messages: {},
  errors: {},
  authenticated: false,
  isRequestingToResetPassword: false,
  isRequestingToEditProfile: false
}

export default function venueReducer(state = initialState, action) {
  switch (action.type) {
    /*SEND REQUEST*/
    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        isRequestingToResetPassword: true
      }

    case EDIT_PROFILE_REQUEST:
      return {
        ...state,
        isRequestingToEditProfile: true
      }

    /*INPUT CHANGE*/
    case ON_AUTH_INPUT_CHANGE:
      return {
        ...state,
        login: {
          credentials: {
            ...state.login.credentials,
            [action.input.name]: action.input.value,
          }
        }
      }

    case ON_REGISTER_INPUT_CHANGE:
      return {
        ...state,
        register: {
          credentials: {
            ...state.register.credentials,
            [action.input.name]: action.input.value,
          }
        }
      }

    case ON_EDIT_INPUT_CHANGE:
      return {
        ...state,
        edit: {
          ...state.edit,
          [action.input.name]: action.input.value,
        }
      }

    /*SUCESS*/
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...initialState,
        user: action.user,
        authenticated: true,
      }

    case REGISTER_SUCCESS:
      return {
        ...state,
        messages: {
          type: 'success',
          message: 'messages.login.success'
        }
      }

    case REGISTER_SUCCESS:
      return {
        ...state,
        messages: {
          type: 'success',
          message: 'messagess.register.success'
        }
      }

    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        isRequestingToResetPassword: false,
        messages: {
          type: 'success',
          message: action.message
        }
      }

    case EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        isRequestingToEditProfile: false,
        messages: {
          type: 'success',
          message: action.message
        }
      }

    /*FAIL*/
    case LOGIN_FAIL:
      return {
        ...initialState,
        messages: {
          type: 'fail',
          message: action.reason
        }
      }

    case REGISTER_FAIL:
      return {
        ...initialState,
        messages: {
          type: 'fail',
          reason: action.reason
        }
      }

    case FORGOT_PASSWORD_FAIL:
      return {
        ...initialState,
        isRequestingToResetPassword: false,
        messages: {
          type: 'fail',
          reason: action.reason
        }
      }

    case EDIT_PROFILE_FAIL:
      return {
        ...initialState,
        isRequestingToEditProfile: false,
        messages: {
          type: 'fail',
          reason: action.reason
        }
      }

    /*LOGOUT*/
    case LOG_OUT:
      return {
        ...initialState,
        authenticated: false
      }

    default:
      return state
  }
}
