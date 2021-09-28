import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8100/user/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'role', { headers: authHeader() });
  }

  getProfileImage() {
    return axios.get(API_URL + 'profilepic', { headers: authHeader() });
  }

}

export default new UserService();