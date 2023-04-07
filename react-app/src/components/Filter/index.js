import React from 'react'
import Form from 'react-bootstrap/Form';
import EmojiDict from '../../EmojiDict';
import './style.css';

function Filter({ defaultTypes, setTypes, types, setSearch }) {
  const handleCheckBox = (event) => {
    const checkbox = event.target;
    if (checkbox.checked) setTypes([...types, checkbox.value])
    else setTypes(types.filter(item => item !== checkbox.value))
    console.log(event.target.checked, event.target.value);
  };

  return (
    <>
      <h2>Search by name or id:</h2>
      <Form.Control type="search" placeholder="E.g. Pikachu" className="me-2"
        aria-label="Search"
        onChange={(event) => setSearch(event.target.value)} 
        style={{width: 300 + 'px'}}/>
      {/* <input type="text" onChange={(event) => setSearch(event.target.value)} placeholder="E.g. Pikachu"/> */}
      <br/>
      <h2>Filter by type:</h2>
      <div id='checkboxes'>
        {
          defaultTypes.map((item, index) => (
            <div key={index} className="checkbox">
              <input type="checkbox" value={item} onChange={handleCheckBox} className="checkboxInput" />
              <label>{item}{EmojiDict[item]}</label>
            </div>
          ))}
      </div>
    </>

  )
}

export default Filter