import React from 'react'
import '../Skeletons/CardSleleton.scss'
import { Skeleton } from 'antd';


function CardSleleton() {
  return (
    <>
     <div className='cardContiner'>
    <Skeleton active 
    avatar
    paragraph={{
      rows: 4,
    }}
  />
  </div>
   <div className='cardContiner'>
   <Skeleton active 
   avatar
   paragraph={{
     rows: 4,
   }}
 />
 </div>
  <div className='cardContiner'>
  <Skeleton active 
  avatar
  paragraph={{
    rows: 4,
  }}
/>
</div>
 <div className='cardContiner'>
 <Skeleton active 
 avatar
 paragraph={{
   rows: 4,
 }}
 
/>
</div>
<div className='cardContiner'>
 <Skeleton active 
 avatar
 paragraph={{
   rows: 4,
 }}
 
/>
</div>
</>
  )
}

export default CardSleleton