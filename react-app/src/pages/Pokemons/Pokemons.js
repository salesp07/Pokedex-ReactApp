import Body from "../../components/Body";
import Pagination from "../../components/Pagination";
import Filter from "../../components/Filter";
import axios from '../../api/axios'
import { useEffect, useState } from "react";
import MyModal from "../../components/MyModal";
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNav from "../../components/MyNav";
import MyFooter from "../../components/MyFooter";
import './style.css';
import Player from "../../components/Player";
import Button from "react-bootstrap/esm/Button";
import { FaPlay, FaStop } from "react-icons/fa";

function Pokemons() {
    const [defaultPokemons, setDefaultPokemons] = useState([]);
    const [types, setTypes] = useState([]);
    const [search, setSearch] = useState('')
    const [defaultTypes, setDefaultTypes] = useState([])
    const [pokemons, setPokemons] = useState([]);
    const [currentPoke, setCurrentPoke] = useState()
    const [page, setPage] = useState(1);
    const [showModal, setShowModal] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [showGifs, setShowGifs] = useState(false)
    const [favoritesOnly, setFavoritesOnly] = useState(false)
    const [favorites, setFavorites] = useState([])

    const PAGE_SIZE = 12;

    useEffect(() => {
        const fetchData = async () => {
            console.log('fetching new data')
            const res = await axios.get('/pokemons', { withCredentials: true })
            console.log('res: ', res.data)
            setDefaultTypes(res.data.types)
            // localStorage.setItem('pokeData', JSON.stringify(response.data));
            setDefaultPokemons(res.data.pokemons)
            setPokemons(res.data.pokemons)
            console.log('data fetched', res.data.pokemons)
            setIsLoggedIn(true)
        }

        // const getCachedData = () => {
        //   return JSON.parse(localStorage.getItem('pokeData'));
        // }

        // const cachedData = getCachedData()
        // cachedData? setPokemons(cachedData) : fetchData()

        axios.get('/getSessionInfo', { withCredentials: true }).then(res => {
            if (!res.data.isLoggedIn) window.location.href = '/'
            else fetchData()
            if (res.data.isAdmin) setIsAdmin(true)
        })
    }, []);

    useEffect(() => {
        let filteredPokes = defaultPokemons.filter(poke => types.every(t => poke.type.includes(t)));
        if (search.length !== 0) filteredPokes = filteredPokes.filter(poke => {
            return poke.name.english.toLowerCase().includes(search.toLowerCase()) || String(poke.id).includes(search)
        })
        if (favoritesOnly){
            filteredPokes = filteredPokes.filter(poke => favorites.includes(poke.id))
        }
        setPokemons(filteredPokes)
        setPage(1)
    }, [types, defaultPokemons, search, favoritesOnly, favorites])


    const getPokes = () => {
        const start = PAGE_SIZE * (page - 1)
        const end = PAGE_SIZE * page
        return pokemons.slice(start, end)
    }

    const getPageList = () => {
        const totalPages = Math.ceil(pokemons.length / PAGE_SIZE) + 1;
        return Array.from({ length: totalPages }, (_, i) => i).filter(x => x >= page - 3 && x > 0 && x <= page + 3 && x <= totalPages)
    }

    const toggleShowGifs = () => {
        setShowGifs(!showGifs)
    }

    return (
        <>
            <MyNav isAdmin={isAdmin} showGifs={showGifs} />
            {isLoggedIn &&
                <div id="container">
                    <Player />
                    {showGifs ?
                        <Button variant="outline-danger" onClick={toggleShowGifs} className="danceBtn">Stop Dancing <FaStop size={13} /></Button> :
                        <Button variant="outline-success" onClick={toggleShowGifs} className="danceBtn">Everybody Dance! <FaPlay size={13} /></Button>
                    }
                    <Filter defaultTypes={defaultTypes} setTypes={setTypes} types={types} setSearch={setSearch} />
                    <Button variant="outline-primary" onClick={()=>setFavoritesOnly(!favoritesOnly)} id="favoritesBtn">{favoritesOnly ? 'Show All' : 'Show Favorites'}</Button>
                    {pokemons && pokemons.length === 0 && <h1 className="errMsg">No pokemons match your search.</h1>}
                    <Body pokemons={getPokes()} setCurrentPoke={setCurrentPoke} setShowModal={setShowModal} favorites={favorites} setFavorites={setFavorites}/>
                    <Pagination setPage={setPage} pageNum={page} pageList={getPageList()} />

                    <MyModal
                        show={showModal}
                        onHide={() => setShowModal(false)}
                        currentPoke={currentPoke ? JSON.stringify(currentPoke) : false}
                    />
                </div>
            }
            <MyFooter />

        </>
    );
}

export default Pokemons;
