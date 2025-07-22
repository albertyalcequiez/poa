let datos = [];
let encabezados = [];

// Cargar el archivo CSV
fetch("datos.csv")
  .then(res => res.text())
  .then(text => {
    const filas = text.split('\n').filter(row => row.trim() !== "").map(row => row.split(','));
    encabezados = filas[0].map(e => e.trim());
    datos = filas.slice(1);
    mostrarResultados(''); // Muestra todo al cargar

    // Escuchar el input de búsqueda
    document.getElementById("searchInput").addEventListener("input", e => {
      mostrarResultados(e.target.value);
    });
  });

// Mostrar resultados de la búsqueda
function mostrarResultados(termino) {
  const contenedor = document.getElementById("resultados");
  const filtro = termino.trim().toLowerCase();

  if (!filtro) {
    // Mostrar todos si el campo está vacío
    construirTabla(datos);
    return;
  }

  // Filtrar por coincidencia en cualquier celda
  const filasFiltradas = datos.filter(fila =>
    fila.some(celda => celda.toLowerCase().includes(filtro))
  );

  if (filasFiltradas.length === 0) {
    contenedor.innerHTML = `<p style="padding: 1rem; text-align: center; color: #888; font-style: italic;">
      🔍 No se encontraron resultados para "<strong>${termino}</strong>"
    </p>`;
  } else {
    construirTabla(filasFiltradas);
  }
}

// Construir tabla con encabezados y datos
function construirTabla(filas) {
  const contenedor = document.getElementById("resultados");
  let html = "<table><thead><tr>";
  html += encabezados.map(c => `<th>${c}</th>`).join('');
  html += "</tr></thead><tbody>";

  filas.forEach(fila => {
    html += "<tr>" + fila.map(c => `<td>${c}</td>`).join('') + "</tr>";
  });

  html += "</tbody></table>";
  contenedor.innerHTML = html;
}
