import React from "react";
import { Link } from "react-router-dom";

import '../styles/LandingPage.css';
// import { getCountriesToDb } from '../redux/actions';



export default function LandingPage() {
    // const dispatch = useDispatch();

 /*    useEffect(() => {
        dispatch(getCountriesToDb());
    }, [dispatch]);
 */

    return (
        <div className="landing-container">
            <h1 >WELCOME</h1>
            <Link to='/home'>
                <button className="landing-button">Press To Enjoy</button>
            </Link>
        </div>
    )
}