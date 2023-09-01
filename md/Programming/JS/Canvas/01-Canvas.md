# Canvas

Благодаря Canvas мы можем рисовать с помощью Javascript

|Статья                                             |Примеры                                                  |
|:--------------------------------------------------|:--------------------------------------------------------|
|[Супер база. Canvas и 2d графика](./02-Canvas2d.md)|[Солнечная система](./example/01-SolarSystem.html)       |
|                                                   |[Просмоторщик изображений](./example/02-ImageViewer.html)|



## Создание Canvas

В HTML создаем элемент в котором будем рисовать. Размеры элемента определяются как у обычного блока

````html
<canvas id="current-canvas">
    Ваш браузер не поддрерживает Canvas
</canvas>
````

Получаем Canvas в Javascript

````js
var canvas = getElementById("current-canvas");
````

Получаем контекст. Совсем не очевидно, почему мы делаем так, но все просто. Мы выбираем, что Canvas будет отображать:
- [2d](./02-Canvas2d.md)
- 3d
- bitmap

````js 
// Контекст для рисоания векторной графики
var ctx = canvas.getContext("2d");

// Контекст для рисоания 3d графики
// webgl2 более современный чем webgl
var ctx = canvas.getContext("webgl");
var ctx = canvas.getContext("webgl2");

// Контекст для рисоания растровых изображений(?)
var ctx = canvas.getContext("bitmaprenderer");
````

