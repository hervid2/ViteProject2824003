import { loadView } from "../helpers/loadView";
import { productosController } from "../views/productos/productosController.js";
import { productoController } from "../views/productos/productoController.js";
import { categoriasController } from "../views/categorias/categoriasController.js";
import { categoriaController } from "../views/categorias/categoriaController.js";
import { editarController } from "../views/categorias/editarController.js";


const routes = {
  productos: {
    "template": "productos/index.html",
    controlador: productosController
  },
  producto: {
    "template": "productos/producto.html",
    controlador: productoController
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
    controlador: editarController
  }
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
  const arreglo = hash.split('/') ;  

  for (const route in routes) {
    const b = route.split('/') ;    
    
    if (b.length !== arreglo.length) continue
    
    const params = {}

    const matched = b.every( (parte, i) => {      
      if (parte.startsWith(":")) {   
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