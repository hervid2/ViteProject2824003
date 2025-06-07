import Swal from "sweetalert2";
import { getData } from "../../helpers/auth";
import { encabezados } from "../../helpers/solicitudes";

export const editarProductoController = async (producto) => {
  // Declaración de variables
  const { accessToken } = getData();
  const form = document.querySelector('form');
  const nombre = document.querySelector('#nombre');
  const descripcion = document.querySelector('#descripcion');
  const precio = document.querySelector('#precio');
  const listaCategorias = document.querySelector('#categoria_id');
  // Solicitud a la API
  const requestproductos = await fetch(`http://localhost:3000/api/productos/${producto.id}`);
  const { data: productos } = await requestproductos.json();
  console.log({data: productos});
  
    const requestCategorias = await fetch(`http://localhost:3000/api/categorias`);
  const { data: categorias } = await requestCategorias.json();
  console.log({data: categorias});

    // Llenado de los select
    categorias.forEach((categoria) => {
        const option = document.createElement('option');
        option.value=categoria.id;
        option.textContent=categoria.nombre;
        listaCategorias.appendChild(option);
    });

    //Llenado de los campos para el editado
    nombre.value = productos.nombre
    descripcion.value = productos.descripcion
    listaCategorias.value = productos.categoria_id
    precio.value = productos.precio


    // Declaración de métodos
        const actualizar = async (e) => {
            e.preventDefault()
            const data = {
                nombre: nombre.value,
                descripcion: descripcion.value,
                categoria_id: listaCategorias.value,
                precio: precio.value
            }
            const request = await fetch(`http://localhost:3000/api/productos/${producto.id}`, {
                method: 'PATCH',
                body: JSON.stringify(data),
                encabezados
            });
            const response = await request.json();
            if (response.success) {
                form.reset()
                 Swal.fire({
                    title: 'Muy bien!',
                    text: response.message,
                    icon: 'success',
                    confirmButtonText: 'Cool'
                })
                location.hash = "#productos";
            }else{
                console.log(response);   
                Swal.fire({
                    title: 'Error!',
                    text: response.message,
                    icon: 'error',
                    confirmButtonText: 'Cool'
                })
             
            }        
        }
    
        // Declaración de eventos
        form.addEventListener('submit', actualizar);   
}