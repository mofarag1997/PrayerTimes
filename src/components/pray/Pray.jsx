import React, { useEffect, useState } from 'react'
import Prayer from './prayer'
import "./index.css"

const Pray = () => {
  const [Date,setDate]=useState("")
  const cities =[{name:"القاهره",value:"Cairo"},{name:"الجيزه",value:"Giza"},{name:"الشرقيه",value:"Al Sharqiya"},
    {name:"السويس",value:"Suez"},{name:"الاسكندريه",value:"Alexandria"},
  ]
  const [PrayerTimes,setPrayerTimes]=useState([])
  const [city,setCity]=useState("Cairo")
  console.log(city);
  useEffect(()=>{
    const fetchPrayerTimes = async()=>{
      try{
        const response =await fetch(`https://api.aladhan.com/v1/timingsByCity/28-12-2024?city=Eg&country=${city}`)
        const dataPrayer=await response.json()
        setPrayerTimes(dataPrayer.data.timings)
        setDate(dataPrayer.data.date.gregorian.date)
        console.log(dataPrayer.data)
      }catch(error){
        console.error(error)
      }
    }
    fetchPrayerTimes()
  },[city])
  const formatTimes=(time)=>{
    if(!time){
      return "00:00"
    }else{
      let[hours,minutes]=time.split(":").map(Number)
      const perm= hours >=12 ? "PM":"AM"
      hours=hours%12||12
      return `${hours}:${minutes<10?"0"+minutes:minutes} ${perm}`
    }
  }
  return (
    <section>
        <div>
      <div className="container">
        <div className="top-section">
            <div className="city">
                <h3>اسم المدينه</h3>
                <select name="" id="" onChange={(e)=>setCity(e.target.value)}>
                    {
                      cities.map((t)=>{
                        return(<option key={t.value} value={t.value}>{t.name}</option>)
                      })
                    }
                </select>
            </div>
            <div className="date">
                <h3>التاريخ</h3>
                <h4>{Date}</h4>
            </div>
            
        </div>
          <div>
            
            <Prayer  Name="الفجر" Time={formatTimes(PrayerTimes.Fajr)}/>
            <Prayer  Name="الظهر" Time={formatTimes(PrayerTimes.Dhuhr)}/>
            <Prayer  Name="العصر" Time={formatTimes(PrayerTimes.Asr)}/>
            <Prayer  Name="المغرب" Time={formatTimes(PrayerTimes.Maghrib)}/>
            <Prayer  Name="العشاء" Time={formatTimes(PrayerTimes.Isha)}/>
          </div>
          
      </div>
    </div>
    </section>
    
  )
}

export default Pray
