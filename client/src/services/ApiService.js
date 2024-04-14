class ApiService {
  static async fetchEarthquakes(mag_type, page, per_page) {
    try {
      const params = new URLSearchParams({ mag_type, page, per_page });
      const response = await fetch(`http://localhost:3000/api/features?${params}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  static async fetchEarthquakeById(id) {
    try {
      const response = await fetch(`http://localhost:3000/api/features/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export default ApiService;