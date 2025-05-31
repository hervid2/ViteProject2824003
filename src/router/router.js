import { loadView } from "../helpers/loadView";
import { productosController } from "../views/productos/productosController.js";
import { productoController } from "../views/productos/productoController.js";
import { editarProductoController } from "../views/productos/editarProductoController.js";
import { categoriasController } from "../views/categorias/categoriasController.js";
import { categoriaController } from "../views/categorias/categoriaController.js";
import { editarCategoriaController } from "../views/categorias/editarCategoriaController.js";
import { loginController } from "../views/login/loginController.js";
import { registroController } from "../views/registro/registroController.js";


const routes = {
   "/": {
    "template": "productos/index.html",
    controlador: productosController
  },
  productos: {
    "template": "productos/index.html",
    controlador: productosController
  },
  producto: {
    "template": "productos/producto.html",
    controlador: productoController
  },
   "editarProducto/:id": {
    "template": "productos/editar.html",
    controlador: editarProductoController
  },
  categorias: {
    "template": "categorias/index.html",
    controlador: categoriasController
  },
  categoria: {
    "template": "categorias/categoria.html",
    controlador: categoriaController
  },
  "editarcategoria/:id": {
    "template": "categorias/editar.html",
    controlador: editarCategoriaController
  },
  login: {
    "template": "login/index.html",
    controlador: loginController
  },
  registro: {
    "template": "registro/index.html",
    controlador: registroController
  },
};

export const router = async (app) => {  
  const hash = location.hash.slice(1);
  const [rutas, params ] = matchRoute(hash)
  // console.log(params);
  
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