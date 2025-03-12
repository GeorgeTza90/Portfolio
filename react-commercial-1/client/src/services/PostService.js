import axios from "axios";


class PostService {
  constructor() {
    this.api = axios.create({
      baseURL: "/api",  
    });
  }

  async postLikeData(kind, id, user) {
    try {
      const response = await this.api.post(
        "/like",
        { kind, kindID: id, user },
        { headers: { "Content-Type": "application/json" } }
      );
      return response;

    } catch (error) {
      console.error(`Cannot like/unlike this ${kind}`, error);
      throw error;
    }
  }

  async postCommentData(user, text, postID) {
    try {
      const response =  await this.api.post(
        "/comment",
        { username: user, text, kind: "post", kindID: postID },
        { headers: { "Content-Type": "application/json" } }
      );
      return response;

    } catch (error) {
      console.error(`Failed to submit comment:`, error);
      throw error;
    }
  }

  async postContactData(firstName, lastName, email, phoneNumber, topic, message) {  
    try {
      const response =  await this.api.post(
        "/contact",
        JSON.stringify({ firstName, lastName, email, phoneNumber, topic, message }),
        { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
      );
      return response;

    } catch (error) {
      console.error("Error in Contact Form:", error);
      throw error;
    }
  }

  async postLoginData(email, password) {  
    try {
      const response = await this.api.post(
        "/login",
        { email, password },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      return response;

    } catch (error) {
      console.error("Failed to login:", error);
      throw error;
    }
  }

  async postLogoutData(token) {  
    try {
      const response = await this.api.post(
        "/logout",
        { },
        { headers: { Authorization: `Bearer ${token}` } }
      );      
      return response;

    } catch (error) {
      console.error("Failed to logout:", error);
      throw error;
    }
  }

  async postRegisterData(user, pwd, email) {  
    try {
      const response = await this.api.post(
        "/register",
        JSON.stringify({ user, pwd, email }),
        { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
    );
      return response;

    } catch (error) {
      console.error("Failed to register:", error);
      throw error;
    }
  }

  async postPurchaseData({firstName, lastName, email, ticketType, ticketQuantity}) {
    try {
      const response = await this.api.post(
        "/purchase",
        JSON.stringify({ firstName, lastName, email, ticketType, ticketQuantity }),
        { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
      );
      return response;

    } catch (error) {
      console.error("Failed on purchase:", error);
      throw error;
    }
  }
  
}

export default new PostService();  
