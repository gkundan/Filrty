import React from 'react'

import { RotatingTriangles } from  'react-loader-spinner'
function Loader() {
  return (
    <>   

<RotatingTriangles
  visible={true}
  height="80"
  width="80"
  ariaLabel="rotating-triangels-loading"
  wrapperStyle={{}}
  wrapperClass="rotating-triangels-wrapper"
/>


    </>
  )
}

export default Loader