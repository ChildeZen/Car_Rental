import React from 'react';

import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../../styles/footer.css';

const quickLinks = [
  {
    path: '/about',
    display: 'About',
  },

  {
    path: '#',
    display: 'Privacy Policy',
  },

  {
    path: '/cars',
    display: 'Car Listing',
  },

  {
    path: '/contact',
    display: 'Contact',
  },
];

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="4" md="4" sm="12">
            <div className="logo footer__logo">
              <h1>
                <Link to="/home" className=" d-flex align-items-center gap-2">
                  <i className="ri-car-line"></i>
                  <span>Rent_Car.com</span>
                </Link>
              </h1>
            </div>
            <div className="footer__logo-content">
              <p>
                Kami adalah penyedia layanan rental mobil modern yang
                mengutamakan keamanan dan transparansi. Dengan integrasi
                teknologi terkini, kami memastikan setiap perjalanan Anda
                menjadi pengalaman yang aman, nyaman, dan tak terlupakan.
              </p>
            </div>
          </Col>

          <Col lg="7" md="12" sm="12">
            <div className="footer__links d-flex flex-column flex-md-row justify-content-between gap-4">
              <div className="footer__link-block">
                <h5 className="footer__link-title">Quick Links</h5>
                <ListGroup className="quick-link-list">
                  {quickLinks.map((item, index) => (
                    <ListGroupItem key={index} className="p-0 mt-3 quick__link">
                      <Link to={item.path}>{item.display}</Link>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </div>

              <div className="footer__link-block">
                <h5 className="footer__link-title mb-4">Head Office</h5>
                <div className="mb-4">
                  <p className="office__info">M daffa Arrahman</p>
                  <p className="office__info">Phone: +621234567889</p>
                  <p className="office__info">Email: muh@gmail.com</p>
                </div>
              </div>
            </div>
          </Col>

          {/* <Col lg="3" md="4" sm="12">
            <div className="mb-4">
              <h5 className="footer__link-title">Newsletter</h5>
              <p className="section__description">Subscribe our newsletter</p>
              <div className="newsletter">
                <input type="email" placeholder="Email" />
                <span>
                  <i className ="ri-send-plane-line"></i>
                </span>
              </div>
            </div>
          </Col> */}

          {/* <Col lg="12">
            <div className="footer__bottom">
              <p className="section__description d-flex align-items-center justify-content-center gap-1 pt-4">
                <i className ="ri-copyright-line"></i>Copyright {year}, Developed by Kel 3. Original template by Muhibur Rahman.
              </p>
            </div>
          </Col> */}
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
