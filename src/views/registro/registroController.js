import Swal from "sweetalert2";



export const registroController = () => {
  // Declaración de variables 
      const form = document.querySelector('form');
      const nombre = document.querySelector('#nombre')
      const correo = document.querySelector('#email');
      const contrasena = document.querySelector('#password');
  
      // Declaración de métodos
      const enviar = async (e) => {
          e.preventDefault()
        const data = {
              nombre : nombre.value,
              email: correo.value,
              password: contrasena.value
          }
          const request = await fetch('http://localhost:3000/api/auth/register', {
              method: 'POST',
              body: JSON.stringify(data),
              headers: {
                'Content-type': 'application/json; charset=UTF-8'
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
              location.hash = "#login";
          }else{
              console.log(response);   
              Swal.fire({
                  title: 'Error!',
                  text: response.message,
                  icon: 'error',
                  confirmButtonText: 'Error en el registro!'
              })
           
          }        
      }
  
      // Declaración de eventos
      form.addEventListener('submit', enviar)   
}