import React, { useState } from 'react'
import './css.css'
import Section from './component/section'
import Adding from './component/Adding'

const Main = () => {
  const [addIngredient,setAddIngredients]=useState([])
  const [recipeShown,setRecipeShown]=useState("")
  function toggleShow(){
    setRecipeShown(!recipeShown)
  }
  const [wasf,setWasf]=useState("")
  function meal(){
    setWasf(wasfa)
  }
  //const ingredients = []
  const adding= addIngredient.map(e=><li key={e.id}>{e}</li>)
  let url = 'http://www.themealdb.com/api/json/v1/1/list.php?c=list'
  async function wasfa() {
    try {
      let wasafat = await fetch(url)
      let moFarag = await wasafat.json();
      console.log(moFarag)
    } catch (error) {
      console.log(error)
    }
  }
  function onSubmit(formData){
    const newIngredient=formData.get("ingredient")
    //newIngredient.push(newIngredients)
    setAddIngredients(r=>[...r,newIngredient])
    console.log("it works perfectly")
  }
  return (
    <main>
      <form className='input-rec' action={onSubmit}>
        <input type="text" placeholder='e.g tomato' name='ingredient'/>
        <button >+ add ingredient</button>
      </form>
      <form action="">
      <ul>
        
      </ul>
      </form>
      {adding.length>0&&<Adding ingredient={adding} click={toggleShow}/>}
      {recipeShown&&<Section />}
    </main>
    )
}

export default Main
