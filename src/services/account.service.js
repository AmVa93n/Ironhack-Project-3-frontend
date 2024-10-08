import axios from 'axios';

class AccountService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_DEV_SERVER_URL || process.env.REACT_APP_SERVER_URL
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = {
          ...config.headers, // Preserve existing headers
          Authorization: `Bearer ${storedToken}`
        };
      }

      return config;
    });
  }

  async getProfile() {
    const response = await this.api.get('/account/profile');
    return response.data.user
  }

  async updateProfile(requestBody) {
    return this.api.put(`/account/profile`, requestBody);
  }

  async deleteAccount() {
    return this.api.delete(`/account/profile`);
  }

  async getRooms() {
    const response = await this.api.get(`/account/rooms`);
    return response.data.rooms
  }

  async getRoom(roomId) {
    const response = await this.api.get(`/account/room/${roomId}`);
    return response.data.room
  }

  async createRoom(requestBody) {
    const response = await this.api.post('/account/room', requestBody);
    return response.data.room
  }

  async updateRoom(roomId, requestBody) {
    const response = await this.api.put(`/account/room/${roomId}`, requestBody);
    return response.data.room
  }

  async deleteRoom(roomId) {
    return this.api.delete(`/account/room/${roomId}`);
  }

  async getBoards() {
    const response = await this.api.get(`/account/boards`);
    return response.data.boards
  }

  async createBoard(requestBody) {
    const response = await this.api.post('/account/board', requestBody);
    return response.data.board
  }

  async updateBoard(requestBody) {
    const response = await this.api.put(`/account/board`, requestBody);
    return response.data.board
  }

  async deleteBoard(boardId) {
    return this.api.delete(`/account/board/${boardId}`);
  }

  async getTileBags() {
    const response = await this.api.get(`/account/tilebags`);
    return response.data.tileBags
  }

  async createTileBag(requestBody) {
    const response = await this.api.post('/account/tilebag', requestBody);
    return response.data.tilebag
  }

  async updateTileBag(requestBody) {
    const response = await this.api.put(`/account/tilebag`, requestBody);
    return response.data.tilebag
  }

  async deleteTileBag(tilebagId) {
    return this.api.delete(`/account/tilebag/${tilebagId}`);
  }

  async getGames() {
    const response = await this.api.get(`/account/games`);
    return response.data.games
  }
}

// Create one instance of the service
const accountService = new AccountService();

export default accountService;