# Отступы

# margin

Внешний отступ. 

````css
/* Может быть отрицательным */
margin: <length>;
/* Задание margin и padding в %, работает так. Берется предок. У него смотрится inline размер(внутренний). От него берется процент */
margin: <precentage>;
/* Отступ: сверху(1), справа(2), снизу(3), слева(4) */
margin: 1px, 2px, 3px, 4px;
````

Отступ сверху/снизу/слева/справа. Работает так же как margin выше

````css
margin-top: ...;
margin-bottom: ...;
margin-left: ...;
margin-right: ...;
````

## Margin collapsing

Это когда margin'ы у top и bottom схлопываются в один. Размер получившегося margin'а равен наибольшему из top и bottom

Схлопывание происходит:
- у соседних элементо "братьев и сестер"
- между родителем и потомком если отсутствуют: padding, border
- у пустых блоков без: padding, border, inline-content

Схлопывание НЕ происходит:
- у float элементов
- у position: absolute элементов

# padding

Внутренний отступ

````css
/* Может быть отрицательным */
padding: <length>;
/* Задание margin и padding в %, работает так. Берется предок. У него смотрится inline размер(внутренний). От него берется процент */
padding: <precentage>;
/* Отступ: сверху(1), справа(2), снизу(3), слева(4) */
padding: 1px, 2px, 3px, 4px;
````

# border

Ниже вместо ... подставляется border-top / border-right / border-bottom / border-left или border(задает параметры сразу сем четырем направлениям)

border это рамка между pading и margin. Border это аттрибут, но у него много свойств:

````css
/* радиус скругления угла по окружности */
...-radius: <length>;
/* радиус скругления угла по элипсу. Первый радиус - горизонтальный, Второй радиус - вертикальный */
...-radius: <length>, <length>;
/* толщина рамки */
...-width: <length>;
/* цвет рамки */
...-color: ;
/* стиль линии. Например solid - сплошная линия */
...-style: none | dotted |  dashed | solid | groove | inset;
````

Сокращенный вариант для свойств выше:

````css
/* Указываем -radius, -style, -color */
...: <length> <style> <color>;
````

Есть некоторые особенности у аттрибута border-radius:

````css
/* Задаем скругление  виде элипса для верхнего-левого(10px 5px) и верхнего-правого углов(25% 100em) */
border-radius: 10px 25% / 5px 100em;
````

# background

Основное свойство:

````css
/* указываем путь до изображение на заднем фоне */ 
background-image: <path>;
/* может так же принимать Gradient в качестве значения */
background-image: linear-gradient(<angle>, <color> 10%, <color> 20px, ...);
background-image: radial-gradiant( ... );
background-image: repeating-linear-gradient( ... );
background-image: repeating-radial-gradient( ... );
background-image: conic-graident( ... );
````

Настройки для изобрежения:

````css
/* фоновый цвет */ 
/* распостраняется на контент и отступы от него */
background-color: <color>; 

/* позиция изображения */
background-position: 20px 10%;
/* так же можно использовать top | right | bottom | left */
/* 20 пикселей от верха и 10 пикселей справа */
background-position: top 20px right 10px;

/* размер картинки на заднем фоне */
background-size: 100px 10%;
/* так же может принимать значение cover(заполнит элемент) и contain(уменьшит изображение так, чтобы поместить в элемент) */
background-size: cover;

/* повторение изображения заднего фона */
background-repeat: no-repeat | repeat-x | repeat-y | repeat;

/* если указан scroll, то прокучивает как обычную картинку */ 
/* fixed прокуручивает так, словно элемент это "окно" смотрящее на background */
background-attacment: sroll | fixed;
````

Все свойства ниже могут через запятую принимать несколько значений. Значения с одинаковым индексом применяются друг к другу. Например:

````css
/* изоюражения image(10px 20px) и image2(200px 0px) */
background-image: url(./image), url(./image2);
background-position: 10px 20px, 200px 0px;
````

Если количество свойств и изображений неравное количество, то свойства зацикливаются. Например:

````css
/* изоюражения image(10px 20px), image2(200px 0px) и image3(10px 20px) */
background-image: url(./image), url(./image2), url(./image3);
background-position: 10px 20px, 200px 0px;
````

# overflow

Определяет видимость контента за пределами блока

````css
/* стандартное значение видимости */
overflow: visible;
/* если контент вылез за пределыконтейнера, то появляется полоса прокрутки */
overflow: auto;
/* если контент вылез за блок, то его не видно */
overflow: hidden;
/* горизонтальная и вертикальная полосы прокрутки */
overflow: scroll;
/* прокрутка по вертикали */
overflow: overflow-y;
/* прокрутка по горизонтали */
overflow: overflow-x;
/* значения по вертикали и по горизонтали отдельно. По горизонтали полоса прокрутки , по вертикали невидно контент */
overflow: scroll hiden;
````

