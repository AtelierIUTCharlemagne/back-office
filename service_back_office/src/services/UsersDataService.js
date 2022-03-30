import http from "../API/adminApi";

class UsersDataService {
  getAll() {
    return http.get("/admin");
  }
  get(id) {
    return http.get(`/admin/${id}`);
  }
  delete(id) {
    return http.delete(`/admin/delete/${id}`);
  }
}
export default new UsersDataService();