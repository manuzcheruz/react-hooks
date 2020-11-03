import React, { useCallback, useState } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal';

function Ingredients() {
  const [userIngredient, setUserIngredient] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const onAddIngredientHandler = ingredient => {
    setIsLoading(true)
    fetch('https://react-hooks-50598.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    }).then( response => {
      setIsLoading(false)
      return response.json()
    }).then(responseData => {
      setUserIngredient( prevIngredient => [
        ...prevIngredient, 
        {id: responseData.name, ...ingredient}
        ])
    }).catch(error => {
      setError('something went wrong')
      setIsLoading(false)
    })
  }

  const onRemoveIngredientHandler = id => {
    setIsLoading(true)
    fetch(`https://react-hooks-50598.firebaseio.com/ingredients/${id}.json`, {
      method: 'DELETE'
    }).then( response => {
      setIsLoading(false)
      return response.json()
    }).then(responseData => {
      const remove = userIngredient.filter(item => item.id !== id)
      setUserIngredient(remove)
    }).catch(error => {
      setError('something went wrong')
      setIsLoading(false)
    })
  }

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    setUserIngredient(filteredIngredients)
  }, [])

  const onCloseModalHandler = () => {
    setError(null)
  }

  return (
    <div className="App">
      {error && <ErrorModal onClose={onCloseModalHandler}>{error}</ErrorModal>}
      <IngredientForm onAddIngredient={onAddIngredientHandler} loading={isLoading}/>

      <section>
        <Search onLoadIngredient={filteredIngredientsHandler}/>
        {/* Need to add list here! */}
      </section>

      <IngredientList ingredients={userIngredient} onRemoveItem={onRemoveIngredientHandler}/>
    </div>
  );
}

export default Ingredients;
