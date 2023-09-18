import axios from 'axios';
import reducer from '../reducer';
import React, { useEffect , useState, useReducer} from 'react'

const API= "https://api.pujakaitem.com/api/products";

const SearchBar = () => {

    const initialState = {
        data:[],
        search:[],
    }

    const reducer = (state, action) => {
        switch (action.type) {
          case "SET_DATA":
            return { ...state, data: action.payload };
          case "SET_SEARCH":
            return { ...state, search: action.payload };
          default:
            return state;
        }
      };

    const [state, dispatch] = useReducer(reducer, initialState);

    

    

    

    const getData = async ()=>{
        const response = await axios.get(API);
        // setData(response.data);
        dispatch({ type: "SET_DATA", payload: response.data });
        // console.log(products);
    }
    

    useEffect(()=>{

        getData();
        }, [])
    
const handlesearch=(event) =>{
    const searchedword = event.target.value;
    const NewFilter = state.data.filter((value)=>{
        return value.name.toLowerCase().includes(searchedword.toLowerCase());
    })
    dispatch({ type: "SET_SEARCH", payload: NewFilter });
}
  return (
    <>
    <input type="text" placeholder="Search..." onChange={handlesearch} />
    


    <div>
        {
            
            state.search.map((products)=>(
                <div key={products.id}>
                    <h1>{products.name}</h1>
                </div>
            ))
        }
    </div>

    </>
  )
}

export default SearchBar