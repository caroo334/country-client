import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCountries, orderByName, orderByPopulation, getCountriesFilteredByActivities, getCountriesFilteredByContinent } from '../redux/actions';
//components
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from './SearchBar';
import '../styles/Home.css';

export default function Home() {
    const dispatch = useDispatch();
    const allCountries = useSelector((state) => state.countries);
    const continents = useSelector(state => state.continents);

    //PAGINADO
    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage, setCountriesPerPage] = useState(9);
    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstcountry = indexOfLastCountry - countriesPerPage;
    const currentcountry = allCountries.slice(indexOfFirstcountry, indexOfLastCountry);

    const [orden, setOrden] = useState('');

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    
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

    function handleOrderByPopulation(e) {
        e.preventDefault();
        dispatch(orderByPopulation(e.target.value));
        setCurrentPage(1);
        setOrden(e.target.value);
    }

    const handleChangeActivitySelect = (e) => {
        e.preventDefault();

        dispatch(getCountriesFilteredByActivities(e.target.value))
    }

    const handleCHangeContinentSelect = (e) => {
        e.preventDefault();
        dispatch(getCountriesFilteredByContinent(e.target.value));
    }

    const handleChangeReload = (e) => {
        e.preventDefault();
        console.log('se apreto el boton', e, 'getCountries', getCountries())
        dispatch(getCountries());
    }

    


    return (

        <div className='home-container'>
            <nav>
                <Link to='/create-activity'>
                    <button className='home-create-button'>add activity</button>
                </Link>
                <button onClick={(e) => handleChangeReload(e)} className='home-create-button'>Reload</button>
            </nav>
            <h1 className='home-title'> COUNTRIES </h1>
            <SearchBar />
            <div className='home-filter-container'>
                <select onChange={(e) => handleOrderByName(e)} className='home-filter'>
                    <option value='asc'>A - Z</option>
                    <option value='desc'>Z - A</option>
                </select>

                <select className='home-filter' onChange={handleCHangeContinentSelect}>
                    <option value='all'>Continents</option>
                    {continents && continents.map((c, index) => {
                        return (
                            <option key={`${index}_${c}`}>
                                {c}
                            </option>
                        )
                    })}
                </select>

                <select className='home-filter' onChange={e => handleOrderByPopulation(e)}>
                    <option>Population</option>
                    <option value='low'>Low</option>
                    <option value='high'>High</option>
                </select>

                <select className='home-filter' onChange={handleChangeActivitySelect}>
                    <option value='all'>All</option>
                    <option value='with-activity'>With Activity</option>
                    <option value='without-activity'>Without Activity</option>
                </select>
            </div>

            <Paginado
                countriesPerPage={countriesPerPage}
                allCountries={allCountries.length}
                paginado={paginado}
            />
            <div className='home-card-container'>

                {
                    currentcountry.length > 0 ? currentcountry.map((a, index) => {
                        return (
                            <Link key={`${index}-${a}`} to={'/detail/' + a.code} style={{ textDecoration: 'none', color: 'white' }}>
                                <div className='card-container-home'>
                                    <Card key={a.id} {...a} />
                                </div>
                            </Link>
                        )
                    }) : <div className="container-loader"> LOADING... </div>

                }

                {/* {allCountries?.map((c, index) => <Card key={`${c.id}_${index}`} {...c} />)} */}

            </div>


        </div>

    )

}