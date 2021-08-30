import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const { onLoadIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState('');
  const inputRef=useRef('');
  
  useEffect(() => {
   const timer=setTimeout(()=>{
      if(enteredFilter===inputRef.current.value){

        const query =
        enteredFilter.length === 0
          ? ''
          : `?orderBy="title"&equalTo="${enteredFilter}"`;
          // https://test-f870f-default-rtdb.firebaseio.com/ingrediants.json?orderBy=%22title%22&equalTo=%22apple%204%22
      fetch('https://test-f870f-default-rtdb.firebaseio.com/ingrediants.json' + query)
        .then(response => response.json())
        .then(responseData => {
          const loadedIngredients = [];
          for (const key in responseData) {
            loadedIngredients.push({
              id: key,
              title: responseData[key].title,
              amount: responseData[key].amount
            });
          }
          onLoadIngredients(loadedIngredients);
        });
      }
   

    },900);

    return ()=>{
      clearTimeout(timer);
    }

  }, [enteredFilter, onLoadIngredients]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            type="text"
            value={enteredFilter}
            ref={inputRef}
            onChange={event => setEnteredFilter(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
