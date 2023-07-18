# JSDoc

Почти полная копия javadoc, но для js

По основной задумке, на основе комментариев можно собрать html'ку с документацией. Но можно и просто комменты оставить. Удобненько синергирует с VSCode и другими редакторами

## Базовое использование

````js
/** 
 * Описание функции 
 * @constructor
 * @param {string} param1 Это первый вхожной параметр
 * @param {numeric} param2 А это второй входной параметрпараметр с начальным значением
 * @return {string} Кокатинация param1 и param2
*/
function foo(param1, param2) {
    // ...
    return param1 + param2
}
````

## Ссылки

````js
/**
 * Создаем какое-нибудь значение
 * @typedef {(number|string)} MyClass
 */

/**
 * {@link MyClass} ссылка на класс
 * {@link MyClass#foo} ссылка на аттрибут класса
 * {@link MyClass.foo} ссылка на статический аттрибут. Как я понимаю, речь о Prototype
 * {@link https://github.com GitHub} ссылка на сайт
 */
function someFunction() {
    // ...
}
````

## Необязательные параметры

````js
/** 
 * Описание функции 
 * @constructor
 * @param {numeric} [param1] А это опциональный параметр
 * @param {string} [param2='p4'] А это опциональный параметрпараметр с начальным значением
*/
function foo(param1, param2) {
    // ...
    return param1 + param2
}
````

## Несколько принимаемых типов

````js
/** 
 * Описание функции 
 * @constructor
 * @param {*} param0 Принимает любой тип
 * @param {(numeric|string)} param1 Принимает строку или число
 * @param {(string|string[])} [param2='p4'] Принимает строку или массив строк, да еще начальное значение
 * @param {(numeric|string)[]} [param3] Принимает массив в котором могут быть чилса или строки
*/
function foo(param0, param1, param2='p4', param3) {
    // ...
}
````

## Описание Object и его аттрибутов

````js
/** 
 * Описание функции 
 * @param {Object} obj Это объект. Ниже описываются его параметры
 * @param {string} [obj.name] Имя объекта. Необязательное поле
 * @param {numeric} obj.id Id объекта
 * @param {Object[]} obj.obj массив объектов
 * @param {string} obj.obj[].tittle объект в массиве объектов должен иметь поле tittle
 * @param {numeric} obj.obj[].count объект в массиве объектов должен иметь поле count
*/
function foo(obj) {
    // ...
}
````

## Описание Array и его элементов

````js
/** 
 * @param {(string|string[])} [param0] Принимает строку или массив строк, да еще начальное значение
 * @param {(numeric|string)[]} [param1] Принимает массив в котором могут быть числа или строки
*/
function foo(param0, param1) {
    // ...
}
````

## Typedef

Создает глобальный объект на который можно ссылаться

````js
/**
 * Глобально объявленный тип.
 * @typedef {(number|string)} NumberLike
 */

/**
 * Set the magic number.
 * @param {NumberLike} x - Задаем его параметру
 */
function setMagicNumber(x) {
}
````

В typedef также можно использовать @param как это сделано в [примере](#описание-object-и-его-аттрибутов)

## Callback

````js
/**
 * Это callback. Его имя тип `requestCallback`. Отображается как глобальный symbol
 *
 * @callback requestCallback
 * @param {number} responseCode Описание первого принимаего аргумента
 * @param {string} responseMessage Второй аргумент callback'а
 */

/**
 * Функция которая что-то делает и принимает callback
 * @param {requestCallback} cb - функция Callback. Указывается шлобальный тип
 */
function doSomethingAsynchronously(cb) {
    // code
};
````

## Указываем тип (мягкая типизация)

Обычная типизация

````js
/**
 * @type {string}
 */
var a;
````

Типизация объекта. (вопросик делает аттрибут не обязательным)

````js
/**
 * @type {{
 *      array: (string|numeric)[],
 *      tittle?: (string),
 *      obj: {
 *          id: (numeric)
 *      }
 * }}
 */
var a;
````

Если использовать typeScript то будут подсказки исходя из типов описанных в комментариях к переменным. Чтобы заработало, добавь специальный комментарий в начале файла:

````js
// @ts-check
````

## Штуки которые мне показались полезными




Указываем что функцию следует применять с __new__
````js
/**
 * @class
 * @classdesc it's class description
 */
````

Указываем константу и значение по умолчанию

````js
/**
 * @constant {number} red
 * @default 0xff0000
 */
const RED = 0xff0000
````

Пример использования внутри документации

````js
/**
 * @example <caption>Example usage of method1.</caption>
 * // returns 2
 * exFunc(5, 10);
 */
function exFunc(a, b) {
    // ...
};
````

TODO

 ````js
/**
 * @todo На доделать то-то
 * @todo Надо доделать се-то
 */
function exFunc(a, b) {
    // ...
};
````

Описываем генератор

 ````js
/**
 * Generate numbers in the Fibonacci sequence.
 *
 * @generator
 * @function fibonacci
 * @yields {number} The next number in the Fibonacci sequence.
 */
 ````
