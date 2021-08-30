import React, { useEffect, useState } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {

  const {OnFilterLoad}=props;
  const[enteredValue,setEneteredValue]=useState('');


  useEffect(()=>{
    setTimeout(()=>{
    const query =
    enteredValue.length === 0
      ? ''
      : `?orderBy="enteredValue"&equalTo="${enteredValue}"`;

     fetch('https://test-f870f-default-rtdb.firebaseio.com/ingrediants.json' + query)
    .then(res=>res.json())
    .then(resultData=>{
      const loadedData=[];

      for(const key in resultData){
        loadedData.push({
          id:key,
          enteredTitle:resultData[key].enteredTitle,
          enteredAmount:resultData[key].enteredAmount,
        });

      }
      OnFilterLoad(loadedData);
    });

  },1000); 
  },[enteredValue]);




  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" value={enteredValue}
          onChange={(e)=>setEneteredValue(e.target.value)}/>
        </div>
      </Card>
    </section>
  );
});

export default Search;
