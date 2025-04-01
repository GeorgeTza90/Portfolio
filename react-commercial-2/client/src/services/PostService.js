import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || 'https://grandeplayer.up.railway.app';


class PostService {
  constructor() {
    this.api = axios.create({
      baseURL: `${API_URL}/api`,
      withCredentials: true,
    });
  }
  

  async postLoginData(email, password) {
    const data = { email, password };
    const headers = { "Content-Type": "application/json" };
    return this.postData("/login", data, headers, true);
  }

  async postLogoutData(token) {
    const data = {};
    const headers = { Authorization: `Bearer ${token}` };
    return this.postData("/logout", data, headers);
  }

  async postRegisterData(user, pwd, email, selectedAvatar) {
    const data = { user, pwd, email, selectedAvatar };
    const headers = { "Content-Type": "application/json" };
    return this.postData("/register", data, headers, true);
  }

  async postCreateSongData(artist, song, artworkFile, numInstruments, instNames, instFiles, username, gp) {
    const data = this.prepareCreateSongData(artist, song, artworkFile, numInstruments, instNames, instFiles, username, gp);
    const headers = { "Content-Type": "application/json" };
    return this.postData("/player/createSong", data, headers, true);
  }

  async postUploadData(artist, song, artworkFile, numInstruments, instNames, instFiles) {
    const formData = this.prepareUploadData(artist, song, artworkFile, numInstruments, instNames, instFiles);
    const headers = { "Content-Type": "multipart/form-data" };
    return this.postFormData("/player/uploadSong", formData, headers, true);
  }

  async postPurchaseData({ firstName, lastName, email, premium, price }) {
    const data = { firstName, lastName, email, premium, price };
    const headers = { "Content-Type": "application/json" };
    return this.postData("/purchase", data, headers, true);
  }

  async postProfileData(username, pwd, email, selectedAvatar, userID) {
    const data = { username, pwd, email, selectedAvatar, userID };
    const headers = { "Content-Type": "application/json" };
    return this.postData("/profile", data, headers, true);
  }

  async postData(endpoint, data, headers = {}, withCredentials = false) {
    try {
      const response = await this.api.post(endpoint, JSON.stringify(data), {
        headers,
        withCredentials,
      });
      return response;
    } catch (error) {
      console.error(`Error posting data to ${endpoint}:`, error);
      throw error;
    }
  }
  
  async postFormData(endpoint, formData) {
    try {
      const response = await this.api.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data", 
        },
        withCredentials: true, 
      });
      return response;
    } catch (error) {
      console.error(`Error posting data to ${endpoint}:`, error);
      throw error;
    }
  }

  prepareCreateSongData(artist, song, artworkFile, numInstruments, instNames, instFiles, username, gp) {
    function getFileExtension(file) {
      if (!file) return '';
      const fileName = file.name || file;
      const parts = fileName.split('.');
      return parts.length > 1 ? parts[parts.length - 1] : '';
    }

    const instruments = instNames;
    let urls = {};

    for (let i = numInstruments; i >= 1; i--) {
      const extension = getFileExtension(instFiles[`inst${i}`]);

      if (instNames[`inst${i}`] && extension) {
        urls[`inst${i}_url`] = `${SONG_URL}/${artist}/${song}/${song}_${instNames[`inst${i}`]}.${extension}`;
      }
    }

    const imgExtension = getFileExtension(artworkFile);
    urls.img_url = `/${artist}/${song}/${song}_Img.${imgExtension}`;

    return { artist, song, urls, instruments, username, gp };
  }

  prepareUploadData(artist, song, artworkFile, numInstruments, instNames, instFiles) {
    const formData = new FormData();

    formData.append("artist", artist);
    formData.append("song", song);
    formData.append("numInstruments", numInstruments);
    formData.append("instNames", JSON.stringify(instNames));

    if (artworkFile) {
      formData.append("artworkFile", artworkFile);
    }

    for (let i = 1; i <= numInstruments; i++) {
      if (instFiles[`inst${i}`]) {
        formData.append(`inst${i}`, instFiles[`inst${i}`]);
      }
    }

    return formData;
  }
}

export default new PostService();
