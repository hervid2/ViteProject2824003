export const setData = (data) => {
  // console.log(data.accessToken);
  // console.log(data.resfreshToken);
  localStorage.setItem('refreshToken', data.refreshToken);
  localStorage.setItem('accessToken', data.accessToken);
}

export const getData = () => {
  
}

export const estaAutenticado = () => {
  if (localStorage.accessToken === undefined) {
      return false// alert("Usuario no autenticado!")
  } else {
    // alert("Usuario autenticado!")
    return true
  }
}

export const cleanLocalStorage = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}