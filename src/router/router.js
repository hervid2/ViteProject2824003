import { loadView } from "../helpers/loadView";
import { estaAutenticado } from "../helpers/auth.js";
import { productosController } from "../views/productos/productosController.js";
import { productoController } from "../views/productos/productoController.js";
import { editarProductoController } from "../views/productos/editarProductoController.js";
import { categoriasController } from "../views/categorias/categoriasController.js";
import { categoriaController } from "../views/categorias/categoriaController.js";
import { editarCategoriaController } from "../views/categorias/editarCategoriaController.js";
import { loginController } from "../views/login/loginController.js";
import { registroController } from "../views/registro/registroController.js";
import {inicioController} from "../views/inicio/inicioController.js"


const routes = {
   "/": {
    "template": "inicio/index.html",
    controlador: inicioController,
    private: false
  },
  productos: {
    "template": "productos/index.html",
    controlador: productosController,
    private: true
  },
  producto: {
    "template": "productos/producto.html",
    controlador: productoController,
    private: true
  },
   "editarProducto/:id": {
    "template": "productos/editar.html",
     controlador: editarProductoController,
     private: true
  },
  categorias: {
    "template": "categorias/index.html",
    controlador: categoriasController,
    private: true
  },
  categoria: {
    "template": "categorias/categoria.html",
    controlador: categoriaController,
    private: true
  },
  "editarcategoria/:id": {
    "template": "categorias/editar.html",
    controlador: editarCategoriaController,
    private: true
  },
  login: {
    "template": "login/index.html",
    controlador: loginController,
    private: false
  },
  registro: {
    "template": "registro/index.html",
    controlador: registroController,
    private: false
  },
};

export const router = async (app) => {  
  const hash = location.hash.slice(1);
  const [rutas, params] = matchRoute(hash)
  
  if (!rutas) {
    await loadView(app, 'inicio/index.html');
    inicioController();
    return;
  }
  //validamos si la ruta es privada
  console.log(rutas.private, estaAutenticado());

  if (rutas.private && !estaAutenticado()) {
    window.location.href = "/#login";
    return
  }
  
  // Llamando la vista
  await loadView(app, rutas.template);
  // Ejecutar el controldor
  rutas.controlador(params)
}

const matchRoute = (hash) => {  
  const arreglo = hash.split('/');  

  for (const route in routes) {
    const b = route.split('/') ;    
    
    if (b.length !== arreglo.length) continue
    
    const params = {}

    const matched = b.every((parte, i) => {      
      if(parte.startsWith(":")) {   
        const partName = parte.slice(1);
        const value = arreglo[i];
        params[partName] = value;
        return true
      }
      if (parte === arreglo[i]){
        return true
      }
    });

    if (matched) {
      return [routes[route], params];
    }
  }
  return [null, null]
}