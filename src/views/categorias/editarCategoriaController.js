import Swal from "sweetalert2";
import { getData } from "../../helpers/auth";
import { encabezados } from "../../helpers/solicitudes";

export const editarCategoriaController = async (a) => {
  // Declaración de variables
  const { accessToken } = getData();
    const form = document.querySelector('form');
    const nombre = document.querySelector('#nombre');
    const descripcion = document.querySelector('#descripcion');
    // Solicitud a la API
    const request = await fetch(`http://localhost:3000/api/categorias/${a.id}`);
    const {data: categorias} = await request.json();
    //Llenado de los campos para el editado
    nombre.value = categorias.nombre;
    descripcion.value = categorias.descripcion;

    // Declaración de métodos
        const actualizar = async (e) => {
            e.preventDefault()
            const data = {
                nombre: nombre.value,
                descripcion: descripcion.value
            }
            const request = await fetch(`http://localhost:3000/api/categorias/${a.id}`, {
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
                location.hash = "#categorias";
            }else{ 
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