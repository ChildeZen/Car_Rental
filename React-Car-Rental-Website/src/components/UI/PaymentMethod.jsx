import React from "react";
import "../../styles/payment-method.css";

const PaymentMethod = () => {
  return (
    <>
      <div className="payment-method-item d-flex align-items-center justify-content-between p-3 rounded-3 mb-3">
        <label htmlFor="payment-bank" className="payment-method-label d-flex align-items-center gap-2 mb-0">
          <input id="payment-bank" type="radio" name="payment" />
          Direct Bank Transfer
        </label>
      </div>

      <div className="payment-method-item d-flex align-items-center justify-content-between p-3 rounded-3 mb-3">
        <label htmlFor="payment-cheque" className="payment-method-label d-flex align-items-center gap-2 mb-0">
          <input id="payment-cheque" type="radio" name="payment" />
          Cheque Payment
        </label>
      </div>

      <div className="payment-method-item d-flex align-items-center justify-content-between p-3 rounded-3 mb-3">
        <label htmlFor="payment-master" className="payment-method-label d-flex align-items-center gap-2 mb-0">
          <input id="payment-master" type="radio" name="payment" />
          Trasfer Bank
        </label>

        <div className="payment-method-img">
          <img src="https://i.pinimg.com/736x/32/ea/57/32ea57a6ea212f06959bff87722bd644.jpg" alt="Master Card" />
        </div>
      </div>

      <div className="payment-method-item d-flex align-items-center justify-content-between p-3 rounded-3 mb-4">
        <label htmlFor="payment-paypal" className="payment-method-label d-flex align-items-center gap-2 mb-0">
          <input id="payment-paypal" type="radio" name="payment" />
          Qris
        </label>

        <div className="payment-method-img">
          <img src="https://i.pinimg.com/1200x/88/15/e2/8815e2cf5c04cd1e82a9a68df1b28566.jpg" alt="Paypal" />
        </div>
      </div>

      <div className="payment-method-footer text-end mt-4">
        <button className="payment-method-btn">Reserve Now</button>
      </div>
    </>
  );
};

export default PaymentMethod;
