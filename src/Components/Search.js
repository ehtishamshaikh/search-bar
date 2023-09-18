import React, { useEffect, useReducer } from 'react'
import axios from 'axios';
const Search = () => {

  const API = "https://api.pujakaitem.com/api/products";

  const initialState = {
    data: [],
    search: []
    
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_DATA":
        return { ...state, data: action.payload};
      case "SET_SEARCH":
        return { ...state, search: action.payload };
      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const getData = async ()=>{
      const response = await axios.get(API);
      dispatch({ type: "SET_DATA", payload: response.data });

    }
    getData();
  },[])

  const HandleChangee = (event) => {
    const searchedword = event.target.value;  
    const NewFilter = state.data.filter((value) => {
      return value.name.toLowerCase().includes(searchedword.toLowerCase());
    })
    dispatch({ type: "SET_SEARCH", payload: NewFilter });
  }

  return (
    <>
    <input type="text" placeholder="Search..." onChange={HandleChangee} />
    
    <div>
        {
            
            state.search.map((products)=>(
                <div key={products.id}>
                    <h1>{products.name}</h1>
                </div>
            ))
        }
    </div>

    </>  )
}

export default Search