let datos = [];
let encabezados = [];

fetch("datos.csv")
  .then(res => res.text())
  .then(text => {
    // Convertir CSV a array, ignorar líneas vacías
    const filas = text.split('\n').filter(row => row.trim() !== "").map(row => row.split(','));
    encabezados = filas[0];
    datos = filas.slice(1);
    mostrarResultados(''); // Mostrar todos al cargar
    
    document.getElementById("searchInput").addEventListener("input", e => {
      mostrarResultados(e.target.value);
    });
  });

function mostrarResultados(termino) {
  const contenedor = document.getElementById("resultados");
  const filtro = termino.toLowerCase();

  // Filtrar filas que contengan el término en cualquier celda
  const filasFiltradas = datos.filter(fila =>
    fila.some(celda => celda.toLowerCase().includes(filtro))
  );

  // Mostrar mensaje si no hay resultados
  if (filasFiltradas.length === 0) {
    contenedor.innerHTML = `<p style="padding: 1rem; text-align: center; color: #555; font-weight: bold;">
      🔍 No se encontraron resultados para "<i>${termino}</i>"
    </p>`;
    return;
  }

  // Construir tabla con encabezados y filas filtradas
  let html = "<table><thead><tr>";
  html += encabezados.map(c => `<th>${c}</th>`).join('');
  html += "</tr></thead><tbody>";

  filasFiltradas.forEach(fila => {
    html += "<tr>" + fila.map(c => `<td>${c}</td>`).join('') + "</tr>";
  });

  html += "</tbody></table>";
  contenedor.innerHTML = html;
}
