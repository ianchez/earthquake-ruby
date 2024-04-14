class ApiService {
  static async fetchEarthquakes() {
    try {
      const response = await fetch('http://localhost:3000/api/features');
      const { data } = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

export default ApiService;