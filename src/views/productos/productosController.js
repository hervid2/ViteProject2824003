export const productosController = () => {
  
  const listar =  async () => {
    const request = await fetch('http://localhost:3000/api/productos');
    const { data } = await request.json();
    
    const tbody = document.querySelector('tbody');
    // Recorrecmos la respuesta
    data.forEach(({id, nombre, descripcion, precio,categoria_id}) => {
      // Creamos los elementos
      const tr = document.createElement('tr');
      const tdNombre = document.createElement('td');
      const tdDescripcion = document.createElement('td');
      const tdPrecio = document.createElement('td');
      const tdCategoria = document.createElement('td');
      const tdAcciones = document.createElement('td');
      const div = document.createElement('div');
      const btnEditar = document.createElement('a')
      const btnEliminar = document.createElement('a');
      // Agregamos los textos
      tdNombre.textContent = nombre;
      tdDescripcion.textContent = descripcion;
      tdPrecio.textContent = precio;
      tdCategoria.textContent = categoria_id;
      btnEditar.textContent = "Editar";
      btnEliminar.textContent = "Eliminar";
      // Agregamos los atributos
      div.setAttribute("class","botonera");
      btnEditar.setAttribute("href", `#editarProducto/${id}`);
      btnEditar.setAttribute("class","btn");
      btnEliminar.setAttribute("class", "btn--danger");
      // Creamos la botonera
      div.append(btnEditar, btnEliminar)
      tdAcciones.append(div);
      // Agregamos las columnas a la fila
      tr.append(tdNombre, tdDescripcion, precio, tdCategoria, tdAcciones );
      // Agregamos la fila a la tabla
      tbody.append(tr);
    });
    
  }

  listar()
}