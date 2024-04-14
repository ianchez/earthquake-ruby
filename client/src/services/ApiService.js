class ApiService {
  static async fetchEarthquakes(page, perPage) {
    try {
      const response = await fetch(`http://localhost:3000/api/features?page=${page}&per_page=${perPage}`);
      const { data } = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

export default ApiService;