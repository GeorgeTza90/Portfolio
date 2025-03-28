import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || 'https://icvacations.up.railway.app';
console.log(`API_URL: ${API_URL}`)

class GetService {
  constructor() {
    this.api = axios.create({
      baseURL: `${API_URL}/api`,
      withCredentials: true,
    });
  }


  async getNewsData(authToken) {
    const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};
    const err = "Error fetching news data:";
    return this.getData("/news", { headers }, err);
  }

  async getDestinationData() {
    const err = "Error fetching destination data:";
    return this.getData("/destination", {}, err);
  }

  async getAboutData() {
    const err = "Error fetching about data:";
    return this.getData("/about", {}, err);
  }

  async getContactData(authToken) {
    const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};
    const err = "Error fetching contact data:";
    return this.getData("/contact", { headers }, err);
  }

  async getLoginData() {
    const err = "Error fetching login data:";
    return this.getData("/login", {}, err);
  }

  async getRegisterData() {
    const err = "Error fetching register data:";
    return this.getData("/register", {}, err);
  }

  async getPurchaseData() {
    const err = "Error fetching purchase data:";
    return this.getData("/purchase", {}, err);
  }

  async getPaymentData() {
    const err = "Error fetching payment data:";
    return this.getData("/payment", {}, err);
  }


  async getData(endpoint, { headers }, err) {
    try {
      const response = await this.api.get(endpoint, { headers });
      return response.data;
    } catch (error) {
      console.error(`${err}`, error);
      throw error;
    }
  }
}

export default new GetService();
