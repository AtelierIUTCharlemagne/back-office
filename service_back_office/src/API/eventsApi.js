import axios from "axios";
export default axios.create({
  baseURL: "http://docketu.iutnc.univ-lorraine.fr:62345",
  headers: {
    "Content-type": "application/json"
  }
});