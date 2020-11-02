import React, { useCallback, useState } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

function Ingredients() {
  const [userIngredient, setUserIngredient] = useState([])

  const onAddIngredientHandler = ingredient => {
    fetch('https://react-hooks-50598.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    }).then( response => {
      return response.json()
    }).then(responseData => {
      setUserIngredient( prevIngredient => [
        ...prevIngredient, 
        {id: responseData.name, ...ingredient}
        ])
    })
  }

  const onRemoveIngredientHandler = id => {
    const remove = userIngredient.filter(item => item.id !== id)
    setUserIngredient(remove)
  }

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    setUserIngredient(filteredIngredients)
  }, [])

  return (
    <div className="App">
      <IngredientForm onAddIngredient={onAddIngredientHandler}/>

      <section>
        <Search onLoadIngredient={filteredIngredientsHandler}/>
        {/* Need to add list here! */}
      </section>

      <IngredientList ingredients={userIngredient} onRemoveItem={onRemoveIngredientHandler}/>
    </div>
  );
}

export default Ingredients;
