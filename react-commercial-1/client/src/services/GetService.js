import axios from "axios";

class GetService {

  async getNewsData(authToken) {
    fetch('https://icvacations.up.railway.app/api/news')
      .then((response) => response.json())
      .then((data) => {
        console.log('API Response:', data);
      })
      .catch((error) => {
        console.error('API Error:', error);
      });
  }

}

export default new GetService();