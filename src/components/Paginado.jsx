import React from "react";
import '../styles/Paginado.css';

export default function Paginado({ countriesPerPage, allCountries, paginado }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allCountries / countriesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="paginado-container">
                {
                    pageNumbers &&
                    pageNumbers.map(number => (
                        <li className="list-number" key={number}>
                            <a className="a-number" onClick={() => paginado(number)}>{number}</a>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}