import http from "../API/userApi";

class UsersDataService {
  getAll() {
    return http.get("/users");
  }
  get(id) {
    return http.get(`/users/${id}`);
  }
  delete(id) {
    return http.delete(`/users/${id}`);
  }
}
export default new UsersDataService();