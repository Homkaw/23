const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const questionSection = document.getElementById('question');
const congratulationsSection = document.getElementById('congratulations');

yesBtn.addEventListener('click', () => {
    questionSection.style.display = 'none';
    congratulationsSection.style.display = 'block';
});

function moveButton(event) { // Добавляем параметр event для получения координат курсора
    const containerWidth = questionSection.offsetWidth;
    const buttonWidth = noBtn.offsetWidth;
    const containerHeight = questionSection.offsetHeight;
    const buttonHeight = noBtn.offsetHeight;

    const maxX = containerWidth - buttonWidth;
    const maxY = containerHeight - buttonHeight;

    let randomX, randomY;
    let cursorX, cursorY;

    // Получаем координаты курсора (или касания)
    if (event.type === 'mouseover') {
        cursorX = event.clientX - questionSection.offsetLeft;
        cursorY = event.clientY - questionSection.offsetTop;
    } else if (event.type === 'touchstart') {
        cursorX = event.touches[0].clientX - questionSection.offsetLeft;
        cursorY = event.touches[0].clientY - questionSection.offsetTop;
    }

    // Генерируем случайные координаты, пока они не будут достаточно далеко от курсора
    do {
        randomX = Math.floor(Math.random() * maxX);
        randomY = Math.floor(Math.random() * maxY);
    } while (
        randomX > cursorX - buttonWidth / 2 &&
        randomX < cursorX + buttonWidth / 2 &&
        randomY > cursorY - buttonHeight / 2 &&
        randomY < cursorY + buttonHeight / 2
    );


    noBtn.style.position = 'absolute';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}

// Функция для обработки наведения/касания
function handleMove(event) {
    moveButton(event); // Передаем объект event в moveButton
}

// Определяем, поддерживает ли устройство сенсорные касания
function isTouchDevice() {
    return (('ontouchstart' in window) ||
           (navigator.maxTouchPoints > 0) ||
           (navigator.msMaxTouchPoints > 0));
}


if (isTouchDevice()) {
    // Для сенсорных устройств перемещаем кнопку при касании
    noBtn.addEventListener('touchstart', handleMove);
} else {
    // Для компьютеров перемещаем кнопку при наведении
    noBtn.addEventListener('mouseover', handleMove);
}



noBtn.addEventListener('click', () => {
    alert('Не уйдёшь!'); // Добавим сообщение при попытке нажать на убегающую кнопку
});