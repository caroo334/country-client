import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getCountryByCode } from "../redux/actions";
import '../styles/Details.css'

export default function CountryDetail() {
    const { code } = useParams();
    const dispatch = useDispatch();
    const countrydetail = useSelector(state => state.countryByCode);
    const activities = useSelector(state => state.activities)

    useEffect(() => {
        dispatch(getCountryByCode(code))
    }, [dispatch])

   

    return (
        <div className="detail-container">
            <Link to='/home'>
                <button className="detail-button">Home</button>
            </Link>

            <div className="detail-card-activities">

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

                <div>
                    {
                        activities.length > 0 && <div className="activities-container">
                            {
                                activities.map((activity, index) => <div key={`${activity.name}_${index}`} className="detail-card-container">
                                    <span>Name:{activity.name}</span>
                                    <span>Season:{activity.season}</span>
                                    <span>Difficulty:{activity.difficulty}</span>
                                    <span>Duration:{activity.duration}</span>
                                </div>)
                            }
                        </div>
                    }
                </div>

            </div>
        </div >
    )
}