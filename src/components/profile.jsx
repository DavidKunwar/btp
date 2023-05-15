import React, { useState } from "react";
import { googleLogout } from '@react-oauth/google';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'

function Profile(props) {

    const navigate = useNavigate()

    const [showSpinner, setShowSpinner] = useState(false)
    const [showActivity, setShowActivity] = useState(false)
    const [isDisabled, setIsDisabled] = useState(true)

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        props.setProfile(null);
    };

    function handleClick(

    ) {
        setShowSpinner(true)
        setTimeout(() => {
            setShowSpinner(false)
            setShowActivity(true)
            setIsDisabled(false)
        }, 2000)
    }

    function getAnalysis(event) {
        setShowSpinner(true)
        setTimeout(() => {
            setShowSpinner(false)
            navigate('/analysis')
        }, 2000)
    }

    return (
        <>
            <div>
                <img src={props.profile.picture} alt="user profile" />
                <p>{props.profile.name}</p>

                {/* <Button variant="contained" onClick={handleClick}>Get Device Activity</Button>
                <br /> */}
                {
                    showSpinner && <div className="spinner"></div>
                }

                {
                    showActivity ? (
                        <>
                            <div className="activity">
                                1068 Minutes
                                <div>Social Media Apps</div>
                            </div>
                            <div className="activity">
                                316 Minutes
                                <div>Entertainment Apps</div>
                            </div>
                            <div className="activity">
                                0 Minutes
                                <div>Game Apps</div>
                            </div>
                            <div className="activity">
                                0 Minutes
                                <div>Food and Shopping Apps</div>
                            </div>
                            <div className="activity">
                                1397 Minutes
                                <div>Total Screen Duration</div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="activity">
                                0 Minutes
                                <div>Social Media Apps</div>
                            </div>
                            <div className="activity">
                                0 Minutes
                                <div>Entertainment Apps</div>
                            </div>
                            <div className="activity">
                                0 Minutes
                                <div>Game Apps</div>
                            </div>
                            <div className="activity">
                                0 Minutes
                                <div>Food and Shopping Apps</div>
                            </div>
                            <div className="activity">
                                0 Minutes
                                <div>Total Screen Duration</div>
                            </div>
                        </>
                    )
                }

                <Button className="btn" variant="contained" onClick={handleClick}>Get Device Activity</Button>
                <br />
                <br />
                <Button disabled={isDisabled} variant="contained" color="primary" onClick={getAnalysis}>Get ADHD Analysis</Button>
                <br />
                <br />

                <Button className="btn" variant="outlined" color="error" onClick={logOut}>Log out</Button>
                <br />
                <br />
            </div>
        </>
    )
}

export default Profile