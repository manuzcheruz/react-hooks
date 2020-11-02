import React, { useEffect, useState } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  // destructure objects
  const { onLoadIngredient } = props
  // destructure arrays
  const [enteredFilter, setEnteredFilter] = useState('')
  
  useEffect(() => {
    const query = enteredFilter.length === 0 
      ? ''
      : `?orderBy="title"&equalTo="${enteredFilter}"`;
    fetch('https://react-hooks-50598.firebaseio.com/ingredients.json' + query)
      .then(response => {
        return response.json()
      })
      .then(responseData => {
        const loadedIngredients = [];
        for (let key in responseData) {
          loadedIngredients.push({
            id: key,
            title: responseData[key].title,
            amount: responseData[key].amount
          })
        }
        onLoadIngredient(loadedIngredients)
      })
  }, [enteredFilter, onLoadIngredient])

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input 
            type="text" 
            value={enteredFilter}
            onChange={event => setEnteredFilter(event.target.value)}/>
        </div>
      </Card>
    </section>
  );
});

export default Search;
