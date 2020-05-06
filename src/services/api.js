import axios from "axios";

const api = axios.create({
  baseURL: "https://api.punkapi.com/v2/beers",
});


const findByName = (page, per_page, beer_name='_') =>{
  return api.get("",{
    params:{
      page,
      per_page,
      beer_name
    }
  });
}

const findById = id =>{
    return api.get(`/${id}`);
}

export default {
  findById,
  findByName
};
