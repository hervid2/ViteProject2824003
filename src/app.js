
import './main.css';
import 'sweetalert2/src/sweetalert2.scss'
import { router } from './router/router';
const app = document.querySelector("#app");
const header = document.querySelector("#header");
const div = document.createElement("div");
const productos = document.createElement("a");
const categorias = document.createElement("a");
const login = document.createElement("a");
const registro = document.createElement("a");
productos.textContent = "Productos";
categorias.textContent = "Categorias";
login.textContent = "Login";
registro.textContent = "Registro";
productos.setAttribute("href", '#productos')
categorias.setAttribute("href", '#categorias')
login.setAttribute("href", '#login')
registro.setAttribute("href", '#registro')
header.classList.add('container', 'header')
div.classList.add('menu')
productos.classList.add('menu__link')
categorias.classList.add('menu__link')
login.classList.add('menu__link')
registro.classList.add('menu__link')
div.append(productos, categorias, login, registro);
header.append(div);

window.addEventListener('hashchange', () => {
  router(app)
});
window.addEventListener('DOMContentLoaded', () => {
  router(app)
});