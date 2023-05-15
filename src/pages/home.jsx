import React, { useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import GoogleIcon from '@mui/icons-material/Google';
import Button from '@mui/material/Button';
import Profile from '../components/profile';

function Home() {

    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState();

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        console.log(res.data)
                        setProfile(res.data);
                    })
                    .catch((err) => console.log(err));
            }
        },
        [user]
    );

    return (
        <>
            <div>
                {profile ? (
                    <Profile profile={profile} setProfile={setProfile} />
                ) : (
                    <>
                        <div>
                            Activity Tracker
                        </div>
                        <p>
                            Welcome to our application, where we offer a unique service that tracks your screen time and provides an analysis of whether you may be at risk of developing Attention Deficit Hyperactivity Disorder (ADHD).
                        </p>
                        <p>
                            We understand that in today's digital age, screens have become an integral part of our daily lives. While they provide us with convenience and entertainment, excessive screen time can lead to several negative effects, including a decrease in attention span and focus. These effects can be particularly problematic for individuals who are at risk of developing ADHD.
                        </p>
                        <p>
                            Our website aims to provide you with a comprehensive analysis of your screen time habits and how they may be impacting your overall well-being. By tracking your usage patterns across different devices, we can provide insights into the amount of time you spend on specific apps or websites and how this may be affecting your concentration levels.
                        </p>
                        <p>
                            Through our analysis, we provide personalized recommendations on how to reduce screen time and improve attention span. Our service also includes resources for individuals who may already be struggling with ADHD, such as support groups and professional counseling services.
                        </p>
                        <p>
                            At our website, we prioritize the privacy and security of our users, ensuring that all data is kept confidential and secure. We understand that this is a sensitive issue, and we aim to provide a safe and supportive space for our users.
                        </p>
                        <p>
                            Thank you for considering our service. We hope that our analysis will provide you with valuable insights into your screen time habits and how you can improve your overall well-being.
                        </p>
                        <Button variant="contained" onClick={() => login()} startIcon={<GoogleIcon />}>
                            Sign in with Google 🚀
                        </Button>
                    </>
                )}
            </div>
        </>
    )
}

export default Home