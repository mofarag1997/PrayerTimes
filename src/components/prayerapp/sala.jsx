// ...existing code...
import { useEffect,useState } from 'react'
import './salah.css'
import Select from './select'
import Time from './Time'
import axios from 'axios'
import Azkar from './Azkar'
const Salah = () => {
  const [time,setTime]=useState({})
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
    if (!time || Object.keys(time).length === 0) return

    const parseTime = (t) => {
      if (!t) return null
      const timePart = String(t).split(' ')[0]
      const parts = timePart.split(':').map(Number)
      if (parts.length < 2 || Number.isNaN(parts[0]) || Number.isNaN(parts[1])) return null
      return { hours: parts[0], minutes: parts[1] }
    }

    const calculateCountdown = () => {
      const now = new Date()
      const prayerTimes = [
        { name: "الفجر", time: time.Fajr },
        { name: "الشروق", time: time.Sunrise },
        { name: "الظهر", time: time.Dhuhr },
        { name: "العصر", time: time.Asr },
        { name: "المغرب", time: time.Maghrib },
        { name: "العشاء", time: time.Isha },
      ].map(p => ({ name: p.name, parsed: parseTime(p.time) }))
       .filter(p => p.parsed !== null)

      const prayerDates = prayerTimes.map(p => {
        const d = new Date()
        d.setHours(p.parsed.hours, p.parsed.minutes, 0, 0)
        return { name: p.name, date: d }
      })

      const nextPrayer = prayerDates.find(p => p.date > now)

      const pad = (n) => String(n).padStart(2, '0')

      if (nextPrayer) {
        const remaining = nextPrayer.date - now
        if (remaining <= 60000 && remaining >= 0) {
          azanAudio.play().catch(()=>{})
        }
        const h = Math.floor(remaining / 3600000)
        const m = Math.floor((remaining % 3600000) / 60000)
        const s = Math.floor((remaining % 60000) / 1000)
        setCountdown(`${pad(h)} : ${pad(m)} : ${pad(s)}`)
      } else {
        const isha = prayerDates.find(p => p.name === "العشاء")
        const fajr = prayerDates.find(p => p.name === "الفجر")
        if (fajr) {
          const fajrNext = new Date(fajr.date)
          if (isha && now > isha.date) {
            fajrNext.setDate(fajrNext.getDate() + 1)
          }
          const remaining = fajrNext - now
          const h = Math.floor(remaining / 3600000)
          const m = Math.floor((remaining % 3600000) / 60000)
          const s = Math.floor((remaining % 60000) / 1000)
          setCountdown(`${pad(h)} : ${pad(m)} : ${pad(s)}`)
        } else {
          setCountdown('')
        }
      }
    }

    calculateCountdown()
    const interval = setInterval(calculateCountdown, 1000)
    return () => clearInterval(interval)
  }, [time])

  const formatTimes=(waqt)=>{
    if(!waqt){
      return "00:00"
    }else{
      const clean = String(waqt).split(' ')[0]
      const parts = clean.split(":").map(Number)
      if (parts.length < 2 || Number.isNaN(parts[0]) || Number.isNaN(parts[1])) return "00:00"
      let [hours,minutes]=parts
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
