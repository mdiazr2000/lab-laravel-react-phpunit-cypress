import React, {useState} from 'react';
import './login.css';
import {GetRequest, PostLoginRequest, PostRequest} from "../../core/api/api-request";
import {getLoginEndpoint, getUserAuthenticatedEndpoint} from "../../core/api/endpoints";
import {PostWithoutTokenRequest} from "../../core/api/api-request";

import { useStoreon } from 'storeon/react';

import { useNavigate } from "react-router-dom";
import ErrorView from "../../components/error/errorview";

import axios from "axios";

const LoginUser = () => {

    let navigate = useNavigate();

    const { dispatch, auth } = useStoreon('auth');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const loginApi = async () => {
        const url = getLoginEndpoint();

        const result = await PostWithoutTokenRequest(url , {
            'email' : email,
            'password' : password
        });
        result.status !== '200' && setError(result.data.error);

        if (result.status == '200' && result.data.access_token !== undefined) {
            const urlMe = getUserAuthenticatedEndpoint();

            const resultMe = await PostRequest(urlMe ,null, result.data.access_token);

            if (resultMe.status == '200') {
                dispatch('addToken',
                    {
                        token: result.data.access_token,
                        email: email,
                        id: resultMe.data.id
                    })
                navigate('/dashboard')
            }

        }


    }

    return (
        <div style={{width:'100%'}} className="form-container-login">
           <div style={{width: '300px'}}>
            {error && <ErrorView error={error}  />}
            <div className="form-container" style={{paddingTop:'30px'}}>
            <div className="form-sub-container">

                <div className="logo-form-container"></div>

                <div className="form-header">
                    <div className="form-title"><h3>Login</h3></div>
                    <p className="form-subtitle">
                        Don't have an account? Go <a className="text-link" href="/register">Register</a>
                    </p>

                    <form>

                        <div className="form-group label-input">
                            <label style={{paddingBottom: '20px'}}>Email address</label>
                            <input type="email" className="form-control" placeholder="Enter email"
                                   value={email}
                                   onChange={(event) => {
                                       setEmail(event.target.value);
                                   }} />
                        </div>

                        <div className="form-group label-input">
                            <label style={{paddingBottom: '20px'}}>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password"
                                   value={password}
                                   onChange={(event) => {
                                       setPassword(event.target.value);
                                   }}/>
                        </div>

                        <div className="form-button">
                        <button style={{width: '300px'}} onClick={loginApi}
                                type="button" className="btn btn-primary btn-block">Submit</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
          </div>
        </div>
);
}

export default LoginUser;