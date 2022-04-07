import React , {useState} from 'react'
// import { useHistory } from "react-router-dom";
import { useNavigate,NavLink } from 'react-router-dom';


const Search = () => {
    // const history = useHistory();
    
    const navigation = useNavigate();
    
    const [keyword, setKeyWord]= useState('')
    const searchHandler = (e) => {

        e.preventDefault();
        
        console.log(keyword);
        if(keyword.trim()){
            console.log(keyword);
            navigation(`/search/${keyword}`)
        } else {
            navigation(`/`)
        }

    }

console.log(keyword);
  return (
   <>
   
      <div className='input-group'>
                        <input type="text" id="search_field"
                            className='form-control'
                            placeholder='Enter Product Name ...'
                            value={keyword}
                            onChange={(e) => setKeyWord(e.target.value)}
                        />
                        <div className='input-group-append'>
                            <NavLink onClick={searchHandler} to={`/search/${keyword}`} className='btn btn-primary' id='search_btn'>
                                  <i className='fa fa-search' aria-hidden="true"></i></NavLink>
                            {/* <button type='submit' id="search_btn" className='btn'>
                                <i className='fa fa-search' aria-hidden="true"></i>
                            </button > */}
                        </div>
                    </div>
                   

</>
  )
}

export default Search
