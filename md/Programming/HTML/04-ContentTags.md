# Теги в которые прописыается контент

# Контейнеры без семантики

## <span>

Текстовый контейнер

````html
<span>...</span>
````

## <div>

Блочный контейнер

````html
<div>...<div>
````

# Секции

## <head>

Внутри html, перед body

````
<head> ... </head>
````

Аттрибут profile у head используется для указания Shcema.org. В современном вебе для указания "микроформатов"

````html
<head profile="SchemeName">
    ...
</head>
````

Теги используемые внутри:

|Тег     |Описание|
|:-------|:---|
|link    | |
|meta    | |
|script  | |
|style   | |
|title   | |
|base    | |
|basefont| |
|bgsound | |

# Заголовки, параграфы 

## <h1> ... <h6>

Тексты заголовков

````html
<h1>...</h1>
    ...
<h6>...</h6>
````

## <p>

Параграф

````html
<p>...</p>
````

# Ссылки

## <a>

Ссылка

````html
<a>...</a>
````

Аттрибут href указывает адрес сайта на который переходим:

````html
<a href="http//website.com">
    ...
</a>
````

Аттрибут target принимает одно из 3 значений

`_blank` - загружает страницу в новом окне  
`_self` - загружает страницу в текущем окне  
`_parent` - загружает во frame родитель  
`_top` - отменяет все frame и загружает в текущем окне браузера  

````html
<a href="http//website.com" target="_self">
    ...
</a>
````

Аттрибут download, указывает на то скачиваем ли мы файл на утсройство:

````html
<a href="http//website.com" download="download">
    ...
</a>
````

Ссылки с якорями

````html
<a href="http://site.com/page#idOfElement"> Scroll to element </a>
<a href="#idofelement"> Scroll to element </a>
````

Отправить e-mail
````html
<a href="mailto:address@mail.ru"> Send message </a>
````

Телефон
````html
<a href="tel:+78121111111">(812) 123-45-67</a
````

# Добаление тексту семантики

## <em>

Элемент на котором фокус внимания

````html
<em>...</em>
````

## <strong>

Элемент привлекающий внимение

````html
<strong>...</strong>
````

семантический тег - цитата, inline элемент

````html
<q cite="URL to Author or original">
````

## <abbr>

Аббривиатура, текст с подсказкой

````html
<abbr title="Here text">...</abbr>
````

## <address>

Аддрес автора веб-страницы

````html
<address>...</address>
````

## <blockquote>, <q>

семантический тег - цитата, block элемент

````html
<blockquote cite="URL to Author or original">
````

# Теги оформления текста

## <i>

Italics. Используется для: иностранных слов, тех терминов, определений

````html
<i>...</i>
````

## <b>

Bold. Используется для: ключевых слов, названий продуктов

````html
<b>...</b>
````

## <u>

Underline. Используется для: имен и фамилий, ошибок в написании текста

````html
<u>...</u>
````

# Верхний и нижний индексы

## <sub>

Нижний индекс

````html
<sub>...</sub>
````

## <sup>

Верхнийи индекс

````html
<sup>...</sup>
````

# Преформатированный текст

## <pre>

Преформатированный текст. Пробелы и переносы строк отображаются, так как они стоят внутри тега 

````html
<pre>...</pre>
````

# Оформление кода

## <code>

Блок кода, inline элемент 

````html
<code>...</code>
````

## var

Переменные

````html
<var>...</var>
````

## kbd

Пользоательский ввод

````html
<kbd>...</kbd>
````

## samp

Программный вывод

````html
<samp>...</samp>
````

# Списки

## Список классический: <ol>, <ul>, <li>

Нумерованный список marked list, element of list

````html
<ol> 
    <li>Пункт 1</li>
    <li>Пункт 2</li>
</ol> 
````

Маркироанный список

````html
<ul> 
    <li>Пункт 1</li>
    <li>Пункт 2</li>
</ul> 
````

## Список терминов: <dl>, <dt>, <dd> 

Список терминов
````html
<dl>
    <dt>Термин 1</dt>
    <dd>Определение термина 1</dd>
    <dt>Термин 2</dt>
    <dd>Определение термина 2</dd>
</dl>
````

# Таблица

## Теги таблицы

Главные теги

````html
<!-- Таблица -->
<table>

<!-- Строка -->
<tr>
<!-- Заголовок -->
<th>
<!-- Ячейка -->
<td>
````

Объединить ячейки

````html
<!-- Объединить столбцы -->
colspan="2"
<!-- Объединить строки -->
rowspan="2"
````

Подпись к таблице

````html
<caption>
````

Теги помогающие в создании snipet'ов поисковикам, а так же логическая организация таблицы:

````html
<!-- В него оборачиаются заголвки. Объявляется до <tbody> и <tfooter> -->
<thead>
<!-- Строка внутри этого блока всегда отображается внизу. Объявляется до <tbody> -->
<tfoot> - row inside this block always show below. Before <tbody>
<!-- Рабивает таблицу на логические части. Может быть несколько -->
<tbody>
````

<col> - задает стиль для столбца. Аттрибут span устанавливает для скольких столбцов данный стиль. Прописывается внутри <colgroup>

````html
<colgroup>
    <col class="">
    <col span=2 class="">
    <col class="">
</colgroup>
````

## Классический шаблон

````html
<table>
    <tr>
        <th></th>
        <th></th>
    </tr>
    <tr>
        <td></td>
        <td></td>
    </tr>
</table>
````

## Полный пример таблицы

````html
<table>
    <caption> TableName </cption>
    <colgroup>
        <col class="">
        <col span=2 class="">
        <col class="">
    </colgroup>
    <thead>
        <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
        </tr>
    </thead>
    <tfoot>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    </tfoot>
    <tbody>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    </tbody>
</table
````

## Таблица для пользователей с инвалидностью

Через аттрибут abbr можно задать подскаазку для пользователей с инвалидностью

````html
abbr="Text for disabilities users"
````

Особенность в том, что через аттрибут headers, указываем столбцы и строки к которым относится ячейка

````html
<table>
    <tr>
        <td></td>
        <th id="location">Location</th>
        <th id="date">Date</th>
        <th id="cost">Cost</th>
    </tr>
    <tr>
        <th id="haircut">Haircut</th>
        <td headers="location haircut">Hairdresser</td>
        <td headers="date haircut">12/09</td>
        <td headers="cost haircut">30</td>
    </tr>
</table>
````

Пример через scope. Отличие в том, что поддерживает 2-ух уровневые заголовки

````html
<table>
    <thead>
        <tr>
            <th colspan=2></th>
            <th scope="colgroup" colspan=2>Below wear</th>
            <th scope="colgroup" colspan=3>Top wear</th>
        <tr>
        <tr>
            <td></td>
            <td></td>
            <th scope="col">Jeans</th>
            <th scope="col">Shorts</th>
            <th scope="col">T-shirt</th>
            <th scope="col">Shirt</th>
            <th scope="col">Jacket</th>
        </tr>
    </thead>
    <tbody>
         <tr>
            <th scope="rowgroup" rowspan=3>Russia</th>
            <th scope="row">Moscow</th>
            <td>100</td>
            <td>40</td>
            <td>50</td>
            <td>120</td>
            <td>200</td>
        </tr>
        <tr>
            <th scope="row">st.Petersburg</th>
            <td>90</td>
            <td>30</td>
            <td>40</td>
            <td>110</td>
            <td>190</td>
        </tr>
        <tr>
            <th scope="row">Krasnoyarsk</th>
            <td>45</td>
            <td>20</td>
            <td>10</td>
            <td>80</td>
            <td>250</td>
        </tr>
    </tbody>
</table>
````

# HTML5

Весь HTML5 построен по принципу: "больше семантики, БОГУ СЕМАНТИКИ!!!"

Симантически заголовок для <body>, <article> или <section>

````html
<header>...</header> 
````

Блок навигации по сайту

````html
<nav>...</nav> 
````

Один на странице, внутри уникальный контент страницы

````html
<main>...</main> 
````

Часть страницы, которая самодостаточна без остальной страницы. Например: пост в блоге

````html
<article>...</article> 
````

Часть страницы. Например: миникарта, блок заголовка и т.д.

````html
<section>...</section> 
````

Дополнительная информация Например: словарь, бибилография и т.д.

````html
<aside>...</aside> 
````

Контент в конце страницы, например: атор, дата, контакт или правовая информация

````html
<footer>...</footer> 
````

Медиа-контент внутри <figure>. <figcaption> для описания медиа-контента

````html
<figure>
    <p><img />...</p>
    <figcaption> ... </figcaption>
</figure>
````

Обозначает что внутри дата. Можно для браузера указать дату в аттрибуте datetime, в формате: ГГГГ-ММ-ДДTчч:мм:сс±чч:мм. Буква T означает просто букву T

````html
<time datetime="2020-01-20">20 Juanuary 2020</time>
````

Прогресс бары. Отличаются чисто семантически. <progress> - это прогресс загрузки. <meter> - это измерение чего-либо

````html
<progress value="10" max="100"/>
<meter value="75" min="50" max="100" low="70" high="90"/>
````

# Устаревшие теги

Как <abbr>

````html
<acronym title="Here text">...</acronym>
````

Может создать страницн из нескольких html страниц

````html
<setframe>
````

Нужны для плагинов типа Flash

````html
<object>
<embed>
````

