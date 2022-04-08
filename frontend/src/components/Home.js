import React, { Fragment, useState, useEffect } from "react";
// import Pagination from 'react-js-pagination'
import Product from "./product/Product";
import MetaData from "./layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
// import { composeWithDevTools } from 'redux-devtools-extension';
import { getProducts } from "../actions/productActions";
import Loader from "./layout/Loader";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import { useParams } from 'react-router-dom'

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const alert = useAlert();
  const { products, loading, error, productsCount, resPerPage , filteredProductsCount } = useSelector(
    (state) => state.products
  );
  const { keyword } = useParams()


  useEffect(() => {
    if (error) {
      // alert.success("seccess");
      return alert.error(error);
    }
 
    dispatch(getProducts(currentPage,keyword ? keyword : ''));
  }, [dispatch, alert, error, currentPage,keyword]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }
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
          {resPerPage <= productsCount && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={filteredProductsCount}
                onChange={setCurrentPageNo}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
