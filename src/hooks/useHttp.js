import React, { useReducer } from 'react'

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





function useHttp() {
    const [userIngredients,dispach]=useReducer(ingrediantReducer,[])
    const [httpState,HttpDispach]=useReducer(httpRequestReducer,{IsLoading:false,IsError:false})

const sendRequest=(ingredient)=>{
    HttpDispach({type:'SEND'});
    fetch('https://test-f870f-default-rtdb.firebaseio.com/ingrediants.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        HttpDispach({type:'RESPONSE'});
        return response.json();
      })
      .then(responseData => {
        dispach({type:'ADD',ingredients: { id: responseData.name, ...ingredient }});
      }).catch((err)=>{
        HttpDispach({type:'CLEAR'});
      });
};
   
const deleateRequest=(ingredientId)=>{
    HttpDispach({type:'SEND'});
    fetch(`https://test-f870f-default-rtdb.firebaseio.com/ingrediants/${ingredientId}.json`,{
      method:'DELETE'
    }).then(response=>{
      HttpDispach({type:'RESPONSE'});
      dispach({type:'DELETE',id:ingredientId});
    })
    .catch((err)=>{
      HttpDispach({type:'ERROR',errorData:'something went wrong '});
    });
};



    return {
        httpState:httpState,
        userIngredients:userIngredients,
        sendRequest:sendRequest,
        deleateRequest:deleateRequest,
        dispach:dispach,
        HttpDispach:HttpDispach,
    };
}

export default useHttp
