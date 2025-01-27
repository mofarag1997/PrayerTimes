import React from 'react'
/* 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 */

const Adding = (props) => {
  return (
    <div>
      <section>
                <h2>Ingredients on hand:</h2>
                <ul className="ingredients-list" aria-live="polite">{props.ingredient}</ul>
                {props.ingredient.length>3&&<div className="get-recipe-container">
                    <div>
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div>
                    <button onClick={props.click}>Get a recipe</button>
                </div>}
            </section>
    </div>
  )
}

export default Adding
