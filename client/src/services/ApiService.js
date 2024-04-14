// TODO: Move to a .env file
const API_URL = 'http://localhost:5000/api/features';

class ApiService {
  static async fetchEarthquakes(mag_type, page, per_page) {
    try {
      const params = new URLSearchParams({ mag_type, page, per_page });
      const response = await fetch(`${API_URL}?${params}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  static async fetchEarthquakeById(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async fetchCommentsByEarthquakeId(id) {
    try {
      const response = await fetch(`${API_URL}/${id}/comments`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  static async createComment(id, comment) {
    try {
      const response = await fetch(`${API_URL}/${id}/comments`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ body: comment }),
      });
      return response.json();
    } catch (error) {
      console.error(error);
    }
  }
}

export default ApiService;