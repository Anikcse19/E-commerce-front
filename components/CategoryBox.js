import { useRouter } from 'next/router'
import React from 'react'

const CategoryBox = ({category}) => {

  const router=useRouter()

    const handleCategory=(category,id)=>{
      router.push('/singleCategoryProducts/'+id)

    }


  return (
    <div onClick={()=>handleCategory(category,category._id)} style={{boxShadow: "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px"}} className='bg-white rounded-md cursor-pointer border border-slate-950 col-span-1 text-center px-3 py-9'>
        <h1>{category.name}</h1>

    </div>
  )
}

export default CategoryBox