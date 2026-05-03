import React from 'react';

import CommonSection from '../components/UI/CommonSection';
import Helmet from '../components/Helmet/Helmet';
import AboutSection from '../components/UI/AboutSection';
import { Container, Row, Col } from 'reactstrap';

import driveImg from '../assets/all-images/drive.jpg';
import OurMembers from '../components/UI/OurMembers';
import '../styles/about.css';

const About = () => {
  return (
    <Helmet title="About">
      <CommonSection title="About Us" />
      <AboutSection aboutclassName="aboutPage" />

      <section className="about__page-section">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12">
              <div className="about__page-img">
                <img src={driveImg} alt="" className="w-100 rounded-3" />
              </div>
            </Col>

            <Col lg="6" md="6" sm="12">
              <div className="about__page-content">
                <h2 className="section__title">
                  We Are Committed To Provide Safe Ride Solutions
                </h2>

                <p className="section__description">
                  Kami menghadirkan standar baru dalam industri rental mobil
                  dengan mengintegrasikan sistem verifikasi armada yang
                  transparan dan aman. Melalui pendekatan berbasis teknologi,
                  kami memastikan setiap riwayat pemeliharaan dan kondisi unit
                  dapat diakses dengan jelas, memberikan Anda kepercayaan penuh
                  dalam setiap perjalanan.
                </p>

                <p className="section__description">
                  Bukan sekadar transportasi, kami menawarkan solusi mobilitas
                  masa depan yang efisien dan terenkripsi. Dengan dukungan tim
                  teknis yang solid, setiap transaksi dan proses pemesanan
                  dirancang untuk berjalan secara real-time, memastikan keamanan
                  data dan kenyamanan Anda tetap menjadi prioritas utama di era
                  digital ini.
                </p>

                <div className=" d-flex align-items-center gap-3 mt-4">
                  <span className="fs-4">
                    <i className="ri-phone-line"></i>
                  </span>

                  <div>
                    <h6 className="section__subtitle">Need Any Help?</h6>
                    <h4>+621234567889</h4>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* <BecomeDriverSection /> */}

      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <h6 className="section__subtitle">Experts</h6>
              <h2 className="section__title">Our Members</h2>
            </Col>
            <OurMembers />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default About;
