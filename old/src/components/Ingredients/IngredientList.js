import React from 'react';

import './IngredientList.css';

const IngredientList = props => {
  const onRemoveItem=(id)=>{
    props.onRemoveItem(id);
  };
  return (
    <section className="ingredient-list">
      <h2>Loaded Ingredients</h2>
      <ul>
        {props.ingredientss.map(ig => (
          <li key={ig.id} onClick={()=>onRemoveItem(ig.id)}>
            <span>{ig.enteredTitle}</span>
            <span>{ig.enteredAmount}x</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default IngredientList;
