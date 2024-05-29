document.getElementById('start-simulation').addEventListener('click', startSimulation);

function startSimulation() {
    const numStreets = 10;
    const numSimulations = 10000;
    let successfulEndings = 0;

    document.querySelector('.left-pane').style.backgroundColor = '#f0f0f08a';

    for (let i = 0; i < numSimulations; i++) {
        let position = { x: 0, y: 0 };

        for (let j = 0; j < numStreets; j++) {
            const direction = Math.floor(Math.random() * 4); //!CREAMOS LOS RAMDON DE LOS CRUCES CARDINALES.
            switch (direction) {
                case 0:
                    position.y += 1; // Norte
                    break;
                case 1:
                    position.y -= 1; // Sur
                    break;
                case 2:
                    position.x += 1; // Este
                    break;
                case 3:
                    position.x -= 1; // Oeste
                    break;
            }
        }

        const distance = Math.abs(position.x) + Math.abs(position.y); //!CONTAMOS LAS CALLES, PARA SAVER QUE TAN LEJOS ESTAREMOS DE LA ZONA 0
        if (distance === 2) { //!SI EL NUM DE CALLES ES === 2 DE LA ZONA 0, ES LA COINCIDENCIA A CONTAR
            successfulEndings++;
        }
    }

    const probability = (successfulEndings / numSimulations) * 100; //!APLICAMOS ECUACION DE PROBABILIDAD
    document.getElementById('probability').innerText = probability.toFixed(2) + '%'; //!MOSTRAMOS CON SOLO 2 DECIMALES

    // Explicación del cálculo matemático
    const mathExplanation = `
        <p class='mathExplanations'>
            Vamos a explicar cómo calculamos esta probabilidad usando una técnica llamada <strong>Simulación de Monte Carlo</strong>:
            <br/>
            Primero, imaginemos al ebrio en una esquina. Cada vez que llega a una nueva esquina, tiene cuatro opciones: ir al norte, sur, este u oeste. Todas estas direcciones tienen la misma probabilidad de ser elegidas.
            <br/>
            Entonces, las probabilidades de cada dirección afectarán la ecuación porque cada vez que el ebrio llega a una esquina, puede elegir entre cuatro direcciones: norte, sur, este u oeste. La probabilidad de elegir cualquiera de estas direcciones es la misma, es decir, 25%. Esto se refleja en la simulación donde se generan números aleatorios para decidir la dirección en cada paso.
            <br/>
            Para saber cuántas veces el ebrio termina exactamente a dos calles de su punto de partida después de caminar 10 calles, hacemos lo siguiente:
            <ol>
                <li><strong>Simulamos este paseo suficientes veces</strong> (10000 veces).</li>
                <li><strong>La dirección que el ebrio toma en cada cruce (norte, sur, este, oeste) es determinada aleatoriamente,</strong> el número total de éxitos varía en cada ejecución de la simulación.</li>
                <li><strong>Para cada simulación</strong>, contamos si el ebrio termina exactamente a dos calles de su punto de partida.</li>
                <li>Luego, <strong>calculamos la probabilidad</strong> dividiendo el número de veces que esto ocurre por el número total de simulaciones y multiplicamos por 100 para obtener un porcentaje.</li>
            </ol>
        
            En 10000 simulaciones, el ebrio terminó a dos calles de su punto de inicio <strong>${successfulEndings}</strong> veces. La ecuación utilizada es:
            <br/>
            <strong>Probabilidad = (Número de éxitos / Número total de simulaciones) * 100</strong>
            <br/>
            <strong>Probabilidad = (${successfulEndings} / ${numSimulations}) * 100 = ${probability.toFixed(2)}%</strong>
            <br/>
            Así que, en la presente corrida del algoritmo, 
            <br/>
            <strong id="probability-result">La probabilidad de terminar a dos calles de donde empezó es: ${probability.toFixed(2)}%</strong> 
        <p/>
    `;
    document.getElementById('math-explanation').innerHTML = mathExplanation;

    // Visualización del recorrido de un solo experimento
    simulateSingleWalk(numStreets);
}

function simulateSingleWalk(numStreets) {
    let position = { x: 0, y: 0 }; // Posición inicial
    let steps = [{ x: position.x, y: position.y }];
    
    for (let i = 0; i < numStreets; i++) {
        const direction = Math.floor(Math.random() * 4);
        switch (direction) {
            case 0:
                position.y += 1; // Norte
                break;
            case 1:
                position.y -= 1; // Sur
                break;
            case 2:
                position.x += 1; // Este
                break;
            case 3:
                position.x -= 1; // Oeste
                break;
        }
        steps.push({ x: position.x, y: position.y });
    }

    drawGrid();
    animatePath(steps);
}

function drawGrid() {
    const svg = d3.select("#canvas");
    const width = document.getElementById('grid-container').clientWidth;
    const height = document.getElementById('grid-container').clientHeight;
    const size = Math.min(width, height); // Asegurarse de que la cuadrícula sea cuadrada
    const step = size / 20;

    svg.selectAll("*").remove(); // Limpiar el canvas

    for (let i = 0; i <= size; i += step) {
        svg.append("line")
            .attr("x1", i)
            .attr("y1", 0)
            .attr("x2", i)
            .attr("y2", size)
            .attr("stroke", "#e0e0e0");

        svg.append("line")
            .attr("x1", 0)
            .attr("y1", i)
            .attr("x2", size)
            .attr("y2", i)
            .attr("stroke", "#e0e0e0");
    }
}

function animatePath(steps) {
    const svg = d3.select("#canvas");
    const width = document.getElementById('grid-container').clientWidth;
    const height = document.getElementById('grid-container').clientHeight;
    const size = Math.min(width, height); // Asegurarse de que la cuadrícula sea cuadrada
    const stepSize = size / 20;
    const delay = 500; // Tiempo en milisegundos entre pasos

    let stepIndex = 0;
    const path = svg.append("path")
        .datum(steps)
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-width", 2);

    const centerX = size / 2;
    const centerY = size / 2;

    const drunk = svg.append("image")
        .attr("xlink:href", "./assets/cerveza-11.gif") // Ruta a la imagen gif del ebrio
        .attr("width", stepSize * 4) // Ajustar el tamaño del gif
        .attr("height", stepSize * 4) // Ajustar el tamaño del gif
        .attr("x", centerX - stepSize * 1.5)
        .attr("y", centerY - stepSize * 1.5);

    const startPin = svg.append("circle")
        .attr("cx", centerX)
        .attr("cy", centerY)
        .attr("r", 7)
        .attr("fill", "green")
        .attr("stroke", "black")
        .attr("stroke-width", 2);

    function update() {
        if (stepIndex < steps.length) {
            const position = {
                x: centerX + steps[stepIndex].x * stepSize,
                y: centerY + steps[stepIndex].y * stepSize
            };

            drunk.attr("x", position.x - stepSize * 1.5)
                 .attr("y", position.y - stepSize * 1.5);

            if (stepIndex === steps.length - 1) {
                svg.append("circle")
                   .attr("cx", position.x)
                   .attr("cy", position.y)
                   .attr("r", 7)
                   .attr("fill", "blue")
                   .attr("stroke", "black")
                   .attr("stroke-width", 2);
            }

            path.attr("d", d3.line()
                .x(d => centerX + d.x * stepSize)
                .y(d => centerY + d.y * stepSize)
                .curve(d3.curveLinear)(steps.slice(0, stepIndex + 1)));

            addLabel(stepIndex, steps, centerX, centerY, stepSize);
            stepIndex++;
            setTimeout(update, delay);
        } else {
            removeLabel();
        }
    }
    update();
}

function addLabel(stepIndex, steps, centerX, centerY, stepSize) {
    const labelsContainer = document.getElementById('labels');
    labelsContainer.innerHTML = ''; // Limpiar etiquetas anteriores

    if (stepIndex > 0) {
        const label = document.createElement('span');
        label.className = 'label';
        label.innerText = 'Calle ' + stepIndex;
        const position = steps[stepIndex];
        label.style.left = (centerX + position.x * stepSize + stepSize / 2);
        label.style.left = (centerX + position.x * stepSize + stepSize / 2) + 'px';
        label.style.top = (centerY + position.y * stepSize + stepSize / 2) + 'px';
        labelsContainer.appendChild(label);
    }
}

function removeLabel() {
    const labelsContainer = document.getElementById('labels');
    labelsContainer.innerHTML = ''; // Limpiar todas las etiquetas
}
