import Swal from "sweetalert2";

export const success = (data) => {
  Swal.fire({
    title: 'Usuario autenticado!',
    text: data.message,
    icon: 'success',
    confirmButtonText: 'Access granted successfully!'
    })
}

export const error = (data) => {
  Swal.fire({
    title: 'Credenciales incorrectas o mal ingresadas!',
    text: data.message,
    icon: 'error',
    confirmButtonText: 'Error!'
    })
}