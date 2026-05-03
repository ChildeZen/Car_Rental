import React from 'react';
import '../../styles/our-member.css';
import { Col } from 'reactstrap';
import { Link } from 'react-router-dom';

const OUR__MEMBERS = [
  {
    name: 'Jhon Doe',
    experience: '5 years of experience',
    fbUrl: '#',
    instUrl: '#',
    twitUrl: '#',
    linkedinUrl: '#',
    imgUrl:
      'https://i.pinimg.com/1200x/3d/8b/c0/3d8bc06847abe31ed1c51f1bedbec10d.jpg',
  },

  {
    name: 'David Lisa',
    experience: '5 years of experience',
    fbUrl: '#',
    instUrl: '#',
    twitUrl: '#',
    linkedinUrl: '#',
    imgUrl:
      'https://i.pinimg.com/736x/32/9b/1e/329b1e83521ce64a960f848fd99cddee.jpg',
  },

  {
    name: 'Hilton King',
    experience: '5 years of experience',
    fbUrl: '#',
    instUrl: '#',
    twitUrl: '#',
    linkedinUrl: '#',
    imgUrl:
      'https://i.pinimg.com/736x/a6/bc/a4/a6bca4c14f032b304753e722be18d9dc.jpg',
  },

  {
    name: 'Jhon Doe',
    experience: '5 years of experience',
    fbUrl: '#',
    instUrl: '#',
    twitUrl: '#',
    linkedinUrl: '#',
    imgUrl:
      'https://i.pinimg.com/736x/d4/f1/43/d4f143d7b8ff5933b353482adc152b90.jpg',
  },
];

const OurMembers = () => {
  return (
    <>
      {OUR__MEMBERS.map((item, index) => (
        <Col lg="3" md="3" sm="4" xs="6" key={index} className="mb-4">
          <div className="single__member">
            <div className="single__member-img">
              <img src={item.imgUrl} alt="" className="w-100" />

              <div className="single__member-social">
                <Link to={item.fbUrl}>
                  <i className="ri-facebook-line"></i>
                </Link>
                <Link to={item.twitUrl}>
                  <i className="ri-twitter-line"></i>
                </Link>

                <Link to={item.linkedinUrl}>
                  <i className="ri-linkedin-line"></i>
                </Link>

                <Link to={item.instUrl}>
                  <i className="ri-instagram-line"></i>
                </Link>
              </div>
            </div>

            <h6 className="text-center mb-0 mt-3">{item.name}</h6>
            <p className="section__description text-center">
              {item.experience}
            </p>
          </div>
        </Col>
      ))}
    </>
  );
};

export default OurMembers;
