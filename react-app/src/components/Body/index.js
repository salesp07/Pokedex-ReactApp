import React, {useEffect} from "react";
import "./style.css";
import { FaRegStar, FaStar } from "react-icons/fa";
import axios from "../../api/axios";

function Body({ pokemons, setCurrentPoke, setShowModal, favorites, setFavorites }) {

  useEffect(() => {
    const fetchFavorites = async () => {
      const res = await axios.get('/favorites', { withCredentials: true })
      console.log('fetched favorites: ', res.data)
      const favs = res.data === undefined ? [] : res.data
      setFavorites(favs)
    }
    fetchFavorites()
  }, [setFavorites])

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

  const toggleFavorite = async (e, id) => {
    e.stopPropagation();
    console.log(id)
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(item => item !== id))
      await axios.patch('removeFavorite/' + id, {}, { withCredentials: true })
    } else {
      console.log('adding favorite')
      setFavorites([...favorites, id])
      await axios.patch('addFavorite/' + id, {}, { withCredentials: true })
    }
  }
  
  return (
    <div className="pokeContainer">
      {pokemons.map((item, index) => (
        <div key={index} onClick={() => handleExpandPoke(item)} className="poke">
          <img className="pokeCardImg" alt="" src={getImgUrl(String(item.id))}/>
          <div id="cardStats">
            {favorites.includes(item.id)  ?
              <FaStar size={17} onClick={(e) => toggleFavorite(e, item.id)} className="star"/> 
              : 
              <FaRegStar size={17} onClick={(e) => toggleFavorite(e, item.id)} className="star"/>
            }
            <p>#{item.id} {item.name.english}</p>
          </div>
        </div>
        
      ))}
    </div>
  );
}

export default Body;
