document.addEventListener("DOMContentLoaded", function() {
    // Se creó el evento
    document.querySelector('button[type="button"]').addEventListener('click', function(event) { 

        // 1. Obtener el valor del campo de entrada del input type text
        const nuevoItem = document.getElementById('item').value; //tenìamos .trim(), que elimina los espacios del principio y final

        // 2. Verificar si hay contenido en el campo de entrada
        if (nuevoItem) {
            // 3. Obtener el listado guardado del localStorage
            let listado = obtenerListado(); //ver linea 38
            
            // 4. Agregar el nuevo ítem al listado
            listado.push(nuevoItem);
            
            // 5. Guardar el listado actualizado en el localStorage
            guardarListado(listado);

            // 6. Actualizar la vista del listado
            actualizarVistaListado(listado);

            // 7. Limpiar el campo de entrada
            document.getElementById('item').value = '';
        }
    });

    // Cargar el listado al inicio
    cargarListado();

    // Manejador de evento para el botón de limpiar
    document.getElementById('limpiar').addEventListener('click', function(event) {
        event.preventDefault();  // Evita la acción por defecto del formulario si está dentro de uno
        limpiarListado();
    });
});

// Función para obtener el listado guardado del localStorage
function obtenerListado() {
    const listadoJSON = localStorage.getItem('listadoLocal'); //Aquí, getItem se utiliza para recuperar el valor asociado con la clave 'listado' desde localStorage y la constante será un string en formato JSON (o null si la clave 'listado' no existe en localStorage)
    return listadoJSON ? JSON.parse(listadoJSON) : [];  //  parse convierte texto en un objeto JavaScript: 
    // condición ? valorSiVerdadero : valorSiFalso;
    // si encuentras algo ? Colocalo : array vacio;
}

// Función para guardar el listado en el localStorage
function guardarListado(listado) {
    localStorage.setItem('listadoLocal', JSON.stringify(listado));
}

// Función para actualizar la vista del listado en la página web
function actualizarVistaListado(listado) {
    const listaHTML = document.getElementById('contenedor');
    listaHTML.innerHTML = '';  // Limpiar la lista actual

    listado.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        li.className = 'list-group-item';
        listaHTML.appendChild(li);
    });
}

// Función para cargar el listado guardado y actualizar la vista al cargar la página
function cargarListado() {
    const listado2 = obtenerListado();
    actualizarVistaListado(listado2);
}

// Función para limpiar el listado guardado en el localStorage
function limpiarListado() {
    localStorage.removeItem('listadoLocal');
    actualizarVistaListado([]);  // Actualizar la vista con un listado vacío
}
