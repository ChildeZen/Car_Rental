import React, { useState, useEffect, useRef } from 'react';
import { Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../../styles/car-item.css';

const CarItem = (props) => {
  const { imgUrl, model, carName, automatic, speed, price } = props.item;
  const { index = 0, isAvailable = true } = props;
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef(null);

  useEffect(() => {
    const currentRef = itemRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <Col lg="4" md="4" sm="6" className="mb-5">
      <div
        ref={itemRef}
        className={`car__item ${isVisible ? 'animate' : ''} ${!isAvailable ? 'unavailable' : ''}`}
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <div className="car__img">
          <img src={imgUrl} alt="" className="w-100" />
        </div>

        {!isAvailable && (
          <div className="unavailable-overlay">
            <span>Not Available</span>
            <small>Booked for selected dates</small>
          </div>
        )}

        <div className="car__item-content mt-4">
          <h4 className="section__title text-center">{carName}</h4>
          <h6 className="rent__price text-center mt-">
            Rp{price}.000.00 <span>/ Day</span>
          </h6>

          <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-car-line"></i> {model}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-settings-2-line"></i> {automatic}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-timer-flash-line"></i> {speed}
            </span>
          </div>

          <button
            className=" w-50 car__item-btn car__btn-rent"
            disabled={!isAvailable}
          >
            <Link to={`/cars/${carName}`}>Rent</Link>
          </button>

          <button className=" w-50 car__item-btn car__btn-details">
            <Link to={`/cars/${carName}`}>Details</Link>
          </button>
        </div>
      </div>
    </Col>
  );
};

export default CarItem;
