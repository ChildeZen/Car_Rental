import React from 'react';
import '../../styles/payment-method.css';

const PaymentMethod = ({ paymentMethod, onPaymentChange, onPaymentSubmit }) => {
  return (
    <>
      <div className="payment-method-item d-flex align-items-center justify-content-between p-3 rounded-3 mb-3">
        <label
          htmlFor="payment-visa"
          className="payment-method-label d-flex align-items-center gap-2 mb-0"
        >
          <input
            id="payment-visa"
            type="radio"
            name="payment"
            value="visa"
            checked={paymentMethod === 'visa'}
            onChange={(e) => onPaymentChange(e.target.value)}
          />
          Visa
        </label>
        <div className="payment-method-img">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
            alt="Visa"
            style={{ width: '40px' }}
          />
        </div>
      </div>

      <div className="payment-method-item d-flex align-items-center justify-content-between p-3 rounded-3 mb-3">
        <label
          htmlFor="payment-transfer"
          className="payment-method-label d-flex align-items-center gap-2 mb-0"
        >
          <input
            id="payment-transfer"
            type="radio"
            name="payment"
            value="transfer"
            checked={paymentMethod === 'transfer'}
            onChange={(e) => onPaymentChange(e.target.value)}
          />
          Transfer Bank
        </label>
        <div className="payment-method-img">
          {/* Menggunakan image Master Card/Bank sesuai keinginanmu */}
          <img
            src="https://i.pinimg.com/736x/32/ea/57/32ea57a6ea212f06959bff87722bd644.jpg"
            alt="Bank Transfer"
          />
        </div>
      </div>

      <div className="payment-method-item d-flex align-items-center justify-content-between p-3 rounded-3 mb-4">
        <label
          htmlFor="payment-qris"
          className="payment-method-label d-flex align-items-center gap-2 mb-0"
        >
          <input
            id="payment-qris"
            type="radio"
            name="payment"
            value="qris"
            checked={paymentMethod === 'qris'}
            onChange={(e) => onPaymentChange(e.target.value)}
          />
          QRIS
        </label>
        <div className="payment-method-img">
          <img
            src="https://i.pinimg.com/1200x/88/15/e2/8815e2cf5c04cd1e82a9a68df1b28566.jpg"
            alt="QRIS"
          />
        </div>
      </div>

      <div className="payment-method-footer text-end mt-4">
        {/* Hapus tag <a> karena tombol ini seharusnya memicu submit form */}
        <button
          className="payment-method-btn w-100"
          style={{
            background: '#f9a826',
            color: '#000d6b',
            fontWeight: 'bold',
          }}
          onClick={onPaymentSubmit}
        >
          Reserve Now
        </button>
      </div>
    </>
  );
};

export default PaymentMethod;
