export const setData = (data) => {
  console.log(data.accessToken);
  console.log(data.refreshToken);
  localStorage.setItem('refreshToken', data.refreshToken);
  localStorage.setItem('accessToken', data.accessToken);
}

export const getData = () => {
  return{
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken')
  }
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