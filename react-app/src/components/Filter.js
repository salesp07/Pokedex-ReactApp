import React from 'react'
import './styles.css'

function Filter({ defaultTypes, setTypes, types, setSearch }) {
    const handleCheckBox = (event) => {
        const checkbox = event.target;
        if (checkbox.checked) setTypes([...types, checkbox.value])
        else setTypes(types.filter( item => item !== checkbox.value))
        console.log(event.target.checked, event.target.value);
    };

  return (
    <>
      <h2>Search by name or id:</h2>
      <input type="text" onChange={(event) => setSearch(event.target.value)} placeholder="E.g. Pikachu"/>
      <br></br><br></br><h3>OR</h3>
      <h2>Filter by type:</h2>
      <div id='checkboxes'>
        { 
        defaultTypes.map((item, index) => (
            <div key={index} className="checkbox">
             <input type="checkbox" value={item} onChange={handleCheckBox} className="checkboxInput"/>
             <label>{item}</label>
            </div>
        ))}
      </div>
    </>
    
  )
}

export default Filter