
import './main.css';
import 'sweetalert2/src/sweetalert2.scss'
import { router } from './router/router';
import { cabecero } from "./componentes/header.js";

cabecero();
window.addEventListener('hashchange', () => {
  router(app)
});
window.addEventListener('DOMContentLoaded', () => {
  router(app)
});