# Задать event элементу

Внутри HTML. Не рекомендуется

````html
<p onclick="() => { console.log("OK") }"> ... </p>
````

Через JS

````javascript
p.addEventListener("click", () => {});
````

# Универсальные события

## Загрузка страницы

Срабатывает по окончанию загрузки страницы: html, image, style и scripts

````html
onload
````

Закрытие страницы

````html
onunload
````

## Клик мышкой

Клик левой кнопной мышки

````html
onclick
````

Двойной клик левой кнопкой мышки

````html
ondblclick
````

Кнопка нажата

````html
onmousedown
````

Кнопка отпущена

````html
onmouseup
````

Нажата кнопка на клаиатуре

````html
keypress
````

## Попадание мышки на элемент

Мышь "попала" на элемент

````html
onmouseover
````

Мышь движется находясь на элементе

````html
onmousemove
````

Мышь "вышла" с элемента

````html
onmouseout
````

## Фокус

Элемент получил фокус

````html
onfocuse
````

Элемент потерял фокус

````html
onblur
````

## События формы

В форме выделен текст

````html
onselect
````

В форме изменен текст

````html
onchange
````

Кнопка reset нажата на форме

````html
onreset
````

Кнопка подтвержления нажата на форме

````html
onsubmit
````
