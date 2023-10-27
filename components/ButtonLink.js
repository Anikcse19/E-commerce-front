import Link from 'next/link'
import React from 'react'

const ButtonLink = (rest) => {
    console.log(rest)
  return (
    <Link {...rest} className={`bg-blue-400 flex items-center justify-center gap-1 text-white px-10 text-center py-2 rounded-sm cursor-pointer ${rest.primary? 'text-white':'text-blue'} ${rest.outline?'border border-blue-900 bg-transparent':''}`}/>
  )
}

export default ButtonLink