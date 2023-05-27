import { Link, NavLink } from 'react-router-dom'

export function AppHeader() {
  return (
    <header className="main-header full">
      <Link className="logo" to="/">
        <div>Toys!</div>
      </Link>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/toy">Toys</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </nav>
    </header>
  )
}
