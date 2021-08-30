import React, { useCallback, useEffect, useState } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

function Ingredients() {

  const [Useringredients,setUserIngredients]=useState([{id: 0.3574687199239659, enteredTitle:'test',enteredAmount: 200}]);
  
  const addIngredientHandler=(ingredient)=>{
    
    // 
    fetch('https://test-f870f-default-rtdb.firebaseio.com/ingrediants.json',{
      method:'POST',
      body:JSON.stringify(ingredient),
      headers:{'Content-Type':'application/json'},
    })
    .then(res=>res.json())
    .then(res=>{
      const id=res.name;
      const ing={id,...ingredient}
      setUserIngredients(prevState=>[...prevState,ing]);
    });
    

  };
  
  const onRemoveItem=(id)=>{
    setUserIngredients((prevState)=>{
      const updateArr=prevState.filter(item=>item.id!==id);
      return updateArr;
    });
  };
  
  useEffect(()=>{
    fetch('https://test-f870f-default-rtdb.firebaseio.com/ingrediants.json')
    .then(res=>res.json())
    .then(resultData=>{
      const loadedData=[];
      // const resultData0=[resultData];

      for(const key in resultData){
        loadedData.push({
          id:key,
          enteredTitle:resultData[key].enteredTitle,
          enteredAmount:resultData[key].enteredAmount,
        });

      }
      setUserIngredients((prevState)=>loadedData);
    });
  },[]);

  const OnFilterLoad=useCallback((filterdArr)=>{
   
     return setUserIngredients((prevState)=>filterdArr);
   
  },[]) 


  return (
    <div className="App">
      <IngredientForm addIngredientHandler={addIngredientHandler}/>
      <section>
        <Search OnFilterLoad={OnFilterLoad}/>
        <IngredientList  ingredientss={Useringredients} onRemoveItem={onRemoveItem}/>
      </section>
    </div>
  );
}

export default Ingredients;
