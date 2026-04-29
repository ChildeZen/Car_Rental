import React from "react";
import "../../styles/booking-form.css";
import { Form, FormGroup, Row, Col } from "reactstrap";

const BookingForm = () => {
  const submitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <Form onSubmit={submitHandler}>
      <Row>
        <Col lg="6" md="6" sm="12">
          <FormGroup className="booking__form">
            <input type="text" placeholder="First Name" />
          </FormGroup>
        </Col>
        <Col lg="6" md="6" sm="12">
          <FormGroup className="booking__form">
            <input type="text" placeholder="Last Name" />
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col lg="6" md="6" sm="12">
          <FormGroup className="booking__form">
            <input type="email" placeholder="Email" />
          </FormGroup>
        </Col>
        <Col lg="6" md="6" sm="12">
          <FormGroup className="booking__form">
            <input type="number" placeholder="Phone Number" />
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col lg="6" md="6" sm="12">
          <FormGroup className="booking__form">
            <select name="" id="">
              <option value="1 person">1 Person</option>
              <option value="2 person">2 Person</option>
              <option value="3 person">3 Person</option>
              <option value="4 person">4 Person</option>
              <option value="5+ person">5+ Person</option>
            </select>
          </FormGroup>
        </Col>
        <Col lg="6" md="6" sm="12">
          <FormGroup className="booking__form">
            <input type="text" placeholder="From Address" />
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col lg="6" md="6" sm="12">
          <FormGroup className="booking__form">
            <input type="date" placeholder="Journey Date" />
          </FormGroup>
        </Col>
        <Col lg="6" md="6" sm="12">
          <FormGroup className="booking__form">
            <input
              type="time"
              placeholder="Journey Time"
              className="time__picker"
            />
          </FormGroup>
        </Col>
      </Row>

      <FormGroup>
        <textarea
          rows={5}
          type="textarea"
          className="textarea"
          placeholder="Write"
        ></textarea>
      </FormGroup>
    </Form>
  );
};

export default BookingForm;
