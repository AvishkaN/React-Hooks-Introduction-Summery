import React, { useState, useEffect, useCallback, useReducer } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import ErrorModel from './../UI/ErrorModal';


const ingrediantReducer=(currentIngredients,action)=>{
  switch (action.type){
    case 'SET' :
      return action.ingredients;
    case 'ADD' :
      return [...currentIngredients,action.ingredients];
    case 'DELETE' :
      return currentIngredients.filter(ing=>ing.id!==action.id);
      default:throw new Error('error ');
  }
};


const httpRequestReducer=(httpState,action)=>{
  switch(action.type){
    case 'SEND':
      return {IsLoading:true,IsError:null}
    case  'RESPONSE':
      return {...httpState,IsLoading:false}
    case  'ERROR':
      return {IsLoading:false,IsError:action.errorData}
    case  'CLEAR':
      return {...httpState,IsError:null}
    default :
      throw new Error('SHould not be reached');  
  }
};



const Ingredients = () => {
  const [userIngredients,dispach]=useReducer(ingrediantReducer,[])
  const [httpState,HttpDispach]=useReducer(httpRequestReducer,{IsLoading:false,IsError:false})


  useEffect(() => {
    console.log('RENDERING INGREDIENTS', userIngredients);
  }, [userIngredients]);

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    dispach({type:'SET',ingredients:filteredIngredients});
  }, []);

  const addIngredientHandler = useCallback(ingredient => {
    // setIsLoading(true);
    HttpDispach({type:'SEND'});
    fetch('https://test-f870f-default-rtdb.firebaseio.com/ingrediants.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        // setIsLoading(false);
        HttpDispach({type:'RESPONSE'});
        return response.json();
      })
      .then(responseData => {
        // setUserIngredients(prevIngredients => [
        //   ...prevIngredients,
        //   { id: responseData.name, ...ingredient }
        // ]);

        dispach({type:'ADD',ingredients: { id: responseData.name, ...ingredient }});
      }).catch((err)=>{
        // setError(err);
        HttpDispach({type:'CLEAR'});
      });
  },[]);

  const removeIngredientHandler = ingredientId => {
    HttpDispach({type:'SEND'});
    fetch(`https://test-f870f-default-rtdb.firebaseio.com/ingrediants/${ingredientId}.json`,{
      method:'DELETE'
    }).then(response=>{
      // setIsLoading(false);
      HttpDispach({type:'RESPONSE'});
      // setUserIngredients(prevIngredients =>
      //   prevIngredients.filter(ingredient => ingredient.id !== ingredientId)
      // );
      dispach({type:'DELETE',id:ingredientId});
    })
    .catch((err)=>{
      // setError(err);
      HttpDispach({type:'ERROR',errorData:'something went wrong '});
    });
  };

  const clearError=()=>{
    // setError(null);
    // setIsLoading(false);
    HttpDispach({type:'CLEAR'});
  };

  return (
    <div className="App">
        {console.log(httpState)}
      {httpState.IsError && <ErrorModel errorMassege={'Something went wrong 💣'} clearError={clearError}/>}
      <IngredientForm onAddIngredient={addIngredientHandler} isLoading={httpState.IsLoading} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section> 
    </div>
  );
};

export default Ingredients;
