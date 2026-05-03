import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/find-car-form.css';
import { Form, FormGroup } from 'reactstrap';
import carData from '../../assets/data/carData';

const brandOptions = ['all', ...new Set(carData.map((car) => car.brand))];

const FindCarForm = () => {
  const [formData, setFormData] = useState({
    // fromAddress: "",
    // toAddress: "",
    journeyDate: '',
    journeyTime: '',
    brand: 'all',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/cars', { state: { filters: formData } });
  };

  return (
    <Form className="form" onSubmit={handleSubmit}>
      <div className=" d-flex align-items-center justify-content-between flex-wrap">
        {/* <FormGroup className="form__group"> */}
        {/* <input
            type="text"
            name="fromAddress"
            placeholder="From address"
            value={formData.fromAddress}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup className="form__group">
          <input
            type="text"
            name="toAddress"
            placeholder="To address"
            value={formData.toAddress}
            onChange={handleChange}
            required
          />
        </FormGroup> */}

        <FormGroup className="form__group">
          <input
            type="date"
            name="journeyDate"
            placeholder="Journey date"
            value={formData.journeyDate}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup className="form__group">
          <input
            className="journey__time"
            type="time"
            name="journeyTime"
            placeholder="Journey time"
            value={formData.journeyTime}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup className="select__group">
          <select name="brand" value={formData.brand} onChange={handleChange}>
            {brandOptions.map((brandOption) => (
              <option key={brandOption} value={brandOption}>
                {brandOption === 'all' ? 'All Brands' : brandOption}
              </option>
            ))}
          </select>
        </FormGroup>

        <FormGroup className="form__group">
          <button type="submit" className="btn find__car-btn">
            Find Car
          </button>
        </FormGroup>
      </div>
    </Form>
  );
};

export default FindCarForm;
