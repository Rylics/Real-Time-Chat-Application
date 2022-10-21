import axios, { Axios } from "axios";

async function Update_Profile({ profilename, image }) {
  data = await axios.put("http://localhost:4195/login", {
    username: profilename,
    image: image,
  });
}
