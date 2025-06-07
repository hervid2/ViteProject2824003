import Swal from "sweetalert2";
import { encabezados } from "../../helpers/solicitudes";
import { getData } from "../../helpers/auth";

export const categoriaController = () => {
  const { accessToken } = getData();
    // Declaración de variables
    const form = document.querySelector('form');
    const nombre = document.querySelector('#nombre');
    const descripcion = document.querySelector('#descripcion');
    const id_categoria = document.querySelector('#id_categoria');

    // Declaración de métodos
    const enviar = async (e) => {
        e.preventDefault()
        const data = {
            nombre: nombre.value,
            descripcion: descripcion.value,
            id_categoria: id_categoria.value
        }
        const request = await fetch('http://localhost:3000/api/categorias', {
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