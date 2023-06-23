import './App.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/layouts/Header/Header.js"
import WebFont from "webfontloader";
import { useEffect } from 'react';
import Footer from './components/layouts/Footer/Footer';
import Home from "./components/Home/Home.js"

function App() {
  useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"]
      }
    })
  },[])

  return (
    <Router> 
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
