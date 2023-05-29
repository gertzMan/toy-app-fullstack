import { Link, NavLink } from 'react-router-dom'
import { logout } from '../store/user.action.js'
import { LoginSignup } from './login-signup.jsx'
import { showErrorMsg } from '../services/event-bus.service.js'
import { useDispatch, useSelector } from 'react-redux'


export function AppHeader() {

  const dispatch = useDispatch()
  const user = useSelector((storeState) => storeState.userModule.loggedinUser)

  function onLogout() {
    logout()
      .catch((err) => {
        showErrorMsg('Cannot logout')
      })
  }
  return (
    <header className="main-header full">
      {/* if a user is conneted: */}
      {user && <section className="user-info">
        <p>
          <Link to={`/user/${user._id}`}>{user.fullname}</Link>
        </p>



        <button onClick={onLogout}>Logout</button>
      </section>}
      <Link className="logo" to="/">
        <div>Toys!</div>


      </Link>
      <div>{!user && <section className="user-info">
        <LoginSignup dispatch={dispatch} />
      </section>}</div>
      <nav>
        <NavLink to="/login">Login</NavLink>

        <NavLink to="/">Home</NavLink>
        <NavLink to="/toy">Toys</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </nav>
    </header>
  )
}
