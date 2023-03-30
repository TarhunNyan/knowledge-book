# Template

````html
<!DOCTYPE html>
<html>
    <head profile="SchemeName">
        <meta name="viewport" content="width=device-width,initial-scale=1">
    </head>
    <body>
    </body>
</html>
````

## Пояснения

Указывает от какие DTD правила определяют XML объекты. Чисто исторически сохранившийся анохронизм

````
<!DOCTYPE html>
````

Весь документ должен быть обернут в этот тег

````html
<html>
    ...
</html>
````

Содержимое этого тега не отображается,  но помагает браузеру правильно работать со строницей и вообще вспомогательный элемент

````html
<head>
    ...
</head>
````

Видимый контент в этом теге. Кстати у него есть аттрибуты(типа цвет, музыка и т.д.), но лучше эти аттрибуты игнорироать

````html
<body>
    ...
</body>
````

Когда мобилки только появились, под них специально не делали сайты. Поэтому они отображали десктопную версию сайта. А чтобы это сделать надо было соврать о размере своего экрана, что они успешно и делали. Этот анохранизм остался с нами до сего дня

Просим телефон не врать о размере соего экрана

````html 
<meta name="viewport" content="width=device-width,initial-scale=1">
````

# Подключение javascript

Скрипт внутри html

````js 
<script type="text/javascript">
    // Пишем скрипт прямо внтури html
</script>
````

Подключаем внешний скрипт

````js 
<script type="text/javascript" src="path-to-file.js"></script>
````

# Подключение CSS

CSS внутри html

````html
<!DOCTYPE html>
<html>
    <head>
        <style>
            <!-- Прописываем стили -->
        </style>
        ...
    </head>
    ...
</html>
````

Подключаем внешний CSS

````html 
<link rel="stylesheet" href="styles.css">
````
