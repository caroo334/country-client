import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCountryByCode } from "../redux/actions";
import '../styles/Details.css'

export default function CountryDetail() {
    const { code } = useParams();
    const dispatch = useDispatch();
    const countrydetail = useSelector(state => state.countryByCode);

    useEffect(() => {
        dispatch(getCountryByCode(code))
    }, [])

    console.log('countrydetail', countrydetail)

    return (
        <div className="detail-container">
            {countrydetail ?
                <div className="detail-card-container">
                    <h1>{countrydetail.name}</h1>
                    <img src={countrydetail.flags} alt='no Carga la imagen' className="detail-img" />
                    <span className="detail-info">Capital: {countrydetail.capital}</span>
                    <span className="detail-info">Population:{countrydetail.population}</span>
                    <span className="detail-info">Continent:{countrydetail.continets}</span>
                    <span className="detail-info">Subregion:{countrydetail.subregion}</span>
                    <span className="detail-info">Area:{countrydetail.area}</span>

                </div> : 'Wait for de good part..'
            }
        </div>
    )
}