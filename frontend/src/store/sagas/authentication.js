import { put } from 'redux-saga/effects'
import { login, getLoginState, logout } from '../api/authentication'
import {
  LOG_IN_FAILURE,
  LOG_OUT_FAILURE,
  LOG_IN_SUCCESS,
  SET_LOG_IN_STATE,
  CLEAR_LOG_IN_STATE,
} from '../actions/authentication'
import defaultErrorHandler from './defaultErrorHandler'
import { toast } from 'react-toastify'

export function* logInUser(action) {
  const { email, password } = action

  try {
    const { user, accessToken } = yield login({ email, password })

    toast.success('Login successful')
    yield put({ type: LOG_IN_SUCCESS, currentUser: user, accessToken })
  } catch (error) {
    yield defaultErrorHandler(error, LOG_IN_FAILURE)
  }
}

export function* getAuthenticationState(_action) {
  try {
    const { accessToken, currentUser } = getLoginState()

    yield put({ type: SET_LOG_IN_STATE, accessToken, currentUser })
  } catch (error) {
    yield defaultErrorHandler(error, LOG_IN_FAILURE)
  }
}

export function* logOutUser(_action) {
  try {
    logout()

    toast.success('You have been succesfully logged out.')
    yield put({ type: CLEAR_LOG_IN_STATE })
  } catch (error) {
    yield defaultErrorHandler(error, LOG_OUT_FAILURE)
  }
}
// reducer < -reducerAction < -sagas < -sagaAction
