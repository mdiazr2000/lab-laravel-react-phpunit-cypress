import React, {useState} from 'react';
import './register.css';
import { useNavigate } from "react-router-dom";
import {getRegisterEndpoint} from "../../core/api/endpoints";
import {PostWithoutTokenRequest} from "../../core/api/api-request";
import ErrorView from "../../components/error/errorview";


const Register = () => {
    let navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmed, setConfirmed] = useState('');
    const [error, setError] = useState('');

    const registerApi = async () => {
        const url = getRegisterEndpoint();
        const result = await PostWithoutTokenRequest(url , {
            "name" : name,
            "email" : email,
            "password": password,
            "password_confirmation" : confirmed
        });
        result.status !== 200 && setError(result.data.error);

        result.status === 200 && navigate('/');
    }

    return (
        <div className="form-container-login">
        <div style={{width:'300px'}}>
            {error && <ErrorView error={error}  />}
        <form style={{paddingTop: '30px'}}>
            <h3>Sign Up</h3>

            <div className="form-group">
                <label>First name</label>
                <input type="text"
                       value={name}
                       onChange={(event) => {
                           setName(event.target.value);
                       }}
                       className="form-control" placeholder="First name" />
            </div>

            <div className="form-group">
                <label>Email address</label>
                <input type="email"
                       value={email}
                       onChange={(event) => {
                           setEmail(event.target.value);
                       }}
                       className="form-control" placeholder="Enter email" />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password"
                       value={password}
                       onChange={(event) => {
                           setPassword(event.target.value);
                       }}
                       className="form-control" placeholder="Enter password" />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password"
                       value={confirmed}
                       onChange={(event) => {
                           setConfirmed(event.target.value);
                       }}
                       className="form-control" placeholder="Confirmation password" />
            </div>

            <button style={{width: '300px'}} type="button" onClick={registerApi} className="btn btn-primary btn-block">Sign Up</button>

        </form>
        </div>
        </div>
    );
}

export default Register;