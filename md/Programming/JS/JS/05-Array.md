# Array

## isArray

Проеряем, массив ли это

````js 
let arr = [];
console.log( Array.isArray( arr ));
// => true
````

## of 

Создает массив из указаных значений

````js 
console.log( Array.of("cat", 2, "bar", true) );
// => ["cat", 2, "bar", true]
````

## length

Количество элементов массива

````js 
const arr = [1, 2, 3, 4];
console.log( arr.length );
// => 4
````

## keys и values

````js 
const arr = ['a', 'b', 'c'];
arr[6] = 'd';

console.log(array1.length)
// => 7

const keyIterator = arr.keys();
const valueIterator = arr.values();

for (const key of keyIterator) {
  console.log(key);
}
// => 0, 1, 2, 3, 4, 5, 6

for (const value of valueIterator) {
  console.log(value);
}
// => 'a', 'b', 'c', undefined, undefined, undefined, 'd'
````

# Пройти массив в цикле

## forEach

````js 
const array1 = ['a', 'b', 'c'];
array1.forEach(element => console.log(element));
````

# Получить элемент массива

Стнадартный способ. Не дает получать элементы с конца

````js 
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
console.log( animals[2] );
// => ["bison"]
````

## at

````js 
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
console.log( animals.at(-1) );
// => ["elephant"]
````

# Получить срез массива

## slice 

````js
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(animals.slice(2));
// => ["camel", "duck", "elephant"]

console.log(animals.slice(2, 4));
// => ["camel", "duck"]

console.log(animals.slice(2, -1));
// => ["camel", "duck"]

console.log(animals.slice());
// => ["ant", "bison", "camel", "duck", "elephant"]

console.log(animals.slice(-2));
// => ["duck", "elephant"]
````

# Добавить элемент

## push

Добавить элемент в конец. Мутирует массив

````js
let arr = [1, 2, 3, 4];
arr.push(5);

console.log(arr);
// => [1, 2, 3, 4, 5]
````

## ushift

Добавить элемент в начало. Мутирует массив

````js
let arr = [1, 2, 3, 4];
arr.ushift(0);

console.log(arr);
// => [0, 1, 2, 3, 4]
````

# Удалить элемент

## pop

Удалить элемент в конце. Мутирует массив. Возвращает удаленный элемент

````js
let arr = [1, 2, 3, 4, 5];
arr.pop();

console.log(arr);
// => [1, 2, 3, 4]
````

## shift 

Удалить элемент в начале. Мутирует массив. Возвращает удаленный элемент

````js
let arr = [1, 2, 3, 4, 5];
arr.shift();

console.log(arr);
// => [2, 3, 4, 5]
````

## splice

Удалить все элементы начиная с <n>. Мутирует массив. Возвращает удаленные элементы

````js
const months = ['Jan', 'March', 'April', 'June'];

// Удалить все элементы начиная с 'April'
months.splice(2);
console.log(months);
// => ['Jan', 'March']
````

Удалить <k> элементов начиная с <n>. Мутирует массив. Возвращает удаленные элементы

````js
const months = ['Jan', 'March', 'April', 'June'];

// Удалить 2 элемента начиная с 'March'
months.splice(1, 2);
console.log(months);
// => ['Jan', 'June']
````

# Заменить/Вставить элементы 

## splice

Уже был чуть выше в удалении элементов. Способен также заменять/вставлять элементы. Мутирует массив.

````js
const months = ['September', 'March', 'April', 'January'];

// Удалить 2 элемента начиная с 'March'
// И вставить 'October', 'November', 'December'
months.splice(1, 2, 'October', 'November', 'December');
console.log(months);
// => ['April', 'October', 'November', 'December', 'June']
````

## copyWithin

Последовательно заменяет элементы на те, что в выбраном месте. Не меняет длину массива. Мутирует массив

````js 
const array1 = ['a', 'b', 'c', 'd', 'e'];

// Коипруем на 0 индекс из индекса 3
console.log(array1.copyWithin(0, 3, 4));
// => Array ["d", "b", "c", "d", "e"]

// Копируем на 0 индекс все что с 3 и доконца
console.log(array1.copyWithin(1, 3));
// => Array ["d", "d", "e", "d", "e"]
````

## flatMap

Применяет функцию  каждому элементу массива. После чего,разравнивает его на один уровень

````js 
const arr1 = [1, 2, 1];

const result = arr1.flatMap((num) => (num === 2 ? [2, 2] : 1));
// => [1, 2, 2, 1]
````

# Соединить

## concat 

Соединяет массивы в один. Не мутирует массив

````js 
const array1 = ['a', 'b', 'c'];
const array2 = ['d', 'e', 'f'];
const array3 = array1.concat(array2);

console.log(array2);
// Expected output: Array ["a", "b", "c", "d", "e", "f"]
````

## join 

````js 
const arr = ["Раз", "Два", "Три", "Четыре"];
console.log( arr.join("-") );
// => Раз-Два-Три-Четыре
````

## flat 

Разровнять массив

````js 
const arr1 = [0, 1, 2, [3, 4]];
console.log(arr1.flat());
// => [0, 1, 2, 3, 4]

const arr2 = [0, 1, 2, [[[3, 4]]]];
console.log(arr2.flat(2));
// => [0, 1, 2, [3, 4]]
````

# Поиск элемента

## indexOf

Если не находит элемент, возвращает -1

````js 
const animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo'];

console.log(animals.indexOf('Tiger'));
// => 1
console.log(animals.indexOf('Dodo'));
// => 0
console.log(animals.indexOf('Dodo', 1));
// => 3
console.log(animals.indexOf('UNDEFINED'));
// => -1
````

## lastIndexOf

Поиск с конца. Если не находит элемент, возвращает -1

````js 
const animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo'];

console.log(animals.indexOf('Tiger'));
// => 1
console.log(animals.indexOf('Dodo'));
// => 3
console.log(animals.indexOf('Dodo', 1));
// => 0
console.log(animals.indexOf('UNDEFINED'));
// => -1
````

## find

Ищет элемент, Callback от которого вернет true. Если не находят элемент возвращают undefined

Callback может принимать: 
- element - элемент
- index - индекс элемента
- array - массив который рассматриаем

````js 
const animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo'];

console.log(animals.find((el) => { el.length > 5 }));
// => Penguin
````

## findLast

Ищет элемент, Callback от которого вернет true. Поиск элемента с конца. Callback как у [find](#find). Если не находят элемент возвращают undefined

````js 
const animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo'];

console.log(animals.find((el) => { el.length > 4 }));
// => Penguin
````

## findIndex

Ищет элемент, Callback от которого вернет true. Вернет index. Callback как у [find](#find). Если не находят элемент возвращают -1

````js
const animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo'];

console.log(animals.findIndex((el) => { el.length > 5 })));
// => 2
````

## findLastIndex

Ищет элемент, Callback от которого вернет true. Вернет index. Callback как у [find](#find). Поиск элемента с конца. Если не находят элемент возвращают -1

````js
const animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo'];

console.log(animals.findIndex((el) => { el.length > 4 })));
// => 3
````

## includes

Проверяет есть ли элемент в массиве. Также принимает индекс с которого начинается поиск. Возвращает true или false

````js 
let arr = [1, 2, 3, 4, 2, 6];

console.log( arr.includes(2) );
// => true
console.log( arr.includes(3, 4) );
// => false
````

# Работа с иттераторами

## entries

Возвращает иттератор созданный из массива 

````js
const array1 = ['a', 'b', 'c'];

const iterator1 = array1.entries();

console.log(iterator1.next().value);
// => Array [0, "a"]
// => Array [1, "b"]
// => Array [2, "c"]
````

## keys 

Создает иттератор из клучей массива 

````js 
const array1 = ['a', 'b', 'c'];
const iterator = array1.keys();

for (const key of iterator) {
  console.log(key);
}

// => 0
// => 1
// => 2
````

## from 

Создает массив из Array-like объектов. В том числе из иттераторов

````js 
console.log(Array.from( ittertor );
// => [ ... ]

console.log(Array.from('foo'));
// => ["f", "o", "o"]

console.log(Array.from([1, 2, 3], (x) => x + x));
// => [2, 4, 6]
````

## fromAsync 

Создает массив изасинхронных объектов

````js
const asyncIterable = (async function* () {
  for (let i = 0; i < 5; i++) {
    await new Promise((resolve) => setTimeout(resolve, 10 * i));
    yield i;
  }
})();

Array.fromAsync(asyncIterable).then((array) => console.log(array));
// => [0, 1, 2, 3, 4]
````

# Как в python

## every

Вернет true если все элементы массива пройдя функцию вернут true. Не мутирует массив

````js 
const isBelowThreshold = (currentValue) => currentValue < 40;

const array1 = [1, 30, 39, 29, 10, 13];

console.log(array1.every(isBelowThreshold));
// => true
````

## some

Если хоть один элемент пройдя функцию будет true, то вернет true

````js 
const array1 = [1, 2, 3, 5];
const array2 = [1, 3, 5];
const even = (element) => element % 2 === 0;

console.log(array1.some(even));
// => true
console.log(array2.some(even));
// => false
````

## filter

Пропускает через функцию значения, те что возращают true, возвращаются в виде массива. Не мутирует массив

````js 
const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter(word => word.length > 6);

console.log(result);
// => Array ["exuberant", "destruction", "present"]
````

## sort 

Преобразует значения в текст, а дальше сортирует по алфавиту. Мутирует массив. Может принять функцию для сортировки

Сортируем текст по алфавиту

````js 
const months = ['March', 'Jan', 'Feb', 'Dec'];
months.sort();
console.log(months);
// Expected output: Array ["Dec", "Feb", "Jan", "March"]
````

Сортируем числа по возрастанию

````js
const array1 = [1, 30, 4, 21, 100000];
array1.sort((a, b) => a-b);
console.log(array1);
// Expected output: Array [1, 4, 21, 30, 100000]
````

## map 

Применяем функцию к каждому элементу. Не мутирует массив

````js 
const array1 = [1, 4, 9, 16];
console.log( array1.map(x => x * 2) );
// => [2, 8, 18, 32]
````

## reduce

К элементу и предыдущему результату применяет указанную функцию. Если результата еще не было, то вместо него intialValue

````js 
const array1 = [1, 2, 3, 4];

const initialValue = 0;
const sumWithInitial = array1.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  initialValue
);

console.log(sumWithInitial);
// => 10
````

## reduceRigth

Как [reduce](reduce), но идет с конца

## reverese

Переварачивает массив

```js 
const array1 = ['one', 'two', 'three'];
console.log( array1.reverse() );
// => ["three", "two", "one"]
````

## fill 

Заполняет массив константами

````js
aconst array1 = [1, 2, 3, 4];

console.log(array1.fill(0, 2, 4));
// => [1, 2, 0, 0]

console.log(array1.fill(5, 1));
// => [1, 5, 5, 5]

console.log(array1.fill(6));
// => [6, 6, 6, 6]
````
