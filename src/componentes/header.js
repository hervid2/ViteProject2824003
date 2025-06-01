import { cleanLocalStorage, estaAutenticado } from "../helpers/auth";

export const cabecero = () => {
  const app = document.querySelector("#app");
  const header = document.querySelector("#header");
  const div = document.createElement("div");
  const login = document.createElement("a");
  const registro = document.createElement("a");
  const inicio = document.createElement("a");
  const productos = document.createElement("a");
  const categorias = document.createElement("a");
  const cerrarSesion = document.createElement("a");

  inicio.textContent = "Inicio";
  productos.textContent = "Productos";
  categorias.textContent = "Categorias";
  cerrarSesion.textContent = "Cerrar Sesión";
  login.textContent = "Login";
  registro.textContent = "Registro";
  
  inicio.setAttribute("href", '"inicio');
  productos.setAttribute("href", '#productos');
  categorias.setAttribute("href", '#categorias');
  cerrarSesion.setAttribute("href", '#cerrarSesion');
  login.setAttribute("href", '#login')
  registro.setAttribute("href", '#registro')

  
  inicio.classList.add('menu__link')
  productos.classList.add('menu__link')
  categorias.classList.add('menu__link')
  cerrarSesion.classList.add('menu__link');
  header.classList.add('container', 'header')
  div.classList.add('menu')
  login.classList.add('menu__link')
  registro.classList.add('menu__link')


  div.append(login, registro);
  header.append(div);
  
  window.addEventListener("nombre", (e) => {
    e.preventDefault();
    if (estaAutenticado()) {
      agregar(div, inicio, productos, categorias, cerrarSesion);
      eliminar(login, registro);
      }
  })

  if (estaAutenticado()) {
    eliminar(login, registro);
    agregar(div, inicio, productos, categorias, cerrarSesion);
  }

  cerrarSesion.addEventListener("click", (e) => {
    e.preventDefault();
    cleanLocalStorage();
    logOutEliminar(inicio, productos, categorias, cerrarSesion);
    logOutAgregar(div, login, registro);
    window.location.hash = "#login";


    
  })

}

const agregar = (div, inicio, productos, categorias, cerrarSesion) => {
  div.append(inicio, productos, categorias, cerrarSesion)
}

const eliminar = (login, registro) => {
   login.remove();
   registro.remove();
}

const logOutAgregar = (div, login, registro) => {
   div.append(login, registro)
}

const logOutEliminar = (inicio, productos, categorias, cerrarSesion) => {
  inicio.remove();
  productos.remove();
  categorias.remove();
  cerrarSesion.remove();
}