import axios from 'axios';
import { RegisterRequest } from '../models/RegisterRequest';
import { AuthenticationRequest } from '../models/AuthenticationRequest';
import { AuthenticationResponse } from '../models/AuthenticationResponse';
import { VerificationRequest } from '../models/VerificationRequest';



const baseUrl = 'http://localhost:8080/api/v1/auth';

export const AuthenticationService = {
  register: async (registerRequest: RegisterRequest): Promise<AuthenticationResponse> => {
    const response = await axios.post<AuthenticationResponse>(
      `${baseUrl}/register`,
      registerRequest,
    );
    return response.data;
  },

  login: async (authRequest: AuthenticationRequest): Promise<AuthenticationResponse> => {
    const response = await axios.post<AuthenticationResponse>(
      `${baseUrl}/authenticate`,
      authRequest,
    );
    return response.data;
  },

  verifyCode: async (verificationRequest: VerificationRequest): Promise<AuthenticationResponse> => {
    const response = await axios.post<AuthenticationResponse>(
      `${baseUrl}/verify`,
      verificationRequest,
    );
    return response.data;
  },
};

