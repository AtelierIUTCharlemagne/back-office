import axios from 'axios';

const API_URL = 'http://docketu.iutnc.univ-lorraine.fr:62344/';

class AuthDataService {
  login(user) {
    return axios
      .post(API_URL + 'admin/signin', {
        email: user.email,
        passwd: user.password
      })
      .then(response => {
        console.log(response);
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }
}

export default new AuthDataService();
