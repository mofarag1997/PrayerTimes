import { useEffect,useState } from 'react'
import './salah.css'
import Select from './select'
import Time from './Time'
import axios from 'axios'
import Azkar from './Azkar'
const Salah = () => {
  const [time,setTime]=useState([])
  const [city,setCity]=useState("Cairo")
  const [date,setDate]=useState("")
  const [hijri,setHijri]=useState("")
  const [countdown, setCountdown] = useState("")
  const azanAudio = new Audio("/assets/azan.mp3")
  useEffect(()=>{
    axios.get(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=egypt&method=8`)
    .then((response)=>{
      const newData=response.data
      setDate(newData.data.date.gregorian.date)
      setTime(newData.data.timings)
      setHijri(newData.data.date.hijri.date)
      console.log(response)
    })
    .catch(err=>console.log(err))
  },[city])
  useEffect(() => {
    if (Object.keys(time).length === 0) return
    const calculateCountdown = () => {
      const currentTime = new Date()
      const prayerTimes = [
        { name: "الفجر", time: time.Fajr },
        { name: "الشروق", time: time.Sunrise },
        { name: "الظهر", time: time.Dhuhr },
        { name: "العصر", time: time.Asr },
        { name: "المغرب", time: time.Maghrib },
        { name: "العشاء", time: time.Isha },
      ]
      // تحويل أوقات الصلاة إلى تواريخ للمقارنة
      const prayerDates = prayerTimes.map(prayer => {
        const [hours, minutes] = prayer.time.split(':').map(Number)
        const prayerDate = new Date()
        prayerDate.setHours(hours, minutes, 0, 0);
        return { name: prayer.name, date: prayerDate }
      })
      // إيجاد الصلاة التالية
      const nextPrayer = prayerDates.find(prayerDate => prayerDate.date > currentTime)
      if (nextPrayer) {
        const remainingTime = nextPrayer.date - currentTime
        const hoursLeft = Math.floor(remainingTime / 3600000);
        const minutesLeft = Math.floor((remainingTime % 3600000) / 60000)
        const secondsLeft=Math.floor((remainingTime % 60000)/1000)
        setCountdown(`${hoursLeft} : ${minutesLeft} : ${secondsLeft} `)
      }else{
        if (currentTime >= nextPrayer.date && currentTime < nextPrayer.date + 60000) { // يعني لو الوقت الحالي في حدود دقيقة من وقت الصلاة
          azanAudio.play();
        }
        const IshaTime = prayerDates.find(prayer => prayer.name === "العشاء").date
        const FajrTime = prayerDates.find(prayer => prayer.name === "الفجر").date
        if (currentTime > IshaTime) {
          FajrTime.setDate(FajrTime.getDate() + 1); // فجر اليوم التالي
          const remainingTime = FajrTime - currentTime
          const hoursLeft = Math.floor(remainingTime / 3600000)
          const minutesLeft = Math.floor((remainingTime % 3600000) / 60000)
          const secondsLeft=Math.floor((remainingTime % 60000)/1000)
          setCountdown(`${hoursLeft} : ${minutesLeft} : ${secondsLeft}`)
        } else {
          setCountdown("") // لا عرض للوقت المتبقي إذا كان قبل العشاء
        }
      }
      
    }
    // حساب الوقت المتبقي على الصلاة التالية عند تحميل البيانات
    calculateCountdown()
    // تحديث المؤقت كل ثانية
    const interval = setInterval(calculateCountdown, 1000) // تحديث كل ثانية
    return () => clearInterval(interval) // تنظيف الـ interval عند الإلغاء
  }, [time])
  const formatTimes=(waqt)=>{
    if(!waqt){
      return "00:00"
    }else{
      let[hours,minutes]=waqt.split(":").map(Number)
      const perm= hours >=12 ? "PM":"AM"
      hours=hours%12||12
      return `${hours}:${minutes<10?"0"+minutes:minutes} ${perm}`
    }
  }
  return (
    <div className='container'>
       <Select setCity={setCity} date={date} hijri={hijri} count={countdown}/>
      <div>
       <Time Name="الفجر" Tawqit={formatTimes(time.Fajr)}/>
       <Time Name="الشروق" Tawqit={formatTimes(time.Sunrise)}/>
       <Time Name="الظهر" Tawqit={formatTimes(time.Dhuhr)}/>
       <Time Name="العصر" Tawqit={formatTimes(time.Asr)}/>
       <Time Name="المغرب" Tawqit={formatTimes(time.Maghrib)}/>
       <Time Name="العشاء" Tawqit={formatTimes(time.Isha)}/>
      </div>
      <Azkar />
    </div>
  )
}
export default Salah
