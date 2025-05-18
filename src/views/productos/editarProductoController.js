import Swal from "sweetalert2";
export const editarProductoController = async (a) => {
    // Declaración de variables
    const form = document.querySelector('form');
    const nombre = document.querySelector('#nombre');
    const descripcion = document.querySelector('#descripcion');
    const precio = document.querySelector('#precio');
    const categoria_id = document.querySelector('#categoria_id');
    // Solicitud a la API
    const request = await fetch(`http://localhost:3000/api/categorias/${a.id}`);
    const {data} = await request.json();
    //Llenado de los campos para el editado
    nombre.value = data.nombre;
    descripcion.value = data.descripcion;
    precio.value = data.precio;
    categoria_id.value = data.categoria_id;

    // Declaración de métodos
        const actualizar = async (e) => {
            e.preventDefault()
            const data = {
                nombre: nombre.value,
                descripcion: descripcion.value,
                precio: precio.value,
                categoria_id: categoria_id.value
            }
            const request = await fetch(`http://localhost:3000/api/categorias/${a.id}`, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
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
        form.addEventListener('submit', actualizar);   
}