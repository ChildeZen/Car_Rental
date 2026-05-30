import React, { useState, useEffect } from 'react';
import '../../styles/booking-form.css';
import {Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert,} from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BookingForm = ({ bookingData, onChange, onBookingSubmit, carId, bookedDates = [] }) => {
  const [simPhoto, setSimPhoto] = useState(null);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (bookedDates.includes(bookingData.journeyDate)) {
      onChange({ target: { name: 'journeyDate', value: '' } });
    }
  }, [bookedDates, bookingData.journeyDate, onChange]);

  const handleSimPhotoChange = (e) => {
    setSimPhoto(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataWithSim = { ...bookingData };
    if (simPhoto) {
      dataWithSim.simPhotoUrl = URL.createObjectURL(simPhoto);
    }
    onBookingSubmit(dataWithSim);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input
          name="firstName"
          type="text"
          placeholder="Nama Depan"
          required
          value={bookingData.firstName}
          onChange={onChange}
        />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input
          name="lastName"
          type="text"
          placeholder="Nama Belakang"
          required
          value={bookingData.lastName}
          onChange={onChange}
        />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={bookingData.email}
          onChange={onChange}
        />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input
          name="phoneNumber"
          type="number"
          placeholder="Nomor Telepon (WA)"
          required
          value={bookingData.phoneNumber}
          onChange={onChange}
        />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input
          name="fromAddress"
          type="text"
          placeholder="Lokasi Penjemputan"
          required
          value={bookingData.fromAddress}
          onChange={onChange}
        />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input
          name="toAddress"
          type="text"
          placeholder="Lokasi Tujuan"
          required
          value={bookingData.toAddress}
          onChange={onChange}
        />
      </FormGroup>
 
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <DatePicker
          selected={bookingData.journeyDate ? new Date(bookingData.journeyDate) : null}
          onChange={(date) => onChange({ target: { name: 'journeyDate', value: date.toISOString().split('T')[0] } })}
          minDate={new Date()}
          placeholderText="Tanggal Mulai"
          dateFormat="dd/MM/yyyy"
          highlightDates={[
            {
              "react-datepicker__day--booked-date": bookedDates.map(d => new Date(d))
            }
          ]}
          excludeDates={bookedDates.map(d => new Date(d))}
          className="booking__form"
        />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <DatePicker
          selected={bookingData.endDate ? new Date(bookingData.endDate) : null}
          onChange={(date) => onChange({ target: { name: 'endDate', value: date.toISOString().split('T')[0] } })}
          minDate={bookingData.journeyDate ? new Date(bookingData.journeyDate) : new Date()}
          placeholderText="Tanggal Selesai"
          dateFormat="dd/MM/yyyy"
          highlightDates={[
            {
              "react-datepicker__day--booked-date": bookedDates.map(d => new Date(d))
            }
          ]}
          excludeDates={bookedDates.map(d => new Date(d))}
          className="booking__form"
        />
      </FormGroup>
      {/* <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input
          name="journeyTime"
          type="time"
          className="time__picker"
          required
          value={bookingData.journeyTime}
          onChange={onChange}
        />
      </FormGroup> */}


      <FormGroup>
        <textarea
          name="notes"
          rows="5"
          className="textarea"
          placeholder="Catatan Tambahan"
          value={bookingData.notes}
          onChange={onChange}
        ></textarea>
      </FormGroup>

      <FormGroup>
        <Label for="simPhoto" className="form-label">
          Foto SIM (Required)
        </Label>
        <Input
          type="file"
          id="simPhoto"
          accept="image/jpeg,image/png,image/jpg"
          onChange={handleSimPhotoChange}
          className="form-control"
          required
        />
        {simPhoto && (
          <div className="mt-2">
            <img
              src={URL.createObjectURL(simPhoto)}
              alt="SIM Preview"
              style={{ maxWidth: '200px', maxHeight: '150px' }}
              className="img-thumbnail"
            />
          </div>
        )}
        <small className="text-muted">JPG/PNG/JPEG, max 5MB</small>
      </FormGroup>

      {/* <button className="btn reserve__btn mt-4" type="submit">
        Kirim Reservasi
      </button> */}
    </Form>
  );
};

export default BookingForm;
