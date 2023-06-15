# Collections

Коллекциибыли добавлены с ES6

# Map

Map отличается от Object тем что:

- Не тащит с собой свойства prototype и дефолтные ключи
- Может содержат клбчи любого типа, а не только строки и символы
- Сохраняет ключи в порядке добавления
- Число элементов подсчитается в свойстве size 
- Иттерируемый


## Когда использовать?

Если часто добавляются и удаляются ключи, то Map твой идеальный выбор

## Инициализируем

Создаем коллекцию в которую потом добавим значения

````js
let map = new Map();
````

Инициализируем с заранее здаными значениями

````js 
let map = new Map([
    ["key1", "value1"],
    ["key2", "value2"],
]);
````

## Добавить элементы

````js
// создаем коллекцию
let map = new Map();

// добавляем элементы
map.set( 'first'            , 20            );
map.set( 'second'           , { prop1: 10 } );
map.set( ['third', 'fourth'], 0             );
````

## Получаем значения
````js
map.get( 'second' );
// => { prop1: 10 }
````

## Проверяем наличие ключа

````js
map.has( 'first' );
// => true
````

## Удаляем

Удаляем элемент

````js
map.delete( 'first' );
// => true 
map.delete( 'undefined' );
// => false
````

Удаляем все элементы 

````js 
map.clear();
````

## Размер коллекции

````js
map.size;
// => 2
````

## Получить ключи/значения 

Получить ключи 

````js 
const map = new Map();

map.set('0', 'foo');
map.set(1, 'bar');

const iterator = map.keys();

iterator.next().value;
// => "0"
iterator.next().value;
// => "1"
````

Получить значения 

````js 
const map = new Map();

map.set('0', 'foo');
map.set(1, 'bar');

const iterator = map.values();

iterator.next().value;
// => "foo"
iterator.next().value;
// => "bar"
````

Получить пары ключ/значение

````js 
const map = new Map();

map.set('0', 'foo');
map.set(1, 'bar');

const iterator = map.entries();

iterator.next().value;
// => ["0", "foo"]
iterator.next().value;
// => [1,   "bar"]
````

## Иттерируемся по коллекции 

Используем for..of 

````js
for (const [key, value] of myMap) {
    console.log(`${key} = ${value}`);
}
````

Используем forEach

````js
myMap.forEach((value, key) => {
    console.log(`${key} = ${value}`);
});
````

## Копируем коллекцию

````js 
let map = new Map([
    [ 1, 100 ],
    [ 2, 0 ],
]);

let clone = new Map( map );
````

## Объединяем коллекции

````js 
let map1 = new Map([
    [ 1, 100 ],
    [ 2, 0 ],
]);

let map2 = new Map([
    [ 2, 100 ],
    [ 3, 0 ],
]);

let merge = new Map( [...map1, ...map2, [4, "ok"]] );

console.log( merge );
// => Map(4) { 1 => 100, 2 => 100, 3 => 0, 4 => "ok" }
````

# Set

# WeakMap

# WeakSet
