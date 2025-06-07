import { setData } from "../../helpers/auth";
import { error } from "../../helpers/alerts";
import { success } from "../../helpers/alerts";

export const loginController = () => {
  // Declaración de variables
  
    const form = document.querySelector('form');
    const correo = document.querySelector('#email');
    const contrasena = document.querySelector('#password');

    // Declaración de métodos
    const enviar = async (e) => {
        e.preventDefault()
        const data = {
            email: correo.value,
            password: contrasena.value
        }
        const request = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Content-type': 'application/json; charset=UTF-8'
            }
        });
        const response = await request.json();
        if (response.success) {
          setData(response.data)
          success(response)
          form.reset()
          window.location.hash = "#inicio";
          window.dispatchEvent(new CustomEvent ("nombre", {}))
        }else{
         error(response)
        }        
    }

    // Declaración de eventos
    form.addEventListener('submit', enviar)   
}