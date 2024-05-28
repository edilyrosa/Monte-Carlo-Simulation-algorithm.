// document.getElementById('start-simulation').addEventListener('click', startSimulation);

// function startSimulation() {
//     const numStreets = 10;
//     const numSimulations = 10000;
//     let successfulEndings = 0;

//     for (let i = 0; i < numSimulations; i++) {
//         let position = { x: 0, y: 0 };

//         for (let j = 0; j < numStreets; j++) {
//             const direction = Math.floor(Math.random() * 4);
//             switch (direction) {
//                 case 0:
//                     position.y += 1; // Norte
//                     break;
//                 case 1:
//                     position.y -= 1; // Sur
//                     break;
//                 case 2:
//                     position.x += 1; // Este
//                     break;
//                 case 3:
//                     position.x -= 1; // Oeste
//                     break;
//             }
//         }

//         const distance = Math.abs(position.x) + Math.abs(position.y);
//         if (distance === 2) {
//             successfulEndings++;
//         }
//     }

//     const probability = (successfulEndings / numSimulations) * 100;
//     document.getElementById('probability').innerText = probability.toFixed(2) + '%';

//     // Explicación del cálculo matemático
//     const mathExplanation = `
//         <p>
//             Vamos a explicar cómo calculamos esta probabilidad usando una técnica llamada <strong>Simulación de Monte Carlo</strong>:
//             <br/>
//             Primero, imaginemos al ebrio en una esquina. Cada vez que llega a una nueva esquina, tiene cuatro opciones: ir al norte, sur, este u oeste. Todas estas direcciones tienen la misma probabilidad de ser elegidas.
//             <br/>
//             Entonces, las probabilidades de cada dirección afectarán la ecuación porque cada vez que el ebrio llega a una esquina, puede elegir entre cuatro direcciones: norte, sur, este u oeste. La probabilidad de elegir cualquiera de estas direcciones es la misma, es decir, 25%. Esto se refleja en la simulación donde se generan números aleatorios para decidir la dirección en cada paso.
//             <br/>
//             Para saber cuántas veces el ebrio termina exactamente a dos calles de su punto de partida después de caminar 10 calles, hacemos lo siguiente:
//             <ol>
//                 <li><strong>Simulamos este paseo suficientes veces</strong> (10000 veces).</li>
//                 <li><strong>La dirección que el ebrio toma en cada cruce (norte, sur, este, oeste) es determinada aleatoriamente,</strong> el número total de éxitos varía en cada ejecución de la simulación.</li>
//                 <li><strong>Para cada simulación</strong>, contamos si el ebrio termina exactamente a dos calles de su punto de partida.</li>
//                 <li>Luego, <strong>calculamos la probabilidad</strong> dividiendo el número de veces que esto ocurre por el número total de simulaciones y multiplicamos por 100 para obtener un porcentaje.</li>
//             </ol>
        
//             En 10000 simulaciones, el ebrio terminó a dos calles de su punto de inicio <strong>${successfulEndings}</strong> veces. La ecuación utilizada es:
//             <br/>
//             <strong>Probabilidad = (Número de éxitos / Número total de simulaciones) * 100</strong>
//             <br/>
//             <strong>Probabilidad = (${successfulEndings} / ${numSimulations}) * 100 = ${probability.toFixed(2)}%</strong>
//             <br/>
//             Así que, en la presente corrida del algoritmo, 
//             <br/>
//             <strong id="probability-result">La probabilidad de terminar a dos calle de donde empezó es: ${probability.toFixed(2)}%</strong> 
//         <p/>
//     `;
//     document.getElementById('math-explanation').innerHTML = mathExplanation;

//     // Visualización del recorrido de un solo experimento
//     simulateSingleWalk(numStreets);
// }

// function simulateSingleWalk(numStreets) {
//     let position = { x: 10, y: 10 }; // Posición inicial
//     let steps = [{ x: position.x, y: position.y }];
    
//     for (let i = 0; i < numStreets; i++) {
//         const direction = Math.floor(Math.random() * 4);
//         switch (direction) {
//             case 0:
//                 position.y += 1; // Norte
//                 break;
//             case 1:
//                 position.y -= 1; // Sur
//                 break;
//             case 2:
//                 position.x += 1; // Este
//                 break;
//             case 3:
//                 position.x -= 1; // Oeste
//                 break;
//         }
//         steps.push({ x: position.x, y: position.y });
//     }

//     drawGrid();
//     animatePath(steps);
// }

// function drawGrid() {
//     const svg = d3.select("#canvas");
//     const size = 500;
//     const step = size / 20;

//     svg.selectAll("*").remove(); // Limpiar el canvas

//     for (let i = 0; i <= size; i += step) {
//         svg.append("line")
//             .attr("x1", i)
//             .attr("y1", 0)
//             .attr("x2", i)
//             .attr("y2", size)
//             .attr("stroke", "#e0e0e0");

//         svg.append("line")
//             .attr("x1", 0)
//             .attr("y1", i)
//             .attr("x2", size)
//             .attr("y2", i)
//             .attr("stroke", "#e0e0e0");
//     }
// }

// function animatePath(steps) {
//     const svg = d3.select("#canvas");
//     const size = 500;
//     const stepSize = size / 20;
//     const delay = 500; // Tiempo en milisegundos entre pasos

//     let stepIndex = 0;
//     const path = svg.append("path")
//         .datum(steps)
//         .attr("fill", "none")
//         .attr("stroke", "blue")
//         .attr("stroke-width", 2);

//     const drunk = svg.append("circle")
//         .attr("r", 5)
//         .attr("fill", "red");


//     const startPin = svg.append("circle")
//         .attr("cx", 250)
//         .attr("cy", 250)
//         .attr("r", 7)
//         .attr("fill", "green")
//         .attr("stroke", "black")
//         .attr("stroke-width", 2);

//     function update() {
//         if (stepIndex < steps.length) {
//             const position = {
//                 x: 250 + (steps[stepIndex].x - 10) * stepSize,
//                 y: 250 + (steps[stepIndex].y - 10) * stepSize
//             };

//             drunk.attr("cx", position.x)
//                  .attr("cy", position.y);

//             if (stepIndex === steps.length - 1) {
//                 svg.append("circle")
//                    .attr("cx", position.x)
//                    .attr("cy", position.y)
//                    .attr("r", 7)
//                    .attr("fill", "blue")
//                    .attr("stroke", "black")
//                    .attr("stroke-width", 2);
//             }

//             path.attr("d", d3.line()
//                 .x(d => 250 + (d.x - 10) * stepSize)
//                 .y(d => 250 + (d.y - 10) * stepSize)
//                 .curve(d3.curveLinear)(steps.slice(0, stepIndex + 1)));

//             addLabel(stepIndex, steps);
//             stepIndex++;
//             setTimeout(update, delay);
//         } else {
//             removeLabel();
//         }
//     }
//     update();
// }

// function addLabel(stepIndex, steps) {
//     const labelsContainer = document.getElementById('labels');
//     labelsContainer.innerHTML = ''; // Limpiar etiquetas anteriores
//     const size = 500;
//     const stepSize = size / 20;

//     if (stepIndex > 0) {
//         const label = document.createElement('span');
//         label.className = 'label';
//         label.innerText = 'Calle ' + stepIndex;
//         const position = steps[stepIndex];
//         label.style.left = 250 + (position.x - 10) * stepSize + 'px';
//         label.style.top = 250 + (position.y - 10) * stepSize + 'px';
//         labelsContainer.appendChild(label);
//     }
// }

// function removeLabel() {
//     const labelsContainer = document.getElementById('labels');
//     labelsContainer.innerHTML = ''; // Limpiar todas las etiquetas
// }




function animatePath(steps) {
    const svg = d3.select("#canvas");
    const size = 750; // Tamaño del canvas ajustado
    const stepSize = size / 20;
    const delay = 500; // Tiempo en milisegundos entre pasos

    let stepIndex = 0;

    const drunk = svg.append("image")
        .attr("xlink:href", "./assets/cerveza-11.gif") // Ruta a la imagen gif del ebrio
        .attr("width", stepSize)
        .attr("height", stepSize)
        .attr("x", 10 * stepSize)
        .attr("y", 10 * stepSize);

    const startPin = svg.append("circle")
        .attr("cx", 10 * stepSize)
        .attr("cy", 10 * stepSize)
        .attr("r", 7)
        .attr("fill", "green")
        .attr("stroke", "black")
        .attr("stroke-width", 2);

    function update() {
        if (stepIndex < steps.length) {
            const position = {
                x: steps[stepIndex].x * stepSize,
                y: steps[stepIndex].y * stepSize
            };

            drunk.attr("x", position.x)
                 .attr("y", position.y);

            if (stepIndex === steps.length - 1) {
                svg.append("circle")
                   .attr("cx", position.x)
                   .attr("cy", position.y)
                   .attr("r", 7)
                   .attr("fill", "blue")
                   .attr("stroke", "black")
                   .attr("stroke-width", 2);
            }

            stepIndex++;
            setTimeout(update, delay);
        }
    }
    update();
}

