import axios from 'axios';

class supplierService {
  static async fetchSuppliers() {
    try {
      const response = await axios.get("http://localhost:8080/api/suppliers");
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data || error.message);
    }
  }

  static async submitSupplierData(data) {
    try {
      const response = await axios.post("http://localhost:8080/api/suppliers", data);
      return response;
    } catch (error) {
      throw new Error(error.response?.data || error.message);
    }
  }
}

export default supplierService;
