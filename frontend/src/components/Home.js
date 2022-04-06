import React, { Fragment, useEffect } from "react";
import Product from "./product/Product";
import MetaData from "./layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
// import { composeWithDevTools } from 'redux-devtools-extension';
import { getProducts } from "../actions/productActions";
import Loader from "./layout/Loader";
import {useAlert} from 'react-alert'


const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert()
  const { products, loading, error, productsCount } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    dispatch(getProducts());
    // if(error) {
    //   // alert.success('seccess')
    //  return alert.error(error)
    // }
 

  }, [dispatch, alert, error]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Buy Best Products Online"} />
          <h1 id="products_heading">Latest Products</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              {products &&
                products.map((product) => (
                  <Product key={product._id} product={product} /> // product is an object
                ))}
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
