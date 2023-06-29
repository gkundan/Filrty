import React, { Fragment,useEffect,useState  } from 'react'
import {FaMouse} from "react-icons/fa"
import "./Home.css"
import Product from "./Product.js"
import MetaData from '../layouts/MetaData'
import TextTransition, { presets } from 'react-text-transition';
import { getProduct } from '../../actions/productAction'
import {useSelector,useDispatch} from "react-redux"


//text animation
const TEXTS = ['Tshirt', 'Sunglasses', 'Computer', 'Phones','Bags'];

const Home = () => {
  //text animation
    const [index, setIndex] = useState(0);
 useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000, // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

//  product listing *******/

  const dispatch = useDispatch();
  const {loading,error,products,productCount} = useSelector(state => state.products)
  useEffect(()=>{
    dispatch(getProduct())
  },[dispatch])



  return (
    <Fragment>
        <MetaData title="Flirty .."/>
        <div className='banner'>
            <p>Welcome To Flirty.</p>
            <h1 className='text-animate'> <span>We Deliver Amzing Product </span>
      
    </h1>
            <h1>
            <TextTransition springConfig={presets.wobbly}>{TEXTS[index % TEXTS.length]}</TextTransition>
            </h1>
            <a href='#container'>
                <button>
                    Scroll <FaMouse/>
                </button>
            </a>
        </div>
    <h2 className='homeHeading'>Feature Products</h2>
    <div className='container' id='container'>
      {products && products.map(product=> <Product product={product}/>)}
    </div>
    </Fragment>
  )
}

export default Home