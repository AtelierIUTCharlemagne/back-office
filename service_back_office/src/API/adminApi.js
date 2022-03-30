import axios from "axios";
export default axios.create({
  baseURL: "http://docketu.iutnc.univ-lorraine.fr:62344",
  headers: {
    "Content-type": "application/json"
  }
});