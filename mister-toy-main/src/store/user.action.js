import { userService } from '../services/user.service.js'
import { store } from '../store/store.js'
import { SET_USER, UPDATE_USER_SCORE, SET_USER_SCORE } from '../store/user.reducer.js'

export async function login(credentials) {
    try {
        const user = await userService.login(credentials)
        store.dispatch({ type: SET_USER, user })
        return user
    } catch (err) {
        console.error('Cannot login:', err)
        throw err
    }
}

export async function signup(credentials) {
    try {
        const user = await userService.signup(credentials)
        store.dispatch({ type: SET_USER, user })
        return user
    } catch (err) {
        console.error('Cannot signup:', err)
        throw err
    }

}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({ type: SET_USER, user: null })
    } catch (err) {
        console.error('Cannot logout:', err)
        throw err
    }
}

// export function checkout(diff) {
//     return userService.updateScore(diff)
//         .then((newScore) => {
//             store.dispatch({ type: SET_USER_SCORE, newScore })
//             store.dispatch({ type: CLEAR_CART })
//         })
//         .catch(err => {
//             console.error('Cannot logout:', err)
//             throw err
//         })
// }