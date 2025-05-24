import Swal from "sweetalert2";
export const editarProductoController = async (a) => {
    // Declaración de variables
    const form = document.querySelector('form');
    const nombre = document.querySelector('#nombre');
    const descripcion = document.querySelector('#descripcion');
    const precio = document.querySelector('#precio');
    const categoria_id = document.querySelector('#categoria_id');
    // Solicitud a la API
    const requestproductos = await fetch(`http://localhost:3000/api/productos/${a.id}`);
    const { data: productos } = await requestproductos.json();
    const requestCategorias = await fetch(`http://localhost:3000/api/categorias`);
    const {data: categorias} = await requestCategorias.json();

    // Llenado de los select
    categorias.forEach((categoria) => {
        const option = document.createElement('option');
        option.value=categoria.id;
        option.textContent=categoria.nombre;
        categoria_id.appendChild(option);
    });

    //Llenado de los campos para el editado
    nombre.value = productos.nombre
    descripcion.value = productos.descripcion
    categoria_id.value = productos.categoria_id
    precio.value = productos.precio


    // Declaración de métodos
        const actualizar = async (e) => {
            e.preventDefault()
            const data = {
                nombre: nombre.value,
                descripcion: descripcion.value,
                precio: precio.value,
                categoria_id: categoria_id.value
            }
            const request = await fetch(`http://localhost:3000/api/productos/${a.id}`, {
                method: 'PATCH',
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