import React, { useEffect, useState } from 'react'
import { assistance } from './assets/Alazkar'
import './salah.css'
const Azkar = () => {
  const[index,setIndex]=useState(0)
  const zikr =assistance.azkar[index].content
  useEffect(()=>{
  const time = setInterval(()=>{
    console.log(index)

    if(index>=assistance.azkar.length-1){
      setIndex(0)
    }else{
      setIndex((p)=>p+1)
    }
    //setIndex((p)=>(p+1)%assistance.azkar.length)
  },60000)
  return ()=>{
    clearInterval(time)
  }
  },[index])
  return (
    <div>
      <p className='alazkar'>{zikr}</p>
    </div>
  )
}

export default Azkar
