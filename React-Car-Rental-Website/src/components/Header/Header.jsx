import React, { useRef, useContext } from 'react';

import { Container, Row, Col } from 'reactstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import '../../styles/header.css';

const navLinks = [
  {
    path: '/home',
    display: 'Home',
  },
  {
    path: '/about',
    display: 'About',
  },
  {
    path: '/cars',
    display: 'Cars',
  },
  {
    path: '/contact',
    display: 'Contact',
  },
];

const Header = () => {
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useContext(AuthContext);

  const toggleMenu = () => menuRef.current.classList.toggle('menu__active');

  const handleLogout = () => {
    logout();
    navigate('/home');
  };

  return (
    <header className="header">
      {/* =============== header middle =========== */}
      <div className="header__middle">
        <Container>
          <Row>
            <Col lg="4" md="3" sm="4">
              <div className="logo">
                <h1>
                  <Link to="/home" className=" d-flex align-items-center gap-2">
                    <i className="ri-car-line"></i>
                    <span>Rent_Car.com</span>
                  </Link>
                </h1>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i className="ri-earth-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>Bandung</h4>
                  <h6>Bandung, Indonesia</h6>
                </div>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i className="ri-time-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>Buka Setiap Hari</h4>
                  <h6>24 jam</h6>
                </div>
              </div>
            </Col>

            <Col
              lg="2"
              md="3"
              sm="4"
              className=" d-flex align-items-center justify-content-end "
            >
              <div className="header__btns d-flex align-items-center gap-3">
                {isLoggedIn ? (
                  <>
                    <div className="header__user-info d-flex align-items-center gap-2">
                      <i
                        className="ri-user-circle-line"
                        style={{ fontSize: '1.5rem', color: '#000d6b' }}
                      ></i>
                      <span className="header__username">{user?.username}</span>
                    </div>
                    <button
                      className="header__btn logout__btn"
                      onClick={handleLogout}
                    >
                      <i className="ri-logout-circle-line"></i> Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button className="header__btn">
                      <Link
                        to="/login"
                        className=" d-flex align-items-center gap-1"
                      >
                        <i className="ri-login-circle-line"></i> Login
                      </Link>
                    </button>
                    <button className="header__btn">
                      <Link
                        to="/register"
                        className=" d-flex align-items-center gap-1"
                      >
                        <i className="ri-user-line"></i> Register
                      </Link>
                    </button>
                  </>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* ========== main navigation =========== */}

      <div className="main__navbar">
        <Container>
          <div className="navigation__wrapper d-flex align-items-center justify-content-between">
            <span className="mobile__menu">
              <i className="ri-menu-line" onClick={toggleMenu}></i>
            </span>

            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <div className="menu">
                {navLinks.map((item, index) => (
                  <NavLink
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive ? 'nav__active nav__item' : 'nav__item'
                    }
                    key={index}
                  >
                    {item.display}
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="nav__right">
              <div className="search__box">
                <input type="text" placeholder="Search" />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
