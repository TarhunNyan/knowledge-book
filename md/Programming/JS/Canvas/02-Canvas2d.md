# Canvas 2d

В 2d рисование происходит от левого верхнего угла. Холст прозрачен

Рисование происходит двумя способами:
- rect(прмоугольники)
- path(котнуры)


# rect

Всего три функции, с одинаковым набором аргументов

````js 
// Закрашенный прямоугольник
ctx.fillRect(x, y, width, height);

// Контур прямоугольника
ctx.strokeRect(x, y, width, height);

// Отчистить от пикселей указанную область
ctx.clearRect(x, y, width, height);
````

# path

Принцип рисования

- Определяем цвета(стиль)
- Рисуем контур
- Закрываем контур(или не закрываем)
- Делаем обводку либо заливку

## Комманды начала и завершения path

Создание

````js 
// Создаем новый контур
beginPath() 
````

Закрытие контура(прямая из начала в конец)

````js 
ctx.closePath()
````

Завершение

````js 
// Рисуем фигуру с обводкой
ctx.stroke()
// Рисуем фигуру с заливкой
// Авоматически закрывает контур
ctx.fill()
````

## Комманды рисования

Двигаем "перо" без рисования

````js 
ctx.moveTo(x, y)
````

Рисуем прямую из текущего положения, до указаной точки в абсолютных координатах

````js 
ctx.lineTo(x, y)
````

Рисуем дугу

````js 
// x, y - точка центра окружности. Абсолютные координаты
// radius - радиус окружности
// startAngle, endAngle - углы начала и конца в радианах
// anticlockwise - в какую сторону двигаемся. По умолчанию по хожу движения часовой стрелки
ctx.arc(x, y, startAngle, endAngle, anticlockwise);

ctx.arc(60, 50, Math.PI, 3 / 4 * Math.PI, true)
````

Рисуем дугу через две контрольные точки и радиус

````js 
// x1, y1 - первая точка
// x2, y2 - вторая точка
// radius - радиус
ctx.arcTo(x1, y1, x2, y2, radius)
````

## Кривые Безье

Квадратичная (2-ого порядка). Рисуе тпараболу

````js 
// начальная точка это точка текущего положения
// cp1x, cp1y - координаты контрольной точки
// x, y - конечная точка
ctx.quadraticCurveTo(cp1x, cp1y, x, y)
````

Кубическая (3-его порядка)

````js 
// начальная точка это точка текущего положения
// cp1x, cp1y - координаты 1-ой контрольной точки
// cp2x, cp2y - координаты 2-ой контрольной точки
// x, y - конечная точка
ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
````

Разница между квадратичной и кубической кривыйми

![Кадратичеая и кубическая кривые Безье](./source/canvas-curves.png)

## Используем Path из SVG

Через Path2D можно применить путь из SVG

````js 
var p = new Path2D("M10 10 h 80 v 80 h -80 Z");
````

## Сохранить объекты

Есть два способа сохранить изображаемый объект

Классический через функцию

````js 
function draw() {
    var cnavas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    roundedRect(ctx, 100, 100, 40, 40, 10);
}

function roundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x, y + radius);
  ctx.arcTo(x, y + height, x + radius, y + height, radius);
  ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
  ctx.arcTo(x + width, y, x + width - radius, y, radius);
  ctx.arcTo(x, y, x, y + radius, radius);
  ctx.stroke();
}
````

Используя Path2D

````js 
function draw() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    var rectangle = new Path2D();
    rectangle.rect(10, 10, 50, 50);

    var circle = new Path2D();
    circle.moveTo(125, 35);
    circle.arc(100, 35, 25, 0, 2 * Math.PI);

    ctx.stroke(rectangle);
    ctx.fill(circle);
}
````

# Стили и цвета

## fillStyle и strokeStyle

<color> - строка как CSS <color>

Устаналиваем стиль заполнения

````js 
ctx.fillStyle = <color>
````

Устаналиваем стиль заполнения

````js 
ctx.strokeStyle = <color>
````

Устанавливаем alpha канал для всех последующий fill и stroke

````js 
ctx.globalAlpha = 0.5;
````

## Настройка стиля линий

Ширина линии

````js 
ctx.lineWidth = 2;
````

Вид начала и конца линий

````js 
// Соответствует началу и концу path
ctx.lineCap = "butt";

// Скругленные начало и конец
ctx.lineCap = "round";

// Начало и конец квадратные. Выходят за пределы path
ctx.lineCap = "square";
````

Вид углов линий

````js 
// Скругляет углы
ctx.lineJoin = "round";

// Четко отсекает по конусу
ctx.lineJoin = "bevel";

// Продляет пока не получится острый треугольник
ctx.lineJoin = "miter";
````

Устанавливаем/Получаем пунктир

````js 
ctx.setLineDash([5, 4]);
ctx.getLineDash();
````

Устанавливаем сдвиг пунктира

````js 
ctx.lineDashOffset = 2;
````

## Градиент

Линейный Градиент

````js 
// x1, y1 - точка откуда начинается градиент
// x2, y2 - точка где заканчивается градиент
createLinearGradient(x1, y1, x2, y2);

// Пример
var linearGradient = ctx.createLinearGradient(0, 0, 150, 150);
linearGradient.addColorStop(0.0, 'white');
linearGradient.addColorStop(0.2, '#26C000');
linearGradient.addColorStop(1.0, 'black');

ctx.fillStyle = linearGradient;
ctx.strokeStyle = linearGradient;
````

Радиальный градиент

````js 
// x1, y1 - точка откуда начинается градиент
// r1 - радиус окружности начала градиента
// x2, y2 - точка где заканчивается градиент
// r2 - радиус окружности конца градиента
createRadialGrdient(x1, y1, r1, x2, y2, r2);

// Пример
var radialGradient = ctx.createRadialGrdient(0, 0, 150, 150);
radialGradient.addColorStop(0.0, 'white');
radialGradient.addColorStop(0.2, '#26C000');
radialGradient.addColorStop(1.0, 'black');

ctx.fillStyle = radialGradient;
ctx.strokeStyle = radialGradient;
````

# Text

## Узнать размеры выводимого текста

Настроив шрифты текст можно узнать сколько этот текст будет занимать места на экране

````js 
ctx.measureText("text is here");
````

## Шрифт текста

````js 
ctx.font = "20px Times New Roman";
````

## Цвет текста

````js 
ctx.fillStyle = "black";
````

## Выравнивание текста

Горизонтальное выравнивание текста

````js 
ctx.textAlign = "start" | "end" | "left" | "right" | "center";
````

Вертикальное выравнивание по базовым линиям

````js 
ctx.textBaseLine = "top" | "handing" | "middle" | "alphabetic" | "ideographic" | "bottom";
````

![Базовые линии](./source/baselines.png)

## Напраление текста

````js 
// оп умолчанию inherit
ctx.direction = "ltr" | "rtl" | "inherit";
````

## Вывод текста

````js 
// text - выводимый текст
// x, y - позиция текста
// [maxWidth] - максимальная ширина выводимого текста

ctx.fillText(text, x, y, maxWidth);
ctx.strokeText(text, x, y, maxWidth);
````

# Тень

Тень работает для пути, если выводим через stroke и для всего обекта если через fill

Работает на rect, path и text

## Настройка тени 

````js
ctx.shadowOffsetX = 2;
ctx.shadowOffsetY = 2;
ctx.shadowBlur = 2;
ctx.shaowColor = "rgba(0, 0, 0, 0.5);
````

# Изображения

Изображение можно получить через:

- HTMLImageElement
- SVGImageElement
- HTMLVieoElement
- HTMLCanvasElement
- ImageBitmap
- OffscreenCanvas
- VideoFrame

## HTMLImageElement

Через JS, с подгрузкой. По сути мы создаем HTMLElement типа img, но не пихаем в DOM: 

````js 
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const img = new Image();
img.onload = function() {
    ctx.drawImage(img, 0, 0);
}
img.src = "../img/imgName.png";
````

## Отобразить изображение

Отобразить изображение в точке (x, y)

````js 
drawImage(image, x, y);
````

Отобразить изображение в точке (x, y) с указанными высотой и шириной

````js 
drawImage(image, x, y, width, height);
````

Взять часть избражения из точки (sx, sy) с шириной sWidth и высотой sHeight. И разместить в точке (dx, dy) и шириной dWidth и высотой dHeight

````js 
drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWith, dHeight);
````

# Clip (маска)

Можно рисовать только в пределах выбранного контура. Для этого нужно как обычно описывать path, а потом вызвать clip. Все последующие рисунки будут в пределах вызванного clip. Сбрасываетс только через restore или новым clip

````js 
ctx.clip()
````

# Трансформация

У canvas есть состояние и его можно сохранить. К состоянию относятся:

- translate, rotate и scale у canvas
- все настройки (цвет, шрифт, ширина, тени и т.д.)
- [clipping path](#)

## Сохраняем и восстанаиливаем состояние

Сохраняет и восстанавлиает состояния по принципу классического стека

````js 
// Сохранить состояние
ctx.save();

// Восстановить состояние
ctx.restore();
````

## Трансформации

Сдвиг

````js 
ctx.translate(x, y);
````

Поворот в радианах по часовой

````js 
ctx.rotate(angle);
````

Масштаб (отрицательный работает как "отражение")

````js 
ctx.scale(x, y);
````

Матричное преобразоание (перемножение текущей матрицы на указанную)

$$
\left[
\begin{array}{ccc} 
a & c & e \\ 
b & d & f \\ 
0 & 0 & 1 
\end{array}
\right]
$$

````js 
ctx.transform(a, b, c, d, e, f);
````

Матричное преобразование (задаем матрицу)

````js 
ctx.setTransform(a, b, c, d, e, f);
````

Возвращаем стандартое преобразоание:

````js 
ctx.resetTransform();
````

# Анимация

Для анимация создается функция отрисовки. И вызывается с каки-то интервалом. Для этого можно использовать: 
- setInterval(function, delay)
- setTimeout(function, delay)
- requestAnimationFrame(callback) - имеет преимущество перед другими вариантами, так как вызывается браузером только когда он готов к отрисовке. Функция специально создана для анимаций

Примеры:

[Солнечная система](./example/01-SolarSystem.html)
