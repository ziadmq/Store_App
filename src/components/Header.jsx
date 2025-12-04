import { Link } from "react-router-dom";
import { useState } from "react";
import "./Header.css";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">

      <div className="container header-content">

        {/* Logo */}
        <div className="logo">
          <Link to="/">STORE<span>APP</span></Link>
        </div>

        {/* Desktop Menu */}
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/about">About</Link>
        </nav>

        {/* Mobile Menu Icon */}
        <div className="menu-icon" onClick={() => setOpen(!open)}>
          ☰
        </div>

      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="mobile-nav">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
          <Link to="/register" onClick={() => setOpen(false)}>Register</Link>
          <Link to="/about" onClick={() => setOpen(false)}>About</Link>
        </div>
      )}

    </header>
  );
}
