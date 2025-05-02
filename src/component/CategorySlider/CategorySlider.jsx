import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';

export default function CategorySlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1
  };


  let [category , setCategory] = useState([])
  function getCategorys(){
    axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    .then( ( {data})=>{ 
      setCategory(data.data)   //response >>> data obj >>> data 10 category
      console.log('category' , category)
    } )
    .catch( ()=>{} )
  }


  useEffect( ()=>{
    getCategorys();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  } , [])


  return (
    <div>
      <h1 className='py-4'>Shop Popular Category</h1>
      <Slider {...settings}>
        
      {
          category.map( (img)=>{
            return <img src= {img.image} alt= {img.name} className='category-img'/>
          } )
        }
  
      </Slider> 
    </div>
  )
}

