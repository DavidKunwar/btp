import React, { useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import GoogleIcon from '@mui/icons-material/Google';
import Button from '@mui/material/Button';
import Profile from '../components/profile';

function Home() {

    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);

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