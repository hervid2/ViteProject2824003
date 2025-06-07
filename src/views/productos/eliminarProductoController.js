import Swal from "sweetalert2";
import { getData } from "../../helpers/auth";
import { encabezados } from "../../helpers/solicitudes";

export const eliminarProductoController = async (a) => {
  const { accessToken } = getData();
    try {
        const request = await fetch(`http://localhost:3000/api/productos/${a}`, {
          method: 'DELETE',
          encabezados
        });
        const result = await request.json();
        if (result.success) {
            const tr = document.querySelector(`#user_${a}`);
            tr.remove();
            Swal.fire({
                title: 'Muy bien!',
                text: result.message,
                icon: 'success',
                confirmButtonText: 'Cool'
            })
        } else {
            Swal.fire({
                title: 'Error!',
                text: result.message,
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }
    } catch (error) {
        console.error(error);
    }
}