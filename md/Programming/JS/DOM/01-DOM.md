# DOM 

Интерфейс веб-документа, который позволяет менять структуру документа через js. Так же можно менять XML. Так же есть API для CSS, называется CSSOM

## HTMLCollection и NodeList

HTMLCollection, при изменении DOM, так же меняется(поиск происходит еще раз). NodeList, как снимок, сделал один раз и ссылка на элемент сохраняется даже елси элемент уже удален. Оба хранят лишь ссылки, поэтому доступ к аттрибутам и т.д. происходит без проблем

NodeList состоит из Node. HTMLCollection состоит из специальных объектов, для каждого tag'а подвезли свой класс

# Получить элемент

## getElementById

Возвращает Element с указанным id, или Null

````js 
document.getElementById("id_of_element");
````

## getElementsByName 

Возвращает NodeList из Element'ов с указанным аттрибутом name

````js 
document.getElementsByName("name_of_element");
````

## getElementsByClassName 

Возвращает HTMLCollection из элементов с указанным аттрибутом class. К элементам можно снова применить getElementsByClassName

````js 
document.getElementsByClassName("name_of_class");
````

## getElementsByTagName 

Возвращает HTMLCollection из элементов с указанным tag. К элементам можно снова применить getElementsByTagName

````js 
document.getElementsByTagName("div");
````

## querySelector

Возвращает Element, первый найденный селектором в DOM. Селектор как в CSS, все селекторы оттуда работают

````js 
doucment.querySelector("div.user-panel:not(.main) [input[name='login']");
````

## querySelectorAll

Возвращает NodeList, в котором все найденные элементы из DOM. Селектор как в CSS, все селекторы оттуда работают

````js 
doucment.querySelectorAll("div.user-panel:not(.main) [input[name='login']");
````

# Получение потомков элемента 

## children 

Возврвщет HTMLCollection, содержащий потомков

````js 
let element = document.getElementById("foo");
for (const child of element.children) { ... }
````

## childNodes

Возврвщет NodeList, содержащий потомков, включая текст и комментарии. Исключительный случай, когда возвращается так называемый живой NodeList. То бишь при измеении в DOM изменится и список элементов

````js 
let element = document.getElementById("foo");
for (const child of element.childNodes) { ... }
````

# Создать элемент

## createElement

Создает новый элемент, и возвращает элемент

````js
const p = document.createElement('p');
document.getElementById('id').appendChild(p);
````

## createDocumentFragment

Используя Fragment, мы не вызываем перерисовку страницы каждый раз. А типа добавлям все за один проход

````js
let fragment = document.createDocumentFragment();
let div      = fragment.createElement("div");
let li       = fragment
    .appendChild( doccument.createElement("section") )
    .appendChild( doccument.createElement("ul") )
    .appendChild( doccument.createElement("li") );

li.textContent = "hello world";

document.body.appendChild( fragment );

// Этот код создаст следующий HTML
// <div></div>
// <section>
//      <ul>
//          <li>hello world</li>
//      </ul>
// </section>
````

# Добавить/Переместить потомка

## appendChild

Добавит созданный элемент

````js
let element = document.createElement("div");
let parent = document.getElementById("parent");
parent.appendChild( element );
````

Переместит element в потомки parent. Поскольу не может быть один элемент в двух местах

````js
let element = document.getElementById("element");
let parent = document.getElementById("parent");
parent.appendChild( element );
````

# Удалить элемент(потомка) из DOM

## removeChild

Удаляет элемент из DOM и возвращет его для дальнеших манипуляций

````js
let deletingElement = document.getElementById("id");
deletingElement.parentNode.removeChild( deletingElement );
````

Удаляем всех потомков

````js 
while(element.firstChild) {
    element.removeChild(element.firstChild);
}
````
