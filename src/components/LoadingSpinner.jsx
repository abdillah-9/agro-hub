import React from 'react'
import { BiLoaderCircle } from 'react-icons/bi'
import { TbLoader3, TbLoaderQuarter } from 'react-icons/tb'
import { VscLoading } from 'react-icons/vsc'

export default function LoadingSpinner() {
  return (
    <div className='centered midGreenBody pureWhiteText flex-Column' style={{height:"100vh", width:"100vw"}}>
      <div className='loadingSpinner'>
        <TbLoader3 style={{fontSize:'100px'}}/>
      </div>
      <span className='h4 loadingHover'>Loading ... </span>
    </div>
  )
}
