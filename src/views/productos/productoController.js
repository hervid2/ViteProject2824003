import Swal from "sweetalert2";
import { encabezados } from "../../helpers/solicitudes";
import { getData } from "../../helpers/auth";


export const productoController =async () => {
  // Declaración de variables
    const { accessToken } = getData();
    const form = document.querySelector('form');
    const nombre = document.querySelector('#nombre');
    const descripcion = document.querySelector('#descripcion');
    const precio = document.querySelector('#precio');
    const listaCategorias =document.querySelector('#categoria_id');

    const requestCategorias = await fetch('http://localhost:3000/api/categorias');
    const { data: categorias } = await requestCategorias.json();
    
    categorias.forEach((categoria) => {
        const option = document.createElement('option');
        option.value=categoria.id;
        option.textContent=categoria.nombre;
        listaCategorias.appendChild(option);
    });

    const requestproductos = await fetch('http://localhost:3000/api/productos');
    const { data: productos } = await requestproductos.json();
    
    
    
    // Declaración de métodos
    const enviar = async (e) => {
        e.preventDefault()
        const data = {
            categoria_id:listaCategorias.value,
            nombre: nombre.value,
            descripcion: descripcion.value,
            precio:precio.value
        }
        const request = await fetch('http://localhost:3000/api/productos', {
            method: 'POST',
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
    form.addEventListener('submit', enviar) 

}