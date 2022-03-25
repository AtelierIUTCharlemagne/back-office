import axios from "axios";
export default axios.create({
  baseURL: "http://docketu.iutnc.univ-lorraine.fr:62349",
  headers: {
    "Content-type": "application/json"
  }
});