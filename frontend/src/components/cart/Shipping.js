import React, { Fragment, useState } from "react";

import { countryies } from "countries-list";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";

import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../actions/cartActions";
import { useNavigate } from "react-router-dom";
const Shipping = () => {
  let navigate = useNavigate();

  const { ShippingInfo } = useSelector((state) => state.cart || {});

  // const countriesList = Object.values(countryies).map(function (values) {
  //   return countryies[values];
  // });

  const [address, setAddress] = useState(ShippingInfo.address);
  const [city, setCity] = useState(ShippingInfo.city);
  const [postalCode, setPostalCode] = useState(ShippingInfo.postalCode);
  const [phoneNo, setPhoneNo] = useState(ShippingInfo.phone);
  const [country, setCountry] = useState(ShippingInfo.country);

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingInfo({ address, city, postalCode, phoneNo, country }));
    navigate("/order/confirm");
  };

  return (
    <Fragment>
      <MetaData title={"Shipping Info"} />

      <CheckoutSteps shipping />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-4">Shipping Info</h1>
            <div className="form-group">
              <label htmlFor="address_field">Address</label>
              <input
                type="text"
                id="address_field"
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="city_field">City</label>
              <input
                type="text"
                id="city_field"
                className="form-control"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone_field">Phone No</label>
              <input
                type="phone"
                id="phone_field"
                className="form-control"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="postal_code_field">Postal Code</label>
              <input
                type="number"
                id="postal_code_field"
                className="form-control"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="country_field">Country</label>
              <select
                id="country_field"
                className="form-control"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              >
                {/*countriesList.map((country) => (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                ))*/}
              </select>
            </div>

            <button
              id="shipping_btn"
              type="submit"
              className="btn btn-block py-3"
            >
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
