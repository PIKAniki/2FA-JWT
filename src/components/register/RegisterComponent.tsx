import React, { useState } from 'react'
import "./register.scss"
import {AuthenticationService} from '../../serives/AuthenticationService';
import {  Link, useNavigate } from 'react-router-dom';
import { RegisterRequest } from '../../models/RegisterRequest';
import { VerificationRequest } from '../../models/VerificationRequest';
import { AuthenticationResponse } from '../../models/AuthenticationResponse';

const RegisterComponent: React.FC = () => {
    const [message, setMessage] = useState("");
    const [registerRequest, setRegisterRequest] = useState<RegisterRequest>({});
    const [authResponse, setAuthResponse] = useState<AuthenticationResponse>({});
    const [otpCode, setOtpCode] = useState("");
    const navigate = useNavigate();

    const register = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        try {
            const response = await AuthenticationService.register(registerRequest);
            if (response) {
                setAuthResponse(response);
            } else {
                setMessage('Account created successfully\nYou will be redirected to the Login page in 3 seconds');
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            }
        } catch (error) { 
            console.error(error);
        }
    }
    
    const verifyTfa = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        const verifyRequest: VerificationRequest = {
            email: registerRequest.email,
            code: otpCode
        };
        try {
            const response = await AuthenticationService.verifyCode(verifyRequest);
            setMessage('Account created successfully\nYou will be redirected to the Welcome page in 3 seconds');
            if (response.accessToken) {
                setTimeout(() => {
                    localStorage.setItem('token', response.accessToken as string);
                    navigate("/welcome");
                }, 3000)
            } else {
                console.error('Access token is undefined in the response');
            }
        } catch (error) {
            console.error(error);
            
        }
     }
    return (
        <>
            {!authResponse.mfaEnabled && (
                <div className='container'>
                    <div className="success-message-panel" style={{ display: message ? 'block' : 'none' }}>
                        <div className="success-icon">&#10004;</div>
                        <div className="success-message">{message}</div>
                    </div>
                    <h2>Register</h2>
                    <form onSubmit={register}>
                        <div className="form-group">
                            <label htmlFor="firstname">First Name</label>
                            <input required type="text" name="firstname" id="firstname" value={registerRequest.firstname || ''} onChange={(e) => setRegisterRequest({ ...registerRequest, firstname: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastname">Last Name</label>
                            <input required type="text" name="lastname" id="lastname" value={registerRequest.lastname || ''} onChange={(e) => setRegisterRequest({ ...registerRequest, lastname: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input required type="text" name="email" id="email" value={registerRequest.email || ''} onChange={(e) => setRegisterRequest({ ...registerRequest, email: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input required type="password" name="password" id="password" value={registerRequest.password || ''} onChange={(e) => setRegisterRequest({ ...registerRequest, password: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <input type="checkbox" name="rememberMe" id="rememberMe" checked={registerRequest.mfaEnabled || false} onChange={(e) => setRegisterRequest({ ...registerRequest, mfaEnabled: e.target.checked })} />
                            <label htmlFor="rememberMe">Enable 2FA (Two Factors Authentication)</label>
                        </div>
                        <button type="submit">Register</button>
                        <Link to="/login">Login</Link>
                    </form>
                </div>)}
            {authResponse.mfaEnabled && (
                <div className="container">
                    <div className="success-message-panel" style={{ display: message ? 'block' : 'none' }}>
                        <div className="success-icon">&#10004;</div>
                        <div className="success-message">{message}</div>
                    </div>
                    <h2>Set Up Two-Factor Authentication</h2>
                    <div className="qr-code">
                        <img src={authResponse.secretImageUri} alt="QRCode" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="validationCode">Enter 6 digits Validation Code Generated by the app</label>
                        <input required type="text" name="validationCode" id="validationCode" value={otpCode} onChange={(e) => setOtpCode(e.target.value)} />
                    </div>
                    <button className={otpCode.length < 6 ? 'button-disabled' : ''} type='button' onClick={verifyTfa}>Verify Code</button>
                </div>)}
        </>
    )
}

export default RegisterComponent
