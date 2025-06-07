import { routes } from "../router/router";
const accessToken = localStorage.getItem("accessToken");

export const encabezados = {
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
    'Authorization': `Bearer${accessToken}`
  }
}


 
