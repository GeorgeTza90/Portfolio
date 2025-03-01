import axios from "axios";


class DeleteService {
  constructor() {
    this.api = axios.create({
      baseURL: "/api",  
    });
  }

  async deleteLikeData(kind, id, user) {
    try {
      const response = await this.api.delete(
        "/like",
        { data: { kind, kindID: id, user }, headers: { "Content-Type": "application/json" } }
      );
      return response;

    } catch (error) {
      console.error(error.response, `Cannot like/unlike this ${kind}`);
      throw error;
    }
  }

  async deleteCommentData(commentID, user) {
    try {
      const response = await this.api.delete(
        `/comment/${commentID}`,
        { data: { username: user }, headers: { "Content-Type": "application/json" } }
      );
      return response;
      
    } catch (error) {
      console.error("Error deleting comment:", error.response);
      throw error;
    }
  }
}

export default new DeleteService();
