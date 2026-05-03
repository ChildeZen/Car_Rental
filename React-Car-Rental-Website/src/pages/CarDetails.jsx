import React, { useState, useEffect, useContext } from 'react';
import carData from '../assets/data/carData';
import { Container, Row, Col } from 'reactstrap';
import Helmet from '../components/Helmet/Helmet';
import { Link, useParams, useNavigate } from 'react-router-dom';
import BookingForm from '../components/UI/BookingForm';
import PaymentMethod from '../components/UI/PaymentMethod';
import ProofUploadModal from '../components/UI/ProofUploadModal';
import { addBooking, getBookedDates, isCarAvailable } from '../utils/bookingUtils';
import { AuthContext } from '../context/AuthContext'; // Pastikan path ke context benar

const CarDetails = () => {
  const { slug } = useParams();

  // Mencari data mobil berdasarkan nama (slug)
  const singleCarItem = carData.find((item) => item.carName === slug);

  const [bookingData, setBookingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    fromAddress: '',
    toAddress: '',
    journeyDate: '',
    journeyTime: '',
    notes: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('');

  const [showProofModal, setShowProofModal] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);

  const [bookedDates, setBookedDates] = useState([]);

  useEffect(() => {
    if (singleCarItem) {
      const dates = getBookedDates(singleCarItem.id);
      setBookedDates(dates);
    }
  }, [singleCarItem]);

  const navigate = useNavigate();
  const { isLoggedIn, user } = useContext(AuthContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [singleCarItem]);

  const onBookingChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const onPaymentChange = (value) => setPaymentMethod(value);

  const onPaymentSubmit = () => {
    if (!isLoggedIn) {
      alert('Silakan login untuk melanjutkan reservasi');
      navigate(`/login?returnUrl=/cars/${slug}`);
      return;
    }
    if (!paymentMethod) {
      alert('Silakan pilih metode pembayaran');
      return;
    }
    if (
      !bookingData.firstName ||
      !bookingData.email ||
      !bookingData.journeyDate
    ) {
      alert('Silakan lengkapi data reservasi');
      return;
    }
    const dates = [bookingData.journeyDate];
    if (!isCarAvailable(singleCarItem.id, dates)) {
      alert('Tanggal yang dipilih sudah dibooking oleh user lain. Pilih tanggal lain.');
      return;
    }
    setShowProofModal(true);
  };

  const onProofSubmit = (data) => {
    if (!isLoggedIn) {
      alert('Silakan login untuk mengkonfirmasi reservasi');
      navigate(`/login?returnUrl=/cars/${slug}`);
      return;
    }
    const carId = singleCarItem.id;
    const dates = [bookingData.journeyDate];
    const fullInfo = {
      ...data,
      userId: user?.id,
    };
    addBooking(carId, dates, fullInfo);
    alert('Reservasi berhasil dikonfirmasi dengan bukti DP!');
    setShowSuccess(true);
    setShowProofModal(false);
  };

  if (!singleCarItem) {
    return (
      <Helmet title="Car Not Found">
        <section>
          <Container>
            <Row>
              <Col lg="12" className="text-center">
                <h2 className="section__title">Car not found</h2>
                <p className="section__description">
                  Maaf, mobil yang Anda cari tidak tersedia.
                </p>
                <Link to="/cars" className="btn mt-4">
                  Kembali ke Katalog
                </Link>
              </Col>
            </Row>
          </Container>
        </section>
      </Helmet>
    );
  }

  return (
    <Helmet title={singleCarItem.carName}>
      <section>
        <Container>
          <Row>
            {/* Bagian Gambar Mobil */}
            <Col lg="6">
              <img
                src={singleCarItem.imgUrl}
                alt={singleCarItem.carName}
                className="w-100 rounded-3"
              />
            </Col>

            {/* Bagian Informasi Mobil */}
            <Col lg="6">
              <div className="car__info">
                <h2 className="section__title">{singleCarItem.carName}</h2>

                <div className="d-flex align-items-center gap-5 mb-4 mt-3">
                  <h6 className="rent__price fw-bold fs-4">
                    {/* Perbaikan format harga agar dinamis */}
                    Rp.{singleCarItem.price}.000.00 / Day
                  </h6>

                  <span className="d-flex align-items-center gap-2">
                    <span style={{ color: '#f9a826' }}>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    ({singleCarItem.rating} ratings)
                  </span>
                </div>

                <p className="section__description">
                  {singleCarItem.description}
                </p>

                {/* Spesifikasi Baris 1 */}
                <div
                  className="d-flex align-items-center mt-3"
                  style={{ columnGap: '4rem' }}
                >
                  <span className="d-flex align-items-center gap-1 section__description">
                    <i
                      className="ri-roadster-line"
                      style={{ color: '#f9a826' }}
                    ></i>{' '}
                    {singleCarItem.model}
                  </span>
                  <span className="d-flex align-items-center gap-1 section__description">
                    <i
                      className="ri-settings-2-line"
                      style={{ color: '#f9a826' }}
                    ></i>{' '}
                    {singleCarItem.automatic}
                  </span>
                  <span className="d-flex align-items-center gap-1 section__description">
                    <i
                      className="ri-timer-flash-line"
                      style={{ color: '#f9a826' }}
                    ></i>{' '}
                    {singleCarItem.speed}
                  </span>
                </div>

                {/* Spesifikasi Baris 2 */}
                <div
                  className="d-flex align-items-center mt-3"
                  style={{ columnGap: '2.8rem' }}
                >
                  <span className="d-flex align-items-center gap-1 section__description">
                    <i
                      className="ri-map-pin-line"
                      style={{ color: '#f9a826' }}
                    ></i>{' '}
                    {singleCarItem.gps}
                  </span>
                  <span className="d-flex align-items-center gap-1 section__description">
                    <i
                      className="ri-wheelchair-line"
                      style={{ color: '#f9a826' }}
                    ></i>{' '}
                    {singleCarItem.seatType}
                  </span>
                  <span className="d-flex align-items-center gap-1 section__description">
                    <i
                      className="ri-building-2-line"
                      style={{ color: '#f9a826' }}
                    ></i>{' '}
                    {singleCarItem.brand}
                  </span>
                </div>
              </div>
            </Col>

            {/* Tambahkan ini di dalam Col lg="7" atau tempat yang sesuai di CarDetails.jsx */}
            <div className="requirements__box mt-4 p-4" style={{ backgroundColor: "#f0f0f0", borderRadius: "10px" }}>
              <h5 className="mb-3 fw-bold" style={{ color: "#000d6b" }}>
                <i className="ri-information-line"></i> Syarat Sewa Lepas Kunci
              </h5>

              <ul className="list-unstyled">
                <li className="mb-2 d-flex align-items-center gap-2">
                  <i className="ri-checkbox-circle-fill" style={{ color: "#f9a826" }}></i>
                  <span>E-KTP Asli (Domisili sesuai kota rental)</span>
                </li>
                <li className="mb-2 d-flex align-items-center gap-2">
                  <i className="ri-checkbox-circle-fill" style={{ color: "#f9a826" }}></i>
                  <span>SIM A Aktif (Wajib difoto/upload)</span>
                </li>
                <li className="mb-2 d-flex align-items-center gap-2">
                  <i className="ri-checkbox-circle-fill" style={{ color: "#f9a826" }}></i>
                  <span>Kartu Keluarga / KTM (Untuk Mahasiswa)</span>
                </li>
                <li className="mb-2 d-flex align-items-center gap-2">
                  <i className="ri-checkbox-circle-fill" style={{ color: "#f9a826" }}></i>
                  <span>Jaminan Sepeda Motor + STNK asli (Ditinggal)</span>
                </li>
                <li className="mb-2 d-flex align-items-center gap-2">
                  <i className="ri-checkbox-circle-fill" style={{ color: "#f9a826" }}></i>
                  <span className="fw-bold text-danger">Wajib DP 20% untuk kunci jadwal</span>
                </li>
              </ul>

              <p className="small text-muted mt-3">
                * Tim kami akan melakukan verifikasi data dalam 1x24 jam setelah Anda melakukan booking.
              </p>
            </div>

            {/* Bagian Form Booking (Kiri) */}
            <Col lg="7" className="mt-5">
              <div className="booking-info mt-5 p-4 shadow-sm rounded-3">
                <h5 className="mb-4 fw-bold">Booking Information</h5>
                <BookingForm
                  bookingData={bookingData}
                  onChange={onBookingChange}
                  onBookingSubmit={onPaymentSubmit}
                  carId={singleCarItem.id}
                  bookedDates={bookedDates}
                />
              </div>
            </Col>

            {/* Bagian Metode Pembayaran (Kanan) */}
            <Col lg="5" className="mt-5">
              <div className="payment__info mt-5 p-4 shadow-sm rounded-3">
                <h5 className="mb-4 fw-bold">Payment Method</h5>
                <PaymentMethod
                  paymentMethod={paymentMethod}
                  onPaymentChange={onPaymentChange}
                  onPaymentSubmit={onPaymentSubmit}
                />
                <p className="text-muted mt-3 small">
                  * DP 20% dari harga sewa harus dibayarkan untuk
                  mengonfirmasi pesanan.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <ProofUploadModal
        isOpen={showProofModal}
        onClose={() => setShowProofModal(false)}
        onProofSubmit={onProofSubmit}
        bookingData={bookingData}
        paymentMethod={paymentMethod}
        carDetails={singleCarItem}
      />
      {showSuccess && (
        <div
          className="alert alert-success mt-4 p-4 position-fixed end-0 top-0 m-4"
          style={{ zIndex: 1060, maxWidth: '400px' }}
        >
          <h5>Berhasil!</h5>
          <p>
            Reservasi dikonfirmasi dengan bukti DP. Kami akan hubungi via WA.
          </p>
          <button
            className="btn-close"
            onClick={() => setShowSuccess(false)}
          ></button>
        </div>
      )}
    </Helmet>
  );
};

export default CarDetails;
