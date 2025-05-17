import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav style={styles.nav}>
      <h3 style={styles.logo}>Citizen Engagement System</h3>
      <button onClick={toggleMenu} style={styles.toggle}>
        ☰
      </button>
      <ul style={{ ...styles.navLinks, ...(isOpen ? styles.open : styles.closed) }}>
        <li><Link to="/" style={styles.link}>Submit</Link></li>
        <li><Link to="/track" style={styles.link}>Track</Link></li>
        <li><Link to="/admin" style={styles.link}>Admin</Link></li>
      </ul>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: '12px 24px',
    backgroundColor: '#007bff',
    color: '#fff',
    position: 'sticky',
    top: 0,
    zIndex: 999
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  toggle: {
    background: 'none',
    border: 'none',
    fontSize: 28,
    color: '#fff',
    cursor: 'pointer',
    display: 'none'
  },
  navLinks: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    margin: 0,
    padding: 0
  },
  open: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginTop: 10
  },
  closed: {
    display: 'flex'
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 'bold'
  }
};


// Add media query
if (window.innerWidth <= 768) {
  styles.toggle.display = 'block';
  styles.navLinks.display = 'none';
}

export default Navbar;
