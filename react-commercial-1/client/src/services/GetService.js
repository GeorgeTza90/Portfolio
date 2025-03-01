import axios from "axios";


class GetService {
  constructor() {
    this.api = axios.create({
      baseURL: "/api",  
    });
  }

  async getNewsData(authToken) {
    try {
      const response = await this.api.get("/news", {
      headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
      });
      return response.data;  

    } catch (error) {
      console.error("Error fetching data:", error); 
      throw error;
    }
  }

  async getDestinationData() {
    try {
      const response = await this.api.get("/destination");  
      return response.data;  

    } catch (error) {
      console.error("Error fetching data:", error); 
      throw error;
    }
  }
  
  async getAboutData() {
    try {
      const response = await this.api.get("/about");  
      return response.data;  

    } catch (error) {
      console.error("Error fetching data:", error); 
      throw error;
    }
  }

  async getContactData(authToken) {
    try {
      if(authToken) {
        const response = await this.api.get("/contact", {
          headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
        });       
        return response.data;   
      }

    } catch (error) {
      console.error("Error fetching contact:", error); 
      throw error;
    }
  }

  async getLoginData() {
    try {
      const response = await this.api.get("/login");  
      return response.data;  

    } catch (error) {
      console.error("Error fetching data:", error); 
      throw error;
    }
  }

  async getRegisterData() {
    try {
      const response = await this.api.get("/register");  
      return response.data; 
       
    } catch (error) {
      console.error("Error fetching data:", error); 
      throw error;
    }
  }

  async getPurchaseData() {
    try {
      const response = await this.api.get("/purchase");
      return response.data;

    } catch (error) {
      console.error("Error fetching data:", error); 
      throw error;
    }
  }

  async getPaymentData() {
    try {
      const response = await this.api.get("/payment");
      return response.data;
  
    } catch (error) {
      console.error("Error fetching data:", error); 
      throw error;
    }
  }

}

export default new GetService();  
