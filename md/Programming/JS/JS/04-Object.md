# Object

## Получить ключи/значения

Возвращаеи массив со всеми свойстами(ключами), у которых [enumerable=true](#defineProperty)

````js
// Получить свойства(ключи)
Object.keys( obj );
````

````js 
// Получить значения
Object.values( obj );
````

````js
// Получить ключи и значения
for (const [key, value] of Object.entries(obj)) {
    console.log(`${key}: ${value}`);
}
````

## Использовать this в аттрибуте функции

Важно чтобы функция была не стрелочной, тогда все работает

````js
obj = { 
    val: "some val",
    run: function () { return this.val }
}

console.log(obj.run);
````

## toString, valueOf

Примитивы преобразуются так:  

Что ожидает js              | => |String                            |Number                        |Boolean                |null  |undefined  |
|:--                        |:-- |:--                               |:--                           |:--                    |:--   |:--        |
|Ожидает строку             | => | -                                |"0"                           |"true"                 |"Null"|"undefined"|
|Ожидает число              | => |"\t123\n" => 123, "text" => NaN   | -                            |true => 1, false => 0  |0     |NaN        |
|Ожидает логическое значение| => |"" => false, остальное => true    |0 => false, остальное => true | -                     |false |false      |


Преобразование объекта в примитив вызывается автоматически многими встроенными функциями и операторами, которые ожидают примитив в качестве значения.

Существует всего 3 типа (хинта) для этого:

- "string" (для alert и других операций, которым нужна строка)
- "number" (для математических операций)
- "default" (для некоторых других операторов, обычно объекты реализуют его как "number")
Спецификация явно описывает для каждого оператора, какой ему следует использовать хинт.

Алгоритм преобразования таков:

1. Сначала вызывается метод obj\[Symbol.toPrimitive\](hint), если он существует,
1. В случае, если хинт равен "string"
    - происходит попытка вызвать obj.toString() или obj.valueOf(), смотря что есть.
1. В случае, если хинт равен "number" или "default"
    - происходит попытка вызвать obj.valueOf() или obj.toString(), смотря что есть.

Все эти методы должны возвращать примитив (если определены)

## instanceOf

Проверить тип объекта

````js 
console.log(obj instanceOf String)
// => true или false
````

## typeof

Возвращает тип объекта

````js 
let variable = 10;
console.log( typeof variable);
// => "number"
````

|Тип                |Результат typeof   |
|:------------------|:------------------|
|undefined          |"undefined"        |
|Null               |"object"           |
|Boolean            |"boolean"          |
|Number             |"number"           |
|String             |"string"           |
|Symbol             |"symbol"           |
|function           |"function"         |
|любой другой тип   |"object"           |

## target

Можно сделать обработку как функции так и как конструктора

````js 
function Constructor() {
    if( !new.target ) { console.log(" Это функция ") }
    else { console.log(" Это конструктор ") }
}

Constructor();
// => Это функция
new Constructor();
// => Это конструктор
````

## Иттерируемый объект

Кастомный иттерируемый объект 

````js 
var iterable = {
  [Symbol.iterator]() {
    return {
      i: 0,
      next() {
        if (this.i < 3) {
          return { value: this.i++, done: false };
        }
        return { value: undefined, done: true };
      }
    };
  }
};

for (var value of iterable) {
  console.log(value);
}
// => 0, 1, 2
````

# Уникальные идентификаторы(Symbol)

## Основное использование

Чтобы у объекто(например из библиотеки) не пересекались имена, используется примитив Symbol. Он создает уникальные идентификаторы, так еще и скрытый

````js 
let id = Symbol("Description here");
let name = Symbol("name is here");

let obj = {
    [name]: "Vasia"
}
obj[id] = 20;

console.log( id.description );
// => Description here
console.log( obj[id] );
// => 20
console.log( Object.keys(obj) );
// => []
console.log( Object.getOwnPropertyNames(obj) );
// => []
console.log( Object.getOwnPropertySymbols(obj) );
// => [ Symbol(id) ]
````

## Глобальный реестр

````js 
// Создаем Symbol в глобальном реестре
Symbol.for("id");
// Считываем его
let id = Symbol.for("id description");

// Получаем description
console.log( Symbol.keyFor(id) );
// => id description
````

# Работа со свойстами

## defineProperty

Задает новый аттрибут, а третье свойство задает поведение аттрибута. В нем прописываются свойства типа такого:

````js 
let obj = { prop: "value" }
Object.defineProperty(obj, "prop2", {
    // значение аттрибута
    value: "Value",
    // запретить присвоение типа obj.prop2=
    writable: false,
    // запретить удаление типа delete obj.prop2
    configurable: false,

    // спрятать свйоство от Object.keys или for ... in
    // но свойство спокойно вызывается
    // сокрытие как у встроенных функций
    // Object.getOwnPropertyNames вернет все свойства включая этот
    enumerable: false,

    // геттер и сеттер
    // с ними нельзя задавать одновременно value и writable
    get: function prop2() { ... },
    set: function prop2( value ) { ... },
});
````

## defineProperties

Как [defineProperty](#defineProperty), только задается сразу несколько свойств

````js 
Object.defineProperties( obj, {
    firstProp: { 
        value: "Value"
    },
    secondProp: { ... },
    thirdProp: {
        get: function() { ... }
    }
});
````

## getOwnPropertyNames

Работает как Object.keys, но возвращает все свойства, вне зависисмости от значения [enumerable](#defineProperty)

````js 
Object.getOwnPropertyNames( obj );
````

## getOwnPropertySymbols

Работает как Object.keys, но возвращает только [симольные свойства](#уникальные-идентификаторыsymbol)

````js 
Object.getOwnPropertyNames( obj );
````

## getOwnPropertyDescriptor

Получаем descriptor атрибута. То бишь то, что в [defineProperty](#defineProperty) задается третим параметром 

````js 
Object.getOwnPropertyDescriptor( obj, 'propName');
````

## hasOwnProperty

Возвращает логическое значение, указывающее, содержит ли объект указанное свойство как прямое свойство этого объекта, а не унаследованное через цепочку прототипов

````js 
let obj = { a:100 };
console.log( obj.hasOwnProperty("a") );
// => true
````

## Запрет на добаление/удаление/изменение объекта

Запрещает добавление свойств в объект

````js
Object.preventExtnsions(obj);
// проверяет запрет
Object.isExtensible(obj);
````

Запрещает добавление и удаление свойств

````js 
Object.seal(obj);
// проверяет запрет
Object.isSealed(obj);
````

Запрещает добаление, удаление и изменение свойств

````js 
Object.freeze(obj);
// проверяет запрет
Object.isFrozen(obj);
````

## Копировать свойства

Копирует все [enumerable](#defineProperty) свойства из объектов в объект 

````js 
const obj1 = { a:1, b:1, c:1 };
const obj2 = { d:2, e: { c: 0 }};

// Копируем свойства из obj1 и obj2 в новый объект
// Результат записываем в obj3
// Копиия не глубокая и obj3.e.c содержит ссылку
const obj3 = Object.assign({}, obj1, obj2);

console.log( obj3 );
// => { a:1, b:1, c:1, d:2, e: { c:0 }}
````

Коипрование через Spread(оператор расширения)

````js 
const obj1 = { a:1, b:1, c:1 };
const obj2 = { d:2, e: { c: 0 }};

// Копируем свойства из obj1 и obj2 в новый объект
// Результат записываем в obj3
// Копиия не глубокая и obj3.e.c содержит ссылку
const obj3 = { ...obj1, ...boj2 };

console.log( obj3 );
// => { a:1, b:1, c:1, d:2, e: { c:0 }}
````

# Setter и getter

Смотри [defineProperty](#define-property)  
Смотри второй пример в [Class](#class)  

Или вот так:

````js
var user = {
    firstName: "Вася",
    surname: "Петров",

    get fullName() {
      return this.firstName + ' ' + this.surname;
    },

    set fullName(value) {
      var split = value.split(' ');
      this.firstName = split[0];
      this.surname = split[1];
    }
};
````

# Prototypes

Все не очень сложно, хоть и немного запутано. Итак, у каждого объекта(кроме undefine) есть свойство __`__proto__`__:

- Что такое __`__proto__`__? 
    - Ссылка на объект
- Откуда берется __`__proto__`__? 
    - Копируется из аттрибута __prototype__ функции конструктора
- Зачем нужен __`__proto__`__? 
    - Если у объекта нет аттрибута, он берется у объекта из __`__proto__`__. А поскольку __`__proto__`__ это объект, к нему это правило так же применяется. И идет дальше по всей цепочке

## Является ли прототипом

Проверяем, у checkObj в цепочке прототипов присутствует obj.prototype?

````js 
console.log(
    obj.prototype.isPrototypeOf( checkObj )
);
// => true
````

Проверяем, у checkObj в цепочке прототипов присутствует obj.prototype?

````js 
console.log(checkObj instanceOf obj.prototype);
// => true
````

## Пример

````js
function constructorFunc() {
    this.someVariable = "value"
}
constructorFunc.prototype = { ok: 200 }

const obj = new constructorFunc();

console.log( obj.someVariable )
// => "value"
console.log( obj.ok )
// => 200
console.log( obj.__proto__ )
// => { ok: 200 }
console.log( obj.__proto__ === constructorFunc.prototype )
// => true
````

Изменив __prototype__ старые объекты не изменятся, а новые объекты будут ссылаться на другой объект

````js
function constructorFunc() {
    this.someVariable = "value"
}
constructorFunc.prototype = { ok: 200 }

const obj = new constructorFunc();

constructorFunc.prototype = { ok: 400 }
const newObj = new constructorFunc();

console.log( obj.ok )
// => 200
console.log( newObj.ok )
// => 400
````

Изменив __`__proto__`__ старые объект изменятся, а новые объекты нет    

````js
function constructorFunc() {
    this.someVariable = "value"
}
constructorFunc.prototype = { ok: 200 }

const obj = new constructorFunc();
obj.__proto__ = { ok: 400 }

const newObj = new constructorFunc();

console.log( obj.ok )
// => 400
console.log( newObj.ok )
// => 200
````

# Class

Чисто синтаксический сахар, но знать надо

````js
class Person {

    // список свойств для упрощения чтения кода
    name;

    // конструктор вызываемый new
    constructor(name) {
        this.name = name;
    }
}

class Lena extends Person {
    
    // приватная переменная. Доступно только внутри класса
    #year;
    
    constructor() {
        // super вызывает конструктор предка применительно к текущему объекту
        super('Lena')
        this.#year = 1990;
    }
    
    // приватная функция. Доступно только внутри класса
    #somePrivateMethod() {
        console.log('You called me?');
    }

    // getter и stter
    get firstName() { ... }
    set firstName( value ) { ... }

    // static block - срабатывает один раз, как обычный код 
    static {
        coonsole.log("ok");
    }
}

let person = new Person('Vova');
let lena = new Lena();

console.log( person.name )
// => Vova
console.log( lena.name )
// => Lena

console.log( lena.year )
console.log( lena.#year )
// => ERROR
````

# Proxy

Очень крутая штука. Но появилась недавно. На MDN написано, что node.js поддерживает Proxy начиная с версии 6, а она вышла в 2019 году, так что уже наверное не новая

Позволяет перехатывать вызовы свойств объектов, и обрабатывать даже не существующие вызовы. Дико пригодилось в создании [конвертера физических величин]()

````js 
let target = { ... };
target = new Proxy( target, handler );
````

В handler настраиваем что перехатыать, а что нет 

## get 

set и get обладают особенностью, которая срабатывает на setter и getter. Дополнительное свойство reieve

Пример с перехватом всех свойств:

````js
let numbers = [1, 2, 3];

// если элемента нет, то вернет 0
numbers = new Proxy( numbers, {
    get(target, prop) {
        if(prop in target) { return target[prop]; }
        else { return 0; }
    },
});

console.log( numbers[1] );
// => 2
console.log( numbers[123124122] );
// => 0
````

## set 

set и get обладают особенностью, которая срабатывает на setter и getter. Дополнительное свойство reieve

Пример перехвата всех записей (возвращать true/false - обязательно)

````js 
let numbers = [];

// теперь numbers принимает только числа
numbers = new Proxy(numbers, {
    set(target, prop, value) {
        if(typeof value === "number") {
            target[prop] = value;
            return true;
        } else { return false; }
    },
});
````

## ownKeys (Object.keys)

Вернет те записи, которые в return (Object.keys проверяет флаг enumerable, поэтому несуществущих свойст не врнет. Смотри [getOwnPropertyDescriptor](#getOwnPropertyDescriptor-defineProperty)

````js 
let user = {
    name: "Vasia",
    age: 30,
    _password: "*****",
};

// вернет все свойства начинающиеся не с _
user = new Proxy(user, {
    ownKeys(target) {
        return Object.keys(target).filter((key) => {
            return !key.strtsWith('_');
        });
    },
});

console.log( Object.keys(user) );
// => ["name, "age"]
````

## getOwnPropertyDescriptor (defineProperty)

Подсунет другой дескриптор

````js 
let user = {
    name: "Vasia",
    age: 30,
    _password: "*****",
};

// Только a, b и c
user = new Proxy(user, {
    ownKeys(target) {
        return ['a', 'b', 'c'];
    },

    getOwnPropertyDescriptor(target, pop) {
        return {
            enumerable: true,
            configurable: true
        }
    }
});

console.log( Object.keys(user) );
// => ["a", "b", "c"]
````

## Полный список значений handler

|Значение|Внутренний метод|Что вызывает|
|:--|:--|:--|
|get                |[[Get]]                |Чтение свойства
|set                |[[Set]]                |Запись свойства
|has                |[[HasProperty]]        |Оператор in
|deleteProperty     |[[Delete]]             |Оператор delete
|apply              |[[Call]]               |Вызов функции
|construct          |[[Construct]]          |Оператор new
|getPrototypeOf     |[[GetPrototypeOf]]     |Object.getPrototypeOf
|setPrototypeOf     |[[SetPrototypeOf]]     |Object.setPrototypeOf
|isExtensible       |[[IsExtensible]]       |Object.isExtensible
|preventExtensions  |[[PreventExtensions]]  |Object.preventExtensions
|defineProperty     |[[DefineProperty]]     |Object.defineProperty, Object.defineProperties
|getOwnProperty     |[[GetOwnProperty]]     |Object.getOwnPropertyDescriptor, for ... in, Object.keys/values/entries
|ownKeys            |[[OwnPropertyKeys]]    |Object.getOwnPropertyNames, Object.getOwnPropertySymbols, for ... in, Object.keys/values/entries 

## revoke(очистка)

Дело в том, что сборщик муосра не может удалить объект, поскольку есть на него ссылка в Proxy. Функция revoke, отвязывает объект от прокси и сборщик его удалит. В примере используется weakMap, ссылки хранящиеся в нем - игнорируются сборщиком мусора

````js
let revokes = new WeakMap();

let object = {
  data: "Важные данные"
};

let {proxy, revoke} = Proxy.revocable(object, {});

revokes.set(proxy, revoke);

// ..позже в коде..
revoke = revokes.get(proxy);
revoke();

alert(proxy.data); // Ошибка (прокси отключён
````
