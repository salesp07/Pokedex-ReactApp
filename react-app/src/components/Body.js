import React from "react";
import './styles.css'

function Body({ pokemons, setCurrentPoke, setShowModal }) {
  const getImgUrl = (id) => {
    let newId = ("0".repeat(3 - id.length)) + id
    if (newId === '662') newId += 'r'
    if (newId === '740') newId += 'le'
    return `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${newId}.png`
  }
  
  const handleExpandPoke = (item) => {
    setCurrentPoke({...item, img: getImgUrl(String(item.id))})
    setShowModal(true)
  }

  return (
    <div className="pokeContainer">
      {pokemons.map((item, index) => (
        <div key={index} onClick={() => handleExpandPoke(item)} className="poke">
          <img alt="" src={getImgUrl(String(item.id))}/>
          <p>{item.name.english}</p>
        </div>
        
      ))}
    </div>
  );
}

export default Body;
