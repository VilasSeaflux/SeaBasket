import axios from "axios";
import { BASE_URL } from "./Base";

export default axios.create({
    baseURL: BASE_URL,
})