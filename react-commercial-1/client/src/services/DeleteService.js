import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;


class DeleteService {
  constructor() {
    this.api = axios.create({
      baseURL: `${API_URL}/api`,
    });
  } 
  

  async deleteLikeData(kind, id, user) {
    const data = { kind, id, user };
    const headers = { "Content-Type": "application/json" };
    const err = `Cannot like/unlike this ${kind}`;
    return this.deleteData("/like", { data, headers }, err);
  }

  async deleteCommentData(commentID, user) {    
    const data = { user };
    const headers = { "Content-Type": "application/json" };
    const err = "Error deleting comment:";
    return this.deleteData(`/comment/${commentID}`, { data, headers }, err);
  }
  
  
  async deleteData(endpoint, { data, headers }, err) {
    try {
      const response = await this.api.delete(endpoint, { data, headers });
      return response.data;
    } catch (error) {
      console.error(`${err}`, error.response ? error.response.data : error.message);
      throw error;
    }
  }
}

export default new DeleteService();
