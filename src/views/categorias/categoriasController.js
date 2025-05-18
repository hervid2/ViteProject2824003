export const categoriasController = () => {
  
  const listar =  async () => {
    const request = await fetch('http://localhost:3000/api/categorias');
    const { data } = await request.json();
    const tbody = document.querySelector('tbody');
    // Recorrecmos la respuesta
    data.forEach(({id, nombre, descripcion}) => {
      // Creamos los elementos
      const tr = document.createElement('tr');
      const tdNombre = document.createElement('td');
      const tdDescripcion = document.createElement('td');
      const tdCategoria = document.createElement('td');
      const tdAcciones = document.createElement('td');
      const div = document.createElement('div');
      const btnEditar = document.createElement('a')
      const btnEliminar = document.createElement('a');
      // Agregamos los textos
      tdNombre.textContent = nombre;
      tdDescripcion.textContent = descripcion;
      // tdCategoria.textContent = categoria;
      btnEditar.textContent = "Editar";
      btnEliminar.textContent = "Eliminar";
      // Agregamos los atributos
      div.setAttribute("class","botonera");
      btnEditar.setAttribute("href", `#editarcategoria/${id}`);
      btnEditar.setAttribute("class","btn");
      btnEliminar.setAttribute("class", "btn--danger");
      // Creamos la botonera
      div.append(btnEditar, btnEliminar)
      tdAcciones.append(div);
      // Agregamos las columnas a la fila
      tr.append(tdNombre, tdDescripcion, tdCategoria, tdAcciones );
      // Agregamos la fila a la tabla
      tbody.append(tr);
    });
    
  }

  listar()
}