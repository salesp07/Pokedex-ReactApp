import Body from "../components/Body";
import Pagination from "../components/Pagination";
import Filter from "../components/Filter";
import axios from '../api/axios'
import { useEffect, useState } from "react";
import MyModal from "../components/MyModal";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import '../components/styles.css'

function Pokemons() {
    const [defaultPokemons, setDefaultPokemons] = useState([]);
    const [types, setTypes] = useState([]);
    const [search, setSearch] = useState('')
    const [defaultTypes, setDefaultTypes] = useState([])
    const [pokemons, setPokemons] = useState([]);
    const [currentPoke, setCurrentPoke] = useState()
    const [page, setPage] = useState(1);
    const [showModal, setShowModal] = useState(false)
    const [auth, setAuth] = useState(false)

    const PAGE_SIZE = 10;

    useEffect(() => {
        const fetchData = async () => {
            console.log('fetching new data')
            const res = await axios.get('/pokemons', { withCredentials: true })
            console.log('res: ', res.data)
            setDefaultTypes(res.data.types)
            // localStorage.setItem('pokeData', JSON.stringify(response.data));
            setDefaultPokemons(res.data.pokemons)
            setPokemons(res.data.pokemons)
            setAuth(true)
        }

        // const getCachedData = () => {
        //   return JSON.parse(localStorage.getItem('pokeData'));
        // }

        // const cachedData = getCachedData()
        // cachedData? setPokemons(cachedData) : fetchData()

        axios.get('/isLoggedIn', { withCredentials: true }).then(res => {
            if (!res.data.isLoggedIn) window.location.href = '/'
            else fetchData()
        })
    }, []);

    useEffect(() => {
        let filteredPokes = defaultPokemons.filter(poke => types.every(t => poke.type.includes(t)));
        if (search.length !== 0) filteredPokes = filteredPokes.filter(poke => {
            return poke.name.english.toLowerCase().includes(search.toLowerCase()) || String(poke.id).includes(search)
        })
        setPokemons(filteredPokes)
        setPage(1)
    }, [types, defaultPokemons, search])

    const handleLogout = async () => {
        await axios.get('/logout', { withCredentials: true })
        window.location.href = '/'
    }

    const getPokes = () => {
        const start = PAGE_SIZE * (page - 1)
        const end = PAGE_SIZE * page
        return pokemons.slice(start, end)
    }

    const getPageList = () => {
        const totalPages = Math.ceil(pokemons.length / PAGE_SIZE) + 1;
        return Array.from({ length: totalPages }, (_, i) => i).filter(x => x >= page - 5 && x > 0 && x <= page + 5 && x <= totalPages)
    }

    return (
        <>
            
                {auth && <div id="container">
                    <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
                    <Filter defaultTypes={defaultTypes} setTypes={setTypes} types={types} setSearch={setSearch} />
                    {pokemons.length === 0 && <h1 className="errMsg">No pokemons match your search.</h1>}
                    <Body pokemons={getPokes()} setCurrentPoke={setCurrentPoke} setShowModal={setShowModal} />
                    <Pagination setPage={setPage} pageNum={page} pageList={getPageList()} />
                    <MyModal
                        show={showModal}
                        onHide={() => setShowModal(false)}
                        currentPoke={currentPoke ? JSON.stringify(currentPoke) : false}
                    />
                </div>}
            
        </>
    );
}

export default Pokemons;
