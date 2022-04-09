import React, { Fragment, useEffect } from "react";

import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";

import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrder,clearErrors } from "../../actions/orderActions";
import { saveShippingInfo } from "../../actions/cartActions";
import {
  useStripe,
  useElements,
  CardExpiryElement,
  CardCvcElement,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
const options = {
  style: {
    base: {
      fontSize: "16px",
    },
    invalid: {
      color: "#9e2146",
    },
  },
};
const Payment = () => {
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const {error} = useSelector((state) => state.newOrder);

  useEffect(() => {

    if (error) {
        alert.error(error)
        dispatch(clearErrors())
    }

}, [dispatch, alert, error])
const order = {
  orderItems: cartItems,
  shippingInfo,
};

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice
    order.shippingPrice = orderInfo.shippingPrice
    order.taxPrice = orderInfo.taxPrice
    order.totalPrice = orderInfo.totalPrice
}

  const paymentData = {
    amount: Math.round(orderInfo.amount * 100),
  };

  
  const SubmitHandler = async (e) => {
    let navigate = useNavigate();
    e.preventDefault();
    document.querySelector("#pay_btn").disabled = true;

    let res;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
        res = await axios.post("/api/v1/payment/process", paymentData, config);
        const clientsecret = res.data.clientSecret;
        // console.log(clientSecret);
        if(!stripe || !elements) {
          return;
        }
        const result = await stripe.confirmCardPayment(clientsecret, {
            payment_method: {
                card: elements.getElement(CardNumberElement),
                billing_details: {
                    name: user.name,
                    email: user.email,
                },
            },
        });
        if(result.error) {
            console.log(result.error.message);
            document.querySelector("#pay_btn").disabled = false;
            alert.show("Payment failed, please try again");
        }else{

            // The payment is processed or not
            if(result.paymentIntent.status==="succeeded"){
                order.paymentInfo={
                    id: result.paymentIntent.id,
                    status: result.paymentIntent.status,
                }
                dispatch(createOrder(order));
                navigate("/success");
            }else{
                document.querySelector("#pay_btn").disabled = false;
                alert.show("Payment failed, please try again");
            }
        }

    } catch (error) {
      document.querySelector("#pay_btn").disabled = false;
      alert.error(error.response.data.message);
    }
  };

  return (
    <Fragment>
      <MetaData title={"Payment"} />

      <CheckoutSteps shipping confirmOrder payment />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={SubmitHandler}>
            <h1 className="mb-4">Card Info</h1>
            <div className="form-group">
              <label htmlFor="card_num_field">Card Number</label>
              <CardNumberElement
                type="text"
                id="card_num_field"
                className="form-control"
                options={options}
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_exp_field">Card Expiry</label>
              <CardExpiryElement
                type="text"
                id="card_exp_field"
                className="form-control"
                options={options}
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_cvc_field">Card CVC</label>
              <CardCvcElement
                type="text"
                id="card_cvc_field"
                className="form-control"
                options={options}
              />
            </div>

            <button id="pay_btn" type="submit" className="btn btn-block py-3">
              Pay {` - ${orderInfo && orderInfo.totalPrice}`}
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

Payment.propTypes = {};

export default Payment;
