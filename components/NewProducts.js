import React from 'react'
import ProductBox from './ProductBox'
import Center from './Center'

const NewProducts = ({newProducts}) => {
  
  return (
    <div style={{backgroundColor:'#F2F4F8'}}>
      <Center>
      <div className=" text-center mb-6">
          <h1 className="font-extrabold text-2xl">Featured Products</h1>
          <h4>Check & Get Your Desired Product!</h4>
        </div>
        <div id="new-products">
        
      {
        newProducts?.length>0 && newProducts.map(product=>(
          <ProductBox product={product}/>
        ))
      }
    </div>
    </Center>
    </div>
  )
}

export default NewProducts