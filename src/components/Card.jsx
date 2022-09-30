import React from 'react';
import '../styles/Card.css';


export default function Cards({ name, flags, population, capital, continents, subregion, area }) {
    return (
        <div className='card-container'>
            <h1>{name}</h1>
            <img src={flags} className='card-img' alt='Flag' />
                <span>Population: {population}</span>
                {/* {capital? <span>capital</span> : 'undefined'} */}
                {capital && <span className='card-text'>Capital: {capital}</span>}
                <span className='card-text'>Continent {continents}</span>
                <span className='card-text'>Subregion: {subregion}</span>
                <span className='card-text'>Area: {area}</span>
        </div>
    )

}