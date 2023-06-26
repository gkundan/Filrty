import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from "react-rating-stars-component"

const options = {
  edit:false,
  color:'rgba(20,20,20,0.9',
  activeColor:"tomato",
  size:window.innerWidth < 600 ? 20 : 25,
  value:2.5
}
const Product = ({product}) => {
  return (
   <Link className='product-card' to={product._id}>
    <img src={product.images} alt={product.name} />
    <p>{product.name}</p>
    <div>
      <ReactStars {...options}  /> <span>(231 reviews)</span>
    </div>
    <span>Price{product.price}</span>
   </Link>
  )
}

export default Product