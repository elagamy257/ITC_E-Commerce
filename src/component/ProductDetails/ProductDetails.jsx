import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useContext } from 'react';
import { cartContext } from '../../context/cartContext';
import toast from 'react-hot-toast';



export default function ProductDetails() {

  let { addProductToCart } = useContext(cartContext); // this function return promise, then must await some time, so we create another function works as bridge  
  async function addProductItem(id) {
    let response = await addProductToCart(id)
    console.log('response', response);
    if (response.data.status == 'success') {
      toast.success(response.data.message)
    }
    else {
      toast.error(response.data.message)
    }
  }


  let { id } = useParams(); //return object {id:'hkjh8789'}

  // المفروض ابعت ال id to API to obtain the product details
  const [details, setDetails] = useState(null)

  function getProductDetails() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)

      .then(({ data }) => {
        console.log(data.data);
        setDetails(data.data);
      })

      .catch(() => { })

  }

  useEffect(() => {
    getProductDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (

    <div className='d-flex p-2'>
      <div className='w-25'>
        <img src={details?.imageCover} alt={details?.title} className='w-100' />
      </div>

      <div className='w-50 justify-content-center align-content-center'>
        <h1>{details?.title}</h1>
        <p>{details?.description}</p>
        <p>{details?.category.name}</p>

        <div className="d-flex justify-content-between my-2">
          <span>{details?.price} EGP</span>
          <span>{details?.ratingsQuantity}<i className="fas fa-star text-warning"></i></span>
        </div>
        <button onClick={() => { addProductItem(details?.id) }} className='btn bg-info text-white p-2 m-2 w-100'>Add To Cart</button>
      </div>

    </div>
  )
}



