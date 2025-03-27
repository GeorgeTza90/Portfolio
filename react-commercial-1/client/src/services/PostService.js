import axios from "axios";
// const API_URL = process.env.REACT_APP_API_URL || 'https://icvacations.up.railway.app';


class PostService {
  constructor() {
    this.api = axios.create({
      baseURL: `https://icvacations.up.railway.app/api`, 
    });
  }
  

  async postLikeData(kind, id, user) {
    const data = { kind, kindID: id, user };
    const err = `Cannot like/unlike this ${kind}`;
    return this.postData("/like", { data }, err);
  }

  async postCommentData(user, text, postID) {
    const data = { username: user, text, kind: "post", kindID: postID };
    const err = "Failed to submit comment:";
    return this.postData("/comment", { data }, err);
  }

  async postContactData(firstName, lastName, email, phoneNumber, topic, message) {
    const data = { firstName, lastName, email, phoneNumber, topic, message };
    const err = "Error in Contact Form:";
    return this.postData("/contact", { data, withCredentials: true }, err);
  }

  async postLoginData(email, password) {
    const data = { email, password };
    const err = "Failed to login:";
    return this.postData("/login", { data, withCredentials: true }, err);
  }

  async postLogoutData(token) {
    const headers = { Authorization: `Bearer ${token}` };
    const err = "Failed to logout:";
    return this.postData("/logout", { headers }, err);
  }

  async postRegisterData(user, pwd, email) {
    const data = { user, pwd, email };
    const err = "Failed to register:";
    return this.postData("/register", { data, withCredentials: true }, err);
  }

  async postPurchaseData({ firstName, lastName, email, ticketType, ticketQuantity }) {
    const data = { firstName, lastName, email, ticketType, ticketQuantity };
    const err = "Failed on purchase:";
    return this.postData("/purchase", { data, withCredentials: true }, err);
  }


  async postData(endpoint, { data, headers, withCredentials }, err) {
    try {
      const response = await this.api.post(endpoint, data, {
        headers: { "Content-Type": "application/json", ...headers },
        withCredentials: withCredentials || false,
      });
      return response;
    } catch (error) {
      console.error(`${err}`, error);
      throw error;
    }
  }
}

export default new PostService();
