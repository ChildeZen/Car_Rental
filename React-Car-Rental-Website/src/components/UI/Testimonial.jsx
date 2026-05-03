import React from 'react';
import Slider from 'react-slick';

import '../../styles/testimonial.css';

const Testimonial = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      <div className="testimonial py-4 px-3 p-5">
        <p className="section__description">
          JMobil dalam kondisi sangat prima, mesin halus dan responsif. Interior
          bersih, AC dingin, dan tidak ada bau tidak sedap. Eksterior juga masih
          mulus tanpa lecet berarti. Sangat nyaman dipakai untuk perjalanan jauh
          maupun dalam kota.
        </p>

        <div className="mt-3 d-flex align-items-center gap-4">
          <img
            src="https://i.pinimg.com/736x/ae/7d/7b/ae7d7b4ba99d0c7a67890f02ed1a9b45.jpg"
            alt=""
            className="w-25 h-25 rounded-2"
          />

          <div>
            <h6 className="mb-0 mt-3">Rama</h6>
            <p className="section__description">Customer</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3 p-5">
        <p className="section__description">
          Kondisi mobil standar, mesin masih hidup normal tapi performa sudah
          tidak seoptimal dulu. AC kurang dingin dan ada suara kecil saat
          melewati jalan tidak rata. Perlu sedikit perawatan agar lebih nyaman
          digunakan.
        </p>

        <div className="mt-3 d-flex align-items-center gap-4">
          <img
            src="https://i.pinimg.com/1200x/fe/12/a3/fe12a36a4f8dd44542b357204a7f2a10.jpg"
            alt=""
            className="w-25 h-25 rounded-2"
          />

          <div>
            <h6 className="mb-0 mt-3">Arzaq</h6>
            <p className="section__description">Customer</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3 p-5">
        <p className="section__description">
          Mobil masih layak pakai, mesin normal dan tidak ada kendala besar.
          Namun terdapat beberapa lecet ringan di bagian bodi dan interior
          sedikit aus. Secara keseluruhan masih nyaman digunakan.
        </p>

        <div className="mt-3 d-flex align-items-center gap-4">
          <img
            src="https://i.pinimg.com/1200x/74/1a/3a/741a3a34826bcde19a54f5b77fb34d3c.jpg"
            alt=""
            className="w-25 h-25 rounded-2"
          />

          <div>
            <h6 className="mb-0 mt-3">Rafif</h6>
            <p className="section__description">Customer</p>
          </div>
        </div>
      </div>

      {/* <div className="testimonial py-4 px-3">
        <p className="section__description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus magni
          explicabo molestias recusandae repudiandae, dolor, sapiente placeat
          ab, animi eum minima nulla facere aliquam aut vitae quo pariatur
          voluptate odit?
        </p>

        <div className="mt-3 d-flex align-items-center gap-4">
          <img src={ava04} alt="" className="w-25 h-25 rounded-2" />

          <div>
            <h6 className="mb-0 mt-3">Jhon Doe</h6>
            <p className="section__description">Customer</p>
          </div>
        </div>
      </div> */}
    </Slider>
  );
};

export default Testimonial;
