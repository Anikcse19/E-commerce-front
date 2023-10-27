import React from 'react'
import ProductBox from './ProductBox'
import Center from './Center'

const NewProducts = ({newProducts}) => {
  
  return (
    <Center>
      <h2 className='mt-6 text-3xl tracking-wider font-extrabold'>New Arrivals....</h2>
        <div id="new-products">
        
      {
        newProducts?.length>0 && newProducts.map(product=>(
          <ProductBox product={product}/>
        ))
      }
    </div>
    </Center>
  )
}

export default NewProducts