import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCountries, orderByName} from '../redux/actions';
//components
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from './SearchBar';
import '../styles/Home.css';

export default function Home() {
    const dispatch = useDispatch();
    const allCountries = useSelector((state) => state.countries);

    //PAGINADO
    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage, setCountriesPerPage] = useState(9);
    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstcountry = indexOfLastCountry - countriesPerPage;
    const currentcountry = allCountries.slice(indexOfFirstcountry, indexOfLastCountry);

    const continents = allCountries.map(country => country.continents)
    const continentsFiltered = [...new Set(continents)];

    const [orden, setOrden] = useState('');

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    // const filteredCountries = () => {
    //     return allCountries.slice(currentPage, currentPage + 20);
    // }
    // const nextPage = () => {
    //     setCurrentPage(currentPage + 20);
    // } 
    // <button onClick={nextPage}>Next</button>





    // accedo a la info cargada en la base de datos (actions)
    useEffect(() => {
        dispatch(getCountries());
    }, [dispatch]);


    function handleOrderByName(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1); // seteo la pg principal
        setOrden(`Ordenado ${e.target.value}`) // mofifica el estado local y se renderiza
    }


    return (

        <div className='home-container'>
            <nav>
                <Link to='/create-activity'>
                    <button className='home-create-button'>add activity</button>
                </Link>
            </nav>
            <h1 className='home-title'> COUNTRIES </h1>
            <SearchBar />
            <div className='home-filter-container'>
                <select onChange={(e) => handleOrderByName(e)} className='home-filter'>
                    <option value='asc'>A - Z</option>
                    <option value='desc'>Z - A</option>
                </select>
                <select className='home-filter'>
                    {continentsFiltered.map(c => {
                        return (
                            <option>
                                {c}
                            </option>
                        )
                    })}
                </select>
                <select className='home-filter'>
                    <option>Poblacion</option>
                    <option value='masdemil'>+1 000</option>
                    <option value='masdemillon'>+1 000 000</option>
                    <option>+10 000 000</option>
                    <option>+30 000 000</option>
                    <option>+50 000 000</option>
                </select>
                <select className='home-filter'>
                    <option>Tipo de actividad turistica</option>
                </select>
            </div>
            <Paginado
                countriesPerPage={countriesPerPage}
                allCountries={allCountries.length}
                paginado={paginado}
            />
            <div className='home-card-container'>

                {
                    currentcountry.length > 0 ? currentcountry.map(a => {
                        return (
                            <Link to={'/detail/' + a.code} style={{ textDecoration: 'none', color: 'white' }}>
                                <div >
                                    <Card key={a.id} {...a} />
                                </div>
                            </Link>
                        )
                    }) : <div className="container-loader"> LOADING... </div>

                }

                {/* {allCountries?.map((c, index) => <Card key={`${c.id}_${index}`} {...c} />)} */}

            </div>


        </div>












        // {allCountries?.map((c, index) => <Card key={`${c.id}_${index}`} {...c} />)}

        // const dispatch = useDispatch();

        // const darkModeValue = useSelector((state) => state.darkMode);

        // const handleClick = () => {
        //   dispatch(setDarkmode())
        // }

        // return (
        //   <div>
        //     <button onClick={handleClick}>Invertir Dark Mode</button>
        //     {darkModeValue ? <span>Mostrar el Dark Mode</span> : <span>Mostrar el Light Mode</span>}
        //   </div>
        // )
    )

}