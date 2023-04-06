let data;
let data10;
let myChart;
const api = async () => {
    try {
        const res = await fetch("https://mindicador.cl/api/");
        const json = await res.json();
        return data = json;
    } catch (error) {
        console.log(error);
    }
}

const listarMonedas = async () => {
    await api();
    if (!data) return console.log('No se pudo obtener la data');
    const selectMonedas = document.getElementById('monedas');
    const opcionesMonedas = Object.values(data)
        .filter(m => m.valor !== undefined)
        .map(m => `<option value="${m.codigo}">${m.nombre}</option>`);
    selectMonedas.innerHTML += opcionesMonedas.join('');
    selectMonedas.children[0].selected = true;
}
listarMonedas();

const botonConvertir = document.querySelector('.btn-info');
const resultado = document.getElementById('res');
botonConvertir.addEventListener('click', () => {
    const pesos = Number(document.getElementById('pesos').value);
    const moneSelect = document.getElementById('monedas').value;
    if (!pesos || !moneSelect) {
        resultado.textContent = 'falta valor';
        return;
    }
    const moneda = data[moneSelect];
    if (pesos && moneda) {
        const valorMoneda = moneda.valor;
        const conversion = pesos / valorMoneda;
        resultado.textContent = `El valor en ${moneda.nombre} es: ${conversion.toFixed(2)}`;
    } else {
        resultado.textContent = 'falta valor';
    }
});



const generarGrafico = async (moneda) => {

    await api10(moneda);
    const valores = data10.serie.map(obj => obj.valor);
    console.log(valores);
    const canvas = document.getElementById('myChart');
    const ctx = canvas.getContext('2d');
    if (myChart) {
        myChart.destroy();
    }
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Día 1', 'Día 2', 'Día 3', 'Día 4', 'Día 5', 'Día 6', 'Día 7', 'Día 8', 'Día 9', 'Día 10'],
            datasets: [{
                label: 'Valor de la moneda',
                data: valores,
                backgroundColor: 'rgb(18, 38, 153)',
                borderColor: 'rgb(18, 38, 153)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

}
const selectMonedas = document.getElementById('monedas');

selectMonedas.addEventListener('change', () => {
    const monedaSeleccionada = selectMonedas.value;
    generarGrafico(monedaSeleccionada);
});

const api10 = async (moneda) => {
    try {
        const res = await fetch(`https://mindicador.cl/api/${moneda}`);
        const json = await res.json();
        return data10 = json;
    } catch (error) {
        console.log(error);
    }
}