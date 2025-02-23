const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const questionSection = document.getElementById('question');
const congratulationsSection = document.getElementById('congratulations');

yesBtn.addEventListener('click', () => {
    questionSection.style.display = 'none';
    congratulationsSection.style.display = 'block';
});

function moveButton(event) {
    const containerWidth = questionSection.offsetWidth;
    const buttonWidth = noBtn.offsetWidth;
    const containerHeight = questionSection.offsetHeight;
    const buttonHeight = noBtn.offsetHeight;

    const maxX = containerWidth - buttonWidth;
    const maxY = containerHeight - buttonHeight;

    let randomX, randomY;
    let cursorX, cursorY;

    if (event.type === 'mouseover') {
        cursorX = event.clientX - questionSection.offsetLeft;
        cursorY = event.clientY - questionSection.offsetTop;
    } else if (event.type === 'touchstart') {
        cursorX = event.touches[0].clientX - questionSection.offsetLeft;
        cursorY = event.touches[0].clientY - questionSection.offsetTop;
    }

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

function handleMove(event) {
    moveButton(event);
}

function isTouchDevice() {
    return (('ontouchstart' in window) ||
           (navigator.maxTouchPoints > 0) ||
           (navigator.msMaxTouchPoints > 0));
}


if (isTouchDevice()) {
    noBtn.addEventListener('touchstart', handleMove);
} else {
    noBtn.addEventListener('mouseover', handleMove);
}

// Новая функция для отображения сообщения "Промах!"
function showMissedMessage() {
    // Создаем контейнер для сообщения
    const messageContainer = document.createElement('div');
    messageContainer.id = 'missedMessageContainer';
    messageContainer.textContent = 'ХУЙ ТЕБЕ!';

    // Добавляем контейнер в body
    document.body.appendChild(messageContainer);

    // Запускаем анимацию
    messageContainer.classList.add('show');

    // Удаляем сообщение через некоторое время
    setTimeout(() => {
        messageContainer.classList.remove('show'); // Запускаем анимацию исчезновения

        setTimeout(() => {
            document.body.removeChild(messageContainer); // Удаляем элемент
        }, 300); // Ждем окончания анимации исчезновения
    }, 1000); // Сообщение отображается в течение 1 секунды
}

noBtn.addEventListener('click', (event) => {
    event.preventDefault();
    showMissedMessage(); // Вызываем функцию для отображения сообщения
});
