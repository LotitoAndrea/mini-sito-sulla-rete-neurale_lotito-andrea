// ===================================
// VARIABILI GLOBALI
// ===================================

let input1, input2, weight1, weight2, threshold;
let input1Display, input2Display, weight1Display, weight2Display, thresholdDisplay;
let calc1Display, calc2Display, sumDisplay, comparisonDisplay;
let bulb, statusText, outputText;

// ===================================
// INIZIALIZZAZIONE
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    // Ottieni riferimenti agli elementi input
    input1 = document.getElementById('input1');
    input2 = document.getElementById('input2');
    weight1 = document.getElementById('weight1');
    weight2 = document.getElementById('weight2');
    threshold = document.getElementById('threshold');
    
    // Ottieni riferimenti ai display dei valori
    input1Display = document.getElementById('value1');
    input2Display = document.getElementById('value2');
    weight1Display = document.getElementById('weightValue1');
    weight2Display = document.getElementById('weightValue2');
    thresholdDisplay = document.getElementById('thresholdValue');
    
    // Ottieni riferimenti ai display dei calcoli
    calc1Display = document.getElementById('calc1');
    calc2Display = document.getElementById('calc2');
    sumDisplay = document.getElementById('sum');
    comparisonDisplay = document.getElementById('comparison');
    
    // Ottieni riferimenti alla lampadina e status
    bulb = document.getElementById('bulb');
    statusText = document.getElementById('status');
    outputText = document.getElementById('output');
    
    // Aggiungi event listeners per tutti gli input
    input1.addEventListener('input', handleInputChange);
    input2.addEventListener('input', handleInputChange);
    weight1.addEventListener('input', handleInputChange);
    weight2.addEventListener('input', handleInputChange);
    threshold.addEventListener('input', handleInputChange);
    
    // Aggiungi event listener per il pulsante reset
    const resetBtn = document.getElementById('resetBtn');
    resetBtn.addEventListener('click', resetValues);
    
    // Calcola il valore iniziale
    calculateNeuron();
});

// ===================================
// GESTIONE CAMBIAMENTI INPUT
// ===================================

function handleInputChange(event) {
    // Aggiorna il display del valore corrispondente
    const inputId = event.target.id;
    const value = parseFloat(event.target.value);
    
    switch(inputId) {
        case 'input1':
            input1Display.textContent = value.toFixed(1);
            break;
        case 'input2':
            input2Display.textContent = value.toFixed(1);
            break;
        case 'weight1':
            weight1Display.textContent = value.toFixed(1);
            break;
        case 'weight2':
            weight2Display.textContent = value.toFixed(1);
            break;
        case 'threshold':
            thresholdDisplay.textContent = value.toFixed(1);
            break;
    }
    
    // Ricalcola il neurone
    calculateNeuron();
}

// ===================================
// CALCOLO DEL NEURONE
// ===================================

function calculateNeuron() {
    // Ottieni i valori correnti
    const x1 = parseFloat(input1.value);
    const x2 = parseFloat(input2.value);
    const w1 = parseFloat(weight1.value);
    const w2 = parseFloat(weight2.value);
    const theta = parseFloat(threshold.value);
    
    // Calcola i prodotti ponderati
    const product1 = x1 * w1;
    const product2 = x2 * w2;
    
    // Calcola la somma totale
    const sum = product1 + product2;
    
    // Determina l'output (funzione di attivazione a gradino)
    const output = sum >= theta ? 1 : 0;
    
    // Aggiorna i display dei calcoli
    calc1Display.textContent = `${x1.toFixed(1)} × ${w1.toFixed(1)} = ${product1.toFixed(2)}`;
    calc2Display.textContent = `${x2.toFixed(1)} × ${w2.toFixed(1)} = ${product2.toFixed(2)}`;
    sumDisplay.textContent = sum.toFixed(2);
    
    // Aggiorna il confronto
    const comparisonSymbol = sum >= theta ? '≥' : '<';
    comparisonDisplay.textContent = `${sum.toFixed(2)} ${comparisonSymbol} ${theta.toFixed(1)}`;
    
    // Aggiorna la lampadina e lo status
    updateBulb(output, sum, theta);
    
    // Aggiorna la spiegazione
    updateExplanation(x1, x2, w1, w2, sum, theta, output);
}

// ===================================
// AGGIORNAMENTO LAMPADINA
// ===================================

function updateBulb(output, sum, theta) {
    if (output === 1) {
        // Neurone attivo - accendi la lampadina
        bulb.classList.add('active');
        statusText.textContent = 'ATTIVO ✓';
        statusText.style.color = '#10b981';
        outputText.textContent = '1';
    } else {
        // Neurone inattivo - spegni la lampadina
        bulb.classList.remove('active');
        statusText.textContent = 'INATTIVO';
        statusText.style.color = '#94a3b8';
        outputText.textContent = '0';
    }
}

// ===================================
// AGGIORNAMENTO SPIEGAZIONE
// ===================================

function updateExplanation(x1, x2, w1, w2, sum, theta, output) {
    const explanationText = document.getElementById('explanation');
    
    if (output === 1) {
        explanationText.innerHTML = `
            <strong>✓ Il neurone si è attivato!</strong><br>
            La somma ponderata (${sum.toFixed(2)}) è maggiore o uguale alla soglia (${theta.toFixed(1)}). 
            Questo significa che gli input ricevuti (${x1.toFixed(1)} e ${x2.toFixed(1)}), 
            moltiplicati per i rispettivi pesi (${w1.toFixed(1)} e ${w2.toFixed(1)}), 
            hanno generato un segnale abbastanza forte da superare la soglia di attivazione. 
            La lampadina si accende! 💡
        `;
    } else {
        explanationText.innerHTML = `
            <strong>✗ Il neurone è rimasto inattivo.</strong><br>
            La somma ponderata (${sum.toFixed(2)}) è inferiore alla soglia (${theta.toFixed(1)}). 
            Gli input ricevuti (${x1.toFixed(1)} e ${x2.toFixed(1)}), 
            anche moltiplicati per i rispettivi pesi (${w1.toFixed(1)} e ${w2.toFixed(1)}), 
            non hanno generato un segnale abbastanza forte. 
            La lampadina rimane spenta.
        `;
    }
}

// ===================================
// RESET VALORI
// ===================================

function resetValues() {
    // Ripristina i valori predefiniti
    input1.value = 5;
    input2.value = 5;
    weight1.value = 0.6;
    weight2.value = 0.4;
    threshold.value = 5;
    
    // Aggiorna i display
    input1Display.textContent = '5.0';
    input2Display.textContent = '5.0';
    weight1Display.textContent = '0.6';
    weight2Display.textContent = '0.4';
    thresholdDisplay.textContent = '5.0';
    
    // Ricalcola
    calculateNeuron();
    
    // Aggiungi un piccolo effetto visivo
    const resetBtn = document.getElementById('resetBtn');
    resetBtn.textContent = '✓ Ripristinato!';
    
    setTimeout(() => {
        resetBtn.textContent = '🔄 Ripristina Valori Predefiniti';
    }, 1500);
}

// ===================================
// FUNZIONI HELPER
// ===================================

// Funzione per animare il cambio di valore (opzionale)
function animateValue(element, start, end, duration) {
    const range = end - start;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = start + (range * progress);
        
        element.textContent = current.toFixed(2);
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Aggiungi effetti sonori (opzionale - commenta se non vuoi il suono)
function playActivationSound(activated) {
    // Crea un contesto audio se l'utente interagisce
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        if (activated) {
            // Suono ascendente per attivazione
            oscillator.frequency.value = 400;
            oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.1);
        } else {
            // Suono discendente per disattivazione
            oscillator.frequency.value = 800;
            oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
        }
        
        gainNode.gain.value = 0.1;
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        // Ignora errori audio
    }
}

// ===================================
// EASTER EGG: Combinazioni speciali
// ===================================

function checkSpecialCombinations() {
    const x1 = parseFloat(input1.value);
    const x2 = parseFloat(input2.value);
    
    // Se entrambi gli input sono al massimo
    if (x1 === 10 && x2 === 10) {
        console.log('🎉 Hai scoperto la potenza massima del neurone!');
    }
    
    // Se entrambi gli input sono a zero
    if (x1 === 0 && x2 === 0) {
        console.log('💤 Il neurone sta dormendo...');
    }
}

// Aggiungi il controllo delle combinazioni speciali
document.addEventListener('DOMContentLoaded', function() {
    input1.addEventListener('input', checkSpecialCombinations);
    input2.addEventListener('input', checkSpecialCombinations);
});
