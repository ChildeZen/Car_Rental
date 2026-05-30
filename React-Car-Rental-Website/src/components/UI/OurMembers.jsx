import React from 'react';
import '../../styles/our-member.css';
import { Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const OUR__MEMBERS = [
  {
    name: 'Rafif Naufal Pratama',
    experience: '3 years of experience',
    fbUrl: '#',
    instUrl: '#',
    twitUrl: '#',
    linkedinUrl: '#',
    imgUrl:
      'https://i.pinimg.com/1200x/3d/8b/c0/3d8bc06847abe31ed1c51f1bedbec10d.jpg',
  },

  {
    name: 'Fathi Arzaq Shidiq',
    experience: '5 years of experience',
    fbUrl: '#',
    instUrl: '#',
    twitUrl: '#',
    linkedinUrl: '#',
    imgUrl:
      'https://i.pinimg.com/736x/32/9b/1e/329b1e83521ce64a960f848fd99cddee.jpg',
  },

  {
    name: 'I Made Rama Wijana Putra',
    experience: '5 years of experience',
    fbUrl: '#',
    instUrl: '#',
    twitUrl: '#',
    linkedinUrl: '#',
    imgUrl:
      'https://i.pinimg.com/736x/a6/bc/a4/a6bca4c14f032b304753e722be18d9dc.jpg',
  },

  {
    name: 'Muhammad Daffa Arrahman',
    experience: '5 years of experience',
    fbUrl: '#',
    instUrl: '#',
    twitUrl: '#',
    linkedinUrl: '#',
    imgUrl:
      'https://i.pinimg.com/736x/d4/f1/43/d4f143d7b8ff5933b353482adc152b90.jpg',
  },
  {
    name: 'Raffa Al Rasyid',
    experience: '5 years of experience',
    fbUrl: '#',
    instUrl: 'https://www.instagram.com/_raffa_al/',
    twitUrl: '#',
    linkedinUrl: 'https://www.linkedin.com/in/raffa-al-rasyid',
    imgUrl:
      'https://i.pinimg.com/736x/0b/f7/45/0bf745214c593822930999fc1ac1ab90.jpg',
  },
];

const OurMembers = () => {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 980,
    autoplaySpeed: 1900,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 576,
        settings: { slidesToShow: 2 }
      }
    ]
  };

  return (
    <Slider {...settings}>
      {OUR__MEMBERS.map((item, index) => (
        <div key={index} className="px-2">
          <div className="single__member">
            <div className="single__member-img">
              <img src={item.imgUrl} alt="" className="w-100" />
              <div className="single__member-social">
                <a href={item.fbUrl} target="_blank" rel="noreferrer">
                  <i className="ri-facebook-line"></i>
                </a>
                <a href={item.twitUrl} target="_blank" rel="noreferrer">
                  <i className="ri-twitter-line"></i>
                </a>
                <a href={item.linkedinUrl} target="_blank" rel="noreferrer">
                  <i className="ri-linkedin-line"></i>
                </a>
                <a href={item.instUrl} target="_blank" rel="noreferrer">
                  <i className="ri-instagram-line"></i>
                </a>
              </div>
            </div>
            <h6 className="text-center mb-0 mt-3">{item.name}</h6>
            <p className="section__description text-center">{item.experience}</p>
          </div>
        </div>
      ))}
    </Slider>
  );
};
export default OurMembers;
