let datos = [];

fetch("datos.csv")
  .then(res => res.text())
  .then(text => {
    const filas = text.split('\n').map(row => row.split(','));
    const encabezados = filas[0];
    datos = filas.slice(1);
    mostrarResultados('');

    document.getElementById("searchInput").addEventListener("input", e => {
      mostrarResultados(e.target.value);
    });
  });

function mostrarResultados(termino) {
  const contenedor = document.getElementById("resultados");
  const filtro = termino.toLowerCase();

  const filasFiltradas = datos.filter(fila =>
    fila.some(celda => celda.toLowerCase().includes(filtro))
  );

  let html = "<table><thead><tr>";
  html += datos[0].map((_, i) => `<th>Columna ${i + 1}</th>`).join('');
  html += "</tr></thead><tbody>";

  filasFiltradas.forEach(fila => {
    html += "<tr>" + fila.map(c => `<td>${c}</td>`).join('') + "</tr>";
  });

  html += "</tbody></table>";
  contenedor.innerHTML = html;
}
