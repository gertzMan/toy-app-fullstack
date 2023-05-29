import { userService } from '../services/user.service.js'

export const SET_USER = 'SET_USER'
export const SET_USER_SCORE = 'SET_USER_SCORE'

const initialState = {
  loggedinUser: userService.getLoggedinUser(),
}

export function userReducer(state = initialState, action) {
  // console.log('action', action)

  switch (action.type) {
    // User
    case SET_USER:
      return { ...state, loggedinUser: action.user }
    default:
      return state
  }
}
