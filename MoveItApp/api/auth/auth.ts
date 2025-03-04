import client from '../client';

const endpoint = '/auth';

interface User {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
}

interface Credentials {
  email: string;
  password: string;
}

interface PasswordReset {
  email: string;
  securityCode: string;
  newPassword: string;
}

interface VerifyRegistration {
  email: string;
  activationCode: string;
}

const getUsers = () => client.get(`${endpoint}`);

const registerUser = (user: User) => client.post(`${endpoint}/register`, user);

const verifyUser = (verifyRegistration: VerifyRegistration) => client.post(`${endpoint}/verifyActivationCode`, verifyRegistration);

const getUserById = (userId: string) => client.get(`${endpoint}/users/${userId}`);

const loginUser = (credentials: Credentials) => client.post(`${endpoint}/login`, credentials);

const forgotPassword = (email: string) => client.post(`${endpoint}/forgot-password`, { email });

const verifyOtpAndResetPassword = (passwordReset: PasswordReset) =>
  client.post(`${endpoint}/verify-otp-and-reset-password`, passwordReset);

const updateUser = (userEmail: string, updatedUserData: Partial<User>) =>
  client.patch(`${endpoint}/update/${userEmail}`, updatedUserData);

const resendSecurityCode = (email: string) =>
  client.post(`${endpoint}/resend-security-code`, { email });
const resendActivationCode = (email: string) => client.post(`${endpoint}/resend-activation-code`, {email});

export {
  getUsers,
  getUserById,
  registerUser,
  loginUser,
  forgotPassword,
  verifyOtpAndResetPassword,
  resendSecurityCode,
  updateUser,
  verifyUser,
  resendActivationCode,
};
