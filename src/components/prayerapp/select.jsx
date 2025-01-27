import React from 'react'
import './salah.css'
const Select = (props) => {
    const city=[{name:"القاهره",value:"Cairo"},{name:"الجيزه",value:"Giza"},{name:"السويس",value:"Suez"},{name:"الشرقيه",value:"Al Sharqia"},
        {name:"الاسكندريه",value:"Alexandria"},{name:"الاسماعيليه",value:"Ismailia"},
    {name:"بورسعيد",value:"Prot Said"},{name:"دمياط",value:"Damitta"},{name:"مطروح",value:"Matrouh"},
    {name:"شمال سيناء",value:"North Sinai"},{name:"جنوب سيناء",value:"South Sinai"},{name:"البحيره",value:"The Lake"},
    {name:"الغربيه",value:"Al Gharbiya"},{name:"القليوبيه",value:"Qalyubia"},{name:"الدقهليه",value:"Dalahlia"},
    {name:"كفر الشيخ",value:"Kafr El Shiekh"},{name:"المنوفيه",value:"El Menoufia"},{name:"البحر الاحمر",value:"Red Sea"},
    {name:"الفيوم",value:"El Fayoum"},{name:"المنيا",value:"El minya"},{name:"اسيوط",value:"Assiut"},
    {name:"سوهاج",value:"Suhag"},{name:"قنا",value:"Qena"},{name:"الأقصر",value:"Luxor"},{name:"أسوان",value:"Aswan"},
    {name:"الوادي الجديد",value:"New Valley"}]
    const arr=city.map((e)=>(<option key={e.value} value={e.value}>{e.name}</option>))
    return (
    <div className='sel'>
        <div className='tarikh'>
            <div className='milady'>
                <p>التاريخ الميلادي</p>
                <p>{props.date}</p>
            </div>
            <div className='countdown'>
            {props.count && <p>الوقت المتبقي للصلاة التالية: <br />{props.count}</p>}
            </div>
            <div className='hijry'>
                <p>التاريخ الهجري</p>
                <p>{props.hijri}</p>
            </div>
        </div>
        
        <select className='justify' onChange={(e)=>props.setCity(e.target.value)}>
            {arr}
        </select>
    </div>
  )
}

export default Select
