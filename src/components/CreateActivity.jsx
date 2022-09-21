import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postcountry } from "../redux/actions";
import '../styles/CreateActivity.css';


export default function CreateActivity() {
    const dispatch = useDispatch();

    // GUARDO EL FORMULARIO
    const [input, setInput] = useState({
        country:'',
        name: '',
        difficulty: Number,
        duration: Number,
        season: ''
    })


    return (
        <div className="create-container">
            <Link to='/home'>
                <button className="create-button">Home</button>
            </Link>
            <h1>CREATE ACTIVITY</h1>

            <form className="create-form">
            <div className="create-input-container">
                    <label htmlFor="country"> Country
                        <input
                            className="create-label"
                            id='country'
                            name='country'
                            placeholder="Country..."
                            type="text"
                            value={input.country} />
                    </label>
                </div>
                <div className="create-input-container">
                    <label htmlFor="name"> Activity
                        <input
                            className="create-label"
                            id='name'
                            name='name'
                            placeholder="Name..."
                            type="text"
                            value={input.name} />
                    </label>
                </div>
                <div className="create-input-container">
                    <label htmlFor="difficulty"> Diffuculty
                        <input
                            className="create-label"
                            id='difficulty'
                            name='difficulty'
                            type='number'
                            placeholder="difficulty..."
                            value={input.difficulty}
                        />
                    </label>
                </div>
                <div className="create-input-container">
                    <label htmlFor="duration"> Duration
                        <input
                            className="create-label"
                            id='duration'
                            name='duration'
                            placeholder="duration..."
                            type="number"
                            value={input.duration} />
                    </label>
                </div>
                <div className="create-input-container">
                    <label htmlFor="season"> Season
                        <input
                            className="create-label"
                            id='season'
                            name='season'
                            placeholder="season..."
                            type="text"
                            value={input.season} />
                    </label>
                </div>
                <button type="submit" className="create-button button-activity">Create Activity</button>
            </form>
        </div>
    )


}