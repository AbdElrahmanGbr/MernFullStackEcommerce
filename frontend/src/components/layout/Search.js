import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../../actions/productActions';
// import { getProducts } from "../actions/productActions";

const Search = () => {

    const [keyword, setKeyword] = useState('');
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const searchHandler = (e) => {
        e.preventDefault()

        if (keyword.trim()) {

            dispatch(getProducts(1, keyword));
            navigate(`/search/${keyword}`);
            setKeyword('');
        } else {
            navigate('/')
        }
    }

    return (
        <form onSubmit={searchHandler} >
            <div className="input-group">
                <input
                    type="text"
                    id="search_field"
                    className="form-control"
                    placeholder="Enter Product Name ..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <div className="input-group-append">
                    <button id="search_btn" className="btn">
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </form>
    )
}

export default Search