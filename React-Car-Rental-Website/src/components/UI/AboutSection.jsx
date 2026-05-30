import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../../styles/about-section.css';

const AboutSection = ({ aboutClass }) => {
  return (
    <section
      className="about__section"
      style={
        aboutClass === 'aboutPage'
          ? { marginTop: '0px' }
          : { marginTop: '80px' }
      }
    >
      <Container>
        <Row >
          <Col lg="6" md="6">
            <div className="about__section-content">
              <h4 className="section__subtitle">About Us</h4>
              <h2 className="section__title">Welcome to car rent</h2>
              <p className="section__description">
                Selamat datang di platform rental mobil generasi terbaru. Kami
                hadir untuk memberikan solusi transportasi yang praktis bagi
                masyarakat Indonesia. Dengan koleksi armada yang lengkap mulai
                dari mobil keluarga yang nyaman hingga kendaraan listrik yang
                ramah lingkungan kami memastikan perjalanan Anda selalu
                menyenangkan. Didukung oleh teknologi blockchain, kami menjamin
                proses booking yang instan dan transparansi biaya sejak awal.
              </p>

              <div className="about__section-item d-flex align-items-center">
                <p className="section__description d-flex align-items-center gap-2">
                  <i className="ri-checkbox-circle-line"></i> Armada Terawat &
                  Terbaru.
                </p>

                <p className="section__description d-flex align-items-center gap-2">
                  <i className="ri-checkbox-circle-line"></i>Harga Transparan &
                  Kompetitif
                </p>
              </div>

              <div className="about__section-item d-flex align-items-center">
                <p className="section__description d-flex align-items-center gap-2">
                  <i className="ri-checkbox-circle-line"></i>Layanan Antar Jemput
                  24/7.
                </p>

                <p className="section__description d-flex align-items-center gap-2">
                  <i className="ri-checkbox-circle-line"></i> Proses Booking Cepat &
                  Mudah.
                </p>
              </div>
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="about__img">
              <img src='https://i.pinimg.com/1200x/47/bf/a4/47bfa4d89f2158f3960e9bcd3a3b93f0.jpg' alt="" className="rounded-3" style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutSection;
