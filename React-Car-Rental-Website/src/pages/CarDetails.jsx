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
    endDate: '',
    journeyTime: '',
    notes: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('');

  const bookingDatesRange = (startDate, endDate) => {
    if (!startDate || !endDate) return [];
    const dates = [];
    const start = new Date(startDate);
    const end = new Date(endDate);

    for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  const parsePricePerDay = (price) => Number(String(price).replace(/[^0-9]/g, ''));

  const getDaysAndTotalPrice = () => {
    const { journeyDate, endDate } = bookingData;
    if (!journeyDate || !endDate) return { days: 0, totalPrice: 0 };

    const msPerDay = 24 * 60 * 60 * 1000;
    const days = Math.round((new Date(endDate) - new Date(journeyDate)) / msPerDay) + 1;
    const pricePerDay = parsePricePerDay(singleCarItem?.price);
    const totalPrice = days > 0 ? pricePerDay * days : 0;
    return { days, totalPrice };
  };


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

  const today = new Date().toISOString().split('T')[0];
  const isAvailableToday = !bookedDates.includes(today);

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
      !bookingData.journeyDate ||
      !bookingData.endDate
    ) {
      alert('Silakan lengkapi data reservasi');
      return;
    }
    const dates = bookingDatesRange(bookingData.journeyDate, bookingData.endDate);

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
    const dates = bookingDatesRange(bookingData.journeyDate, bookingData.endDate);
    const { days, totalPrice } = getDaysAndTotalPrice();

    const fullInfo = {
      ...data,
      userId: user?.id,
      startDate: bookingData.journeyDate,
      endDate: bookingData.endDate,
      days,
      pricePerDay: parsePricePerDay(singleCarItem.price),
      totalPrice,
      dpAmount: Math.round(totalPrice * 0.2),
    };

    addBooking(carId, dates, fullInfo);

    alert('Reservasi berhasil dikonfirmasi dengan bukti DP!');
    setShowSuccess(true);
    setShowProofModal(false);
  };

  const staticReviews = singleCarItem?.reviews || [];

  const [dynamicReviews, setDynamicReviews] = useState([]);

  useEffect(() => {
    const allReviews = JSON.parse(localStorage.getItem('carReviews') || '[]');
    const carReviews = allReviews.filter((r) => r.carId === singleCarItem?.id);
    setDynamicReviews(carReviews);
  }, [singleCarItem]);

  const reviews = [...staticReviews, ...dynamicReviews];

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
                    Rp. {singleCarItem.price.toLocaleString('id-ID')} / Day
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
                  className="d-flex align-items-center mt-3 flex-wrap"
                  style={{ columnGap: '2.8rem', rowGap: 10 }}
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


            {/* Syarat Lepas Kunci */}
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

            {/* Vehicle Condition */}
            <Col lg="12" className="mt-4">
              <div className="p-4" style={{ backgroundColor: "#ffffff", borderRadius: "10px" }}>
                <h5 className="fw-bold mb-4" style={{ color: "#000d6b" }}>
                  <i className="ri-car-line"></i> Vehicle Condition
                </h5>

                <Row className="mb-4">
                  {/* Kondisi Kendaraan */}
                  {singleCarItem.conditions?.map((c, i) => (
                    <Col lg="6" md="6" sm="6" key={i} className="mb-3">
                      <div className="d-flex align-items-center justify-content-between" style={{ maxWidth: '280px', gap: '12px' }}>
                        <span className="section__description mb-0 fw-bold">{c.label}</span>
                        <span
                          className="badge"
                          style={{
                            backgroundColor: c.status ? '#28a745' : '#dc3545',
                            color: 'white',
                            padding: '5px 12px',
                            fontSize: '12px'
                          }}
                        >
                          {c.status ? 'Aman' : 'Tidak Aman'}
                        </span>
                      </div>
                    </Col>
                  ))}
                </Row>

                {/* Status Ketersediaan Mobil */}
                <Row className="d-flex justify-content-center">
                  <Col >
                    <div
                      className="p-3 rounded-3 text-center"
                      style={{
                        backgroundColor: isAvailableToday ? '#d4edda' : '#f8d7da',
                        border: `1px solid ${isAvailableToday ? '#000000' : '#73000c'}`
                      }}
                    >
                      <i
                        className={isAvailableToday ? 'ri-checkbox-circle-fill' : 'ri-close-fill'}
                        style={{ color: isAvailableToday ? '#28a745' : '#dc3545', fontSize: '24px' }}
                      ></i>
                      <p className="mb-0 fw-bold mt-1" style={{ color: isAvailableToday ? '#28a745' : '#dc3545' }}>
                        {isAvailableToday ? 'Kendaraan tersedia untuk Hari Ini' : 'Kendaraan Sedang Disewa'}
                      </p>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>

            {/* Section Reviews */}
            <Col lg="12" className="mt-5">
              <h5 className="fw-bold mb-4">Review Pelanggan</h5>
              {reviews.length === 0 ? (
                <p className="section__description">Belum ada review untuk mobil ini.</p>
              ) : (
                <Row>
                  {reviews.map((review) => (
                    <Col lg="4" md="6" sm="12" className="mb-4" key={review.id}>
                      <div className="p-3 shadow-sm rounded-3" style={{ backgroundColor: "white" }}>
                        <p className="section__description">{review.comment}</p>
                        <div className="d-flex align-items-center gap-3 mt-3">
                          <img
                            src={review.photoUrl}
                            alt={review.user}
                            className="rounded-circle"
                            style={{ width: "45px", height: "45px", objectFit: "cover" }}
                          />
                          <div>
                            <h6 className="mb-0">{review.user}</h6>
                            <span style={{ color: "#f9a826" }}>
                              {"⭐".repeat(review.rating)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              )}
            </Col>

            {/* Booking Information  */}
            <Col lg="7" className="mt-3">
              <div className="booking-info p-4 shadow-sm rounded-3">
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

            {/* Bagian Metode Pembayaran */}
            <Col lg="5" className="mt-5">
              <div className="payment__info mt-5 p-4 shadow-sm rounded-3">
                <div
                  className="mt-0"
                  style={{ backgroundColor: '#f8f9fa', borderRadius: '12px', padding: '12px 14px' }}
                >
                  <div className="d-flex align-items-center justify-content-between gap-3">
                    <span style={{ color: '#000d6b', fontWeight: 700 }}>Total Harga</span>
                    <span style={{ color: '#f9a826', fontWeight: 800, fontSize: '18px' }}>
                      Rp. {getDaysAndTotalPrice().totalPrice.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="small text-muted mt-1">
                    {getDaysAndTotalPrice().days || 0} hari • DP 20%: Rp.{
                      Math.round(getDaysAndTotalPrice().totalPrice * 0.2).toLocaleString('id-ID')
                    }
                  </div>
                </div>

                <h5 className="mb-4 fw-bold mt-4">Payment Method</h5>
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
