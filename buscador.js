let datos = [];
let encabezados = [];

fetch("datos.csv")
  .then(res => res.text())
  .then(text => {
    const filas = text.split('\n').filter(row => row.trim() !== "").map(row => row.split(','));
    encabezados = filas[0];
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
  html += encabezados.map(c => `<th>${c}</th>`).join('');
  html += "</tr></thead><tbody>";

  filasFiltradas.forEach(fila => {
    html += "<tr>" + fila.map(c => `<td>${c}</td>`).join('') + "</tr>";
  });

  html += "</tbody></table>";
  contenedor.innerHTML = html;
}
