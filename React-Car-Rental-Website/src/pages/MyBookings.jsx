import React, { useContext, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import { AuthContext } from '../context/AuthContext';
import { getUserBookings, hasReviewed } from '../utils/bookingUtils';
import ReviewModal from '../components/UI/ReviewModal';
import carData from '../assets/data/carData';

const MyBookings = () => {
  const { user, isLoggedIn } = useContext(AuthContext);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const bookings = isLoggedIn ? getUserBookings(user?.id) : [];
  const today = new Date().toISOString().split('T')[0];

  const getCarName = (carId) => {
    const car = carData.find((c) => c.id === carId);
    return car ? car.carName : 'Unknown Car';
  };

  const getStatus = (booking) => {
    if (booking.userInfo?.endDate < today) return 'Selesai';
    if (booking.userInfo?.startDate <= today && booking.userInfo?.endDate >= today) return 'Berlangsung';
    return 'Upcoming';
  };

  const getStatusColor = (status) => {
    if (status === 'Selesai') return '#28a745';
    if (status === 'Berlangsung') return '#f9a826';
    return '#000d6b';
  };

  const handleReview = (booking) => {
    setSelectedBooking(booking);
    setShowReviewModal(true);
  };

  if (!isLoggedIn) {
    return (
      <Helmet title="My Bookings">
        <CommonSection title="My Bookings" />
        <section>
          <Container>
            <Row>
              <Col lg="12" className="text-center mt-5">
                <h5>Silakan login untuk melihat riwayat booking kamu.</h5>
              </Col>
            </Row>
          </Container>
        </section>
      </Helmet>
    );
  }

  return (
    <Helmet title="My Bookings">
      <CommonSection title="My Bookings" />
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mt-4">
              {bookings.length === 0 ? (
                <p className="text-center section__description">
                  Kamu belum memiliki riwayat booking.
                </p>
              ) : (
                bookings.map((booking) => {
                  const status = getStatus(booking);
                  const alreadyReviewed = hasReviewed(booking.id);

                  return (
                    <div
                      key={booking.id}
                      className="mb-3 p-4 rounded-3 shadow-sm"
                      style={{ backgroundColor: '#f8f9fa', borderLeft: `4px solid ${getStatusColor(status)}` }}
                    >
                      <Row className="align-items-center">
                        {/* Info Booking */}
                        <Col lg="8" md="8" sm="12">
                          <h6 className="fw-bold mb-1" style={{ color: '#000d6b' }}>
                            {getCarName(booking.carId)}
                          </h6>
                          <p className="mb-1 small text-muted">
                            📅 {booking.userInfo?.startDate} → {booking.userInfo?.endDate}
                            ({booking.userInfo?.days} hari)
                          </p>
                          <p className="mb-1 small text-muted">
                            💰 Total: Rp. {booking.userInfo?.totalPrice?.toLocaleString('id-ID')} •
                            DP: Rp. {booking.userInfo?.dpAmount?.toLocaleString('id-ID')}
                          </p>
                          <p className="mb-0 small text-muted">
                            💳 {booking.paymentMethod}
                          </p>
                        </Col>

                        {/* Status & Tombol Review */}
                        <Col lg="4" md="4" sm="12" className="text-end mt-3 mt-md-0">
                          <span
                            className="badge mb-2 d-block"
                            style={{ backgroundColor: getStatusColor(status), fontSize: '12px', padding: '6px 12px' }}
                          >
                            {status}
                          </span>

                          {status === 'Selesai' && !alreadyReviewed && (
                            <button
                              className="btn btn-sm w-100"
                              style={{ backgroundColor: '#f9a826', color: 'white', border: 'none' }}
                              onClick={() => handleReview(booking)}
                            >
                              ⭐ Beri Review
                            </button>
                          )}

                          {status === 'Selesai' && alreadyReviewed && (
                            <span className="small text-success">✅ Sudah direview</span>
                          )}
                        </Col>
                      </Row>
                    </div>
                  );
                })
              )}
            </Col>
          </Row>
        </Container>
      </section>

      {selectedBooking && (
        <ReviewModal
          isOpen={showReviewModal}
          onClose={() => setShowReviewModal(false)}
          carId={selectedBooking.carId}
          bookingId={selectedBooking.id}
          carName={getCarName(selectedBooking.carId)}
        />
      )}
    </Helmet>
  );
};

export default MyBookings;