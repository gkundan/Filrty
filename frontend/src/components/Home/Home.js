import React, { Fragment } from 'react'
import {FaMouse} from "react-icons/fa"
import "./Home.css"
import Product from "../Product/Product.js"

const Home = () => {
  return (
    <Fragment>

        <div className='banner'>
            <p>Welcome To Flirty.</p>
            <h1>Find Amzing Product Below</h1>
            <a href='#container'>
                <button>
                    Scroll <FaMouse/>
                </button>
            </a>
        </div>
    <h2 className='homeHeading'>Feature Products</h2>
    <div className='container' id='container'>
        <Product />
    </div>
    </Fragment>
  )
}

export default Home