const consoleHistory = [];
let currentCommand = '';
let consoleHistoryIndex = 0;
let consoleCurrentCommandIndex = 0;

if(true) { setTimeout( () => focusBody(), 500 ); }
if(true) { consoleHistory.unshift( document.getElementById("console").innerHTML ); }
if(true) { document.addEventListener('keydown', keyInputProcess) }
if(true) { document.addEventListener('input', focusBody) }

function focusBody() {
    document.body.focus()
}

function keyInputProcess( e ) {
    const keyCode = e.keyCode;
    const dictOfKeyCode = {
        leftArrow: 37,
        downArrow: 40,
        rightArrow: 39,
        topArrow: 38,
        backspace: 8,
        enter: 13,
    };
    const el = document.getElementById("console");

    if( keyCode === dictOfKeyCode.topArrow )   { updateCurrentCommandIndex(); return; }
    if( keyCode === dictOfKeyCode.downArrow )  { updateCurrentCommandIndex(); return; }
    if( keyCode === dictOfKeyCode.rightArrow ) { updateCurrentCommandIndex(1); return; }
    if( keyCode === dictOfKeyCode.leftArrow )  { updateCurrentCommandIndex(-1); return; }
    if( keyCode === dictOfKeyCode.backspace )  { return; }
    currentCommandUpdate( keyCode );
    scrollToBottom( el );
}

function updateCurrentCommandIndex( shift ) {
    consoleCurrentCommandIndex += shift;
    if( consoleCurrentCommandIndex >= currentCommand.length ) { consoleCurrentCommandIndex = currentCommand.length; }
    if( shift == null ) { consoleCurrentCommandIndex = currentCommand.length; }
}

function currentCommandUpdate( keyCode ) {
    currentCommand += String.fromCharCode( keyCode );
}

function updateConsoleContent( cons ) {
    const indexFrom = consoleHistory.length - 20;
    let content;
    content = consoleHistory.slice(indexFrom).reduce( (acc, val) => `${acc}&nbsp;>>&nbsp;${val}<br>`, '' );
    content += currentCommand;
    cons.innerHTML = content; 
    updateConsoleSelect( cons );
    
}

function updateConsoleSelect( cons ) {
    if( consoleCurrentCommandIndex < currentCommand.length ) { cons.setSelectionRange( consoleCurrentCommandIndex, consoleCurrentCommandIndex + 1 ) }
}

function scrollToBottom( element ) {
    element.scrollTop = element.scrollHeight;
}
