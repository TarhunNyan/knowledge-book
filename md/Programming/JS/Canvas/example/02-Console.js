const dictOfKeyCode = {
    leftArrow: 37,
    downArrow: 40,
    rightArrow: 39,
    topArrow: 38,
    backspace: 8,
    enter: 13,
    caps: 20,
    shift: 16,
};

const consoleObj = {
    history: ['Помощь:<br>m - включает перемещение<br>mm - сброс позиции<br>s - включает увеличение<br>ss - сброс зума<br><br>h - прячет сетку<br>u/i/o<br>j/k/l - выбор сектора<br>m/,/.'],
    historyIndex: 0,
    cursorPosition: null,
    commandSelectStart: null,
    keyCode: null,
    keyPress: null,
    flags: {
        shift: false,
        caps: false,
        event: null,
    }
}

/*
 * Устанавливаем флаги
*/
function updateFlags() {
    consoleObj.flags = setFlags(consoleObj.flags);
}

/*
 * Устанавливаем флаги. Чистая функция
*/
function setFlags(flags) {
    flags.caps = getCapsFlag(flags);
    return flags;
}

/*
 * Получаем флаг, в котором указано нажат ли CapsLock
*/
function getCapsFlag(flags) {
    if (flags.event == null) { return false; }
    return flags.event.getModifierState("CapsLock");
}

/*
 * Получаем флаг в котором установлен текущий язык
*/
function getCursorPosition() {
    if (consoleObj.cursorPosition == null) { return getCommand().length; }
    return consoleObj.cursorPosition;
}

/*
 * Скролим консоль вниз
*/
const scrollToBottom = (() => {
    cons = document.getElementById("console");
    return function () {
        cons.scrollTop = cons.scrollHeight;
    }
})();

/*
 * Выводим в консоль
*/
const consoleOutput = (() => {
    cons = document.getElementById("console");
    return function () {
        cons.innerHTML = consoleObj.history.slice(-20, -1).reduce((acc, val) => { return acc + "<br>&nbsp;>>&nbsp;" + val; }, '');
        cons.innerHTML += "<br>" + getCommandPreview();
        scrollToBottom();
    }
})();

/*
 * Вовзращаем текущую команду для вывода в консоль
*/
function getCommand() {
    if (consoleObj.historyIndex != 0) { return consoleObj.history.at(-1 - consoleObj.historyIndex); }
    if (consoleObj.historyIndex === 0) { return consoleObj.history.at(-1); }
}

/*
 * Вовзращаем текущую команду для вывода в консоль
*/
function getCommandPreview() {
    let result = setSelection(getCommand(), getCursorPosition(), consoleObj.commandSelectStart);
    return result;
    // if (consoleObj.historyIndex != 0) { return history.at(historyIndex - 1); }
    // if (consoleObj.historyIndex === 0) { return setSelection(history.at(-1), consoleObj.commandSelectRange); }
}

/*
 * Вовзращаем команду с отрисованным выделением
*/
function setSelection(cmd, cursorPosition, selectionStart) {
    let results = [];

    if (selectionStart == null) {
        results.push(cmd.slice(0, cursorPosition));
        results.push(cmd.at(cursorPosition) || '&nbsp;');
        results.push(cmd.slice(cursorPosition + 1));
    }
    if (selectionStart != null && selectionStart > cursorPosition) {
        results.push(cmd.slice(0, cursorPosition));
        results.push(cmd.slice(cursorPosition, selectionStart + 1));
        results.push(cmd.slice(selectionStart + 1));
    }
    if (selectionStart != null && selectionStart < cursorPosition) {
        results.push(cmd.slice(0, selectionStart));
        results.push(cmd.slice(selectionStart, cursorPosition + 1));
        results.push(cmd.slice(cursorPosition + 1));
    }

    results = results.map((el) => el.replaceAll(' ', '&nbsp;'));
    return results[0] + '<span class="select">' + results[1] + '</span>' + results[2];
}

/*
 * Фокусировка только на консоли
*/
function focusBody() {
    document.body.focus()
}

/*
 * Сдвиагем курсор
*/
function updateConsoleCursor(shift) {
    const commandLength = getCommand().length;
    if (consoleObj.cursorPosition === null) { consoleObj.cursorPosition = commandLength; }
    if (shift != null) { consoleObj.cursorPosition += shift }
    if (consoleObj.cursorPosition >= commandLength) { consoleObj.cursorPosition = null }
    if (consoleObj.cursorPosition < 0) { consoleObj.cursorPosition = 0 }
}


function consoleCommandUpdate(keyCode) {
    console.log(consoleObj);
}

function keyInputDownProcess(e) {
    consoleObj.keyCode = e.keyCode;
    consoleObj.flags.event = e;
    if (e.keyCode === dictOfKeyCode.shift) { consoleObj.flags.shift = true }
    updateFlags();
    consoleUpdateCode();
}

function keyPress(e) {
    consoleObj.keyPress = e.key;
    consoleUpdatePress();
}

function keyInputUpProcess(e) {
    consoleObj.keyCode = e.keyCode;
    consoleObj.flags.event = e;
    if (e.keyCode === dictOfKeyCode.shift) { consoleObj.flags.shift = false }
    updateFlags();
}

function consoleUpdateCode() {
    const keyCode = consoleObj.keyCode;

    if (keyCode === dictOfKeyCode.topArrow) { consoleObj.historyIndex += 1; updateConsoleCursor(0); }
    if (keyCode === dictOfKeyCode.downArrow) { consoleObj.historyIndex -= 1; updateConsoleCursor(0); }
    if (consoleObj.historyIndex >= consoleObj.history.length) { consoleObj.historyIndex = consoleObj.history.length - 1 }
    if (consoleObj.historyIndex < 0) { consoleObj.historyIndex = 0 }

    if ((keyCode === dictOfKeyCode.leftArrow || keyCode === dictOfKeyCode.rightArrow) && consoleObj.flags.shift && consoleObj.commandSelectStart == null) { consoleObj.commandSelectStart = getCursorPosition(); }
    if ((keyCode === dictOfKeyCode.leftArrow || keyCode === dictOfKeyCode.rightArrow) && consoleObj.flags.shift == false) { consoleObj.commandSelectStart = null; }

    if (keyCode === dictOfKeyCode.rightArrow) { updateConsoleCursor(1); }
    if (keyCode === dictOfKeyCode.leftArrow) { updateConsoleCursor(-1); }
    if (keyCode === dictOfKeyCode.backspace) { consoleObj.history[consoleObj.history.length - 1] = editeCommand(); consoleObj.historyIndex = 0; }

    if (keyCode === dictOfKeyCode.enter && consoleObj.historyIndex != 0) { consoleObj.history[consoleObj.history.length - 1] = consoleObj.history.at(-1 - consoleObj.historyIndex); consoleObj.historyIndex = 0; }
    if (keyCode === dictOfKeyCode.enter && consoleObj.historyIndex === 0) { consoleObj.history.push(''); }
    if (keyCode === dictOfKeyCode.enter) { finishCommand(consoleObj.history.at(-2)) };
    consoleCommandUpdate(keyCode);
    consoleOutput();
    drawAll(getCommand());
}

function consoleUpdatePress() {
    let keyPress = consoleObj.keyPress;
    if (keyPress == null) { return; }
    if (keyPress === 'Enter') { return; }
    consoleObj.history[consoleObj.history.length - 1] = editeCommand(keyPress);
    consoleObj.historyIndex = 0;
    consoleObj.keyPress = null;
    consoleOutput();
    drawAll(getCommand());
}

function editeCommand(data = '') {
    let result = getCommand();
    const selectionStart = consoleObj.commandSelectStart;
    const cursor = getCursorPosition();

    if (selectionStart == null && data != '') { updateConsoleCursor(1); return result.slice(0, cursor) + data + result.slice(cursor); }
    if (selectionStart == null && data === '' && cursor > 0 && consoleObj.cursorPosition != null) { updateConsoleCursor(-1); return result.slice(0, cursor - 1) + result.slice(cursor); }
    if (selectionStart == null && data === '' && cursor > 0 && consoleObj.cursorPosition == null) { return result.slice(0, cursor - 1) + result.slice(cursor); }

    if (selectionStart != null && selectionStart < cursor) { consoleObj.commandSelectStart = null; consoleObj.cursorPosition = selectionStart + 1; return result.slice(0, selectionStart) + data + result.slice(cursor + 1); }
    if (selectionStart != null && selectionStart > cursor) { consoleObj.commandSelectStart = null; consoleObj.cursorPosition = cursor + 1; return result.slice(0, cursor) + data + result.slice(selectionStart + 1); }

    return result;
}

if (true) { setTimeout(focusBody, 500); }
if (true) { consoleObj.history.push(''); }
if (true) { document.addEventListener('keydown', keyInputDownProcess) }
if (true) { document.addEventListener('keyup', keyInputUpProcess) }
if (true) { document.addEventListener('input', focusBody) }
if (true) { document.addEventListener('keypress', keyPress) }
if (true) { consoleOutput(); }
