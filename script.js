// Инициализация MaterializeCSS компонентов
document.addEventListener('DOMContentLoaded', function() {
    M.AutoInit();
    setupEventListeners();
});

// Настройка обработчиков событий
function setupEventListeners() {
    const gameTypeSelect = document.getElementById('gameType');
    const playerCountSelect = document.getElementById('playerCount');
    const calculateButton = document.getElementById('calculate');

    gameTypeSelect.addEventListener('change', updateGameInputs);
    playerCountSelect.addEventListener('change', updateGameInputs);
    calculateButton.addEventListener('click', calculateResults);
}

// Обновление полей ввода в зависимости от типа игры и количества игроков
function updateGameInputs() {
    const gameType = document.getElementById('gameType').value;
    const playerCount = parseInt(document.getElementById('playerCount').value);
    const gameInputs = document.getElementById('gameInputs');
    
    gameInputs.innerHTML = ''; // Очищаем предыдущие поля

    // Создаем поля ввода в зависимости от типа игры
    switch(gameType) {
        case 'raspasy':
            createRaspasyInputs(playerCount);
            break;
        case 'vziatki':
            createVziatkiInputs(playerCount);
            break;
        case 'mizer':
            createMizerInputs(playerCount);
            break;
    }
}

// Создание полей ввода для распасов
function createRaspasyInputs(playerCount) {
    const gameInputs = document.getElementById('gameInputs');
    
    for (let i = 0; i < playerCount; i++) {
        const playerDiv = document.createElement('div');
        playerDiv.className = 'input-field';
        
        playerDiv.innerHTML = `
            <input type="number" id="player${i + 1}" min="0" max="10">
            <label for="player${i + 1}">Игрок ${i + 1} (взятки)</label>
        `;
        
        gameInputs.appendChild(playerDiv);
    }
}

// Создание полей ввода для игры на взятки
function createVziatkiInputs(playerCount) {
    const gameInputs = document.getElementById('gameInputs');
    
    const declarerDiv = document.createElement('div');
    declarerDiv.className = 'input-field';
    declarerDiv.innerHTML = `
        <select id="declarer">
            <option value="" disabled selected>Выберите заказчика</option>
            ${Array.from({length: playerCount}, (_, i) => 
                `<option value="${i + 1}">Игрок ${i + 1}</option>`
            ).join('')}
        </select>
    `;
    
    gameInputs.appendChild(declarerDiv);
    
    for (let i = 0; i < playerCount; i++) {
        const playerDiv = document.createElement('div');
        playerDiv.className = 'input-field';
        
        playerDiv.innerHTML = `
            <input type="number" id="player${i + 1}" min="0" max="10">
            <label for="player${i + 1}">Игрок ${i + 1} (взятки)</label>
        `;
        
        gameInputs.appendChild(playerDiv);
    }
}

// Создание полей ввода для мизера
function createMizerInputs(playerCount) {
    const gameInputs = document.getElementById('gameInputs');
    
    const declarerDiv = document.createElement('div');
    declarerDiv.className = 'input-field';
    declarerDiv.innerHTML = `
        <select id="declarer">
            <option value="" disabled selected>Выберите заказчика</option>
            ${Array.from({length: playerCount}, (_, i) => 
                `<option value="${i + 1}">Игрок ${i + 1}</option>`
            ).join('')}
        </select>
    `;
    
    gameInputs.appendChild(declarerDiv);
}

// Расчет результатов
function calculateResults() {
    const gameType = document.getElementById('gameType').value;
    const playerCount = parseInt(document.getElementById('playerCount').value);
    const results = document.getElementById('results');
    
    results.innerHTML = '<h5>Результаты расчета:</h5>';
    
    // Здесь будет логика расчета в зависимости от типа игры
    switch(gameType) {
        case 'raspasy':
            calculateRaspasy(playerCount);
            break;
        case 'vziatki':
            calculateVziatki(playerCount);
            break;
        case 'mizer':
            calculateMizer(playerCount);
            break;
    }
}

// Расчет для распасов
function calculateRaspasy(playerCount) {
    const results = document.getElementById('results');
    let totalTricks = 0;
    
    // Собираем данные о взятках
    for (let i = 0; i < playerCount; i++) {
        const tricks = parseInt(document.getElementById(`player${i + 1}`).value) || 0;
        totalTricks += tricks;
    }
    
    // Проверяем корректность данных
    if (totalTricks !== 10) {
        results.innerHTML += '<div class="red-text">Ошибка: сумма взяток должна быть равна 10</div>';
        return;
    }
    
    // Рассчитываем результаты
    for (let i = 0; i < playerCount; i++) {
        const tricks = parseInt(document.getElementById(`player${i + 1}`).value);
        const points = tricks * 2;
        results.innerHTML += `
            <div class="result-item">
                Игрок ${i + 1}: ${points} очков
            </div>
        `;
    }
}

// Заглушки для других типов расчета
function calculateVziatki(playerCount) {
    document.getElementById('results').innerHTML += '<div class="red-text">Расчет на взятки в разработке</div>';
}

function calculateMizer(playerCount) {
    document.getElementById('results').innerHTML += '<div class="red-text">Расчет мизера в разработке</div>';
} 