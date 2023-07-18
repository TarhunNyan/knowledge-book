# Structures

# Объяление переменных

## var 

Инициализирует переменную. В текущей области видимости

````js 
var a = 1;
b = 2;

a = b = 3;
````

## let 

Инициализирует переменную. В текущей области видимости

````js 
var a = 1;
b = 2;

a = b = 3;
````

## const

Работает точно так же как и let, за исключением того, что поместив туда ссылку, поменять ее нельзя

````js 
let linkToObject1 = { a: 100 };
let linkToObject2 = { a: 200 };

const LINK = linkToObject1;
// => { a: 100 }

LINK.a = 300;
// => { a: 300 }

LINK = linkToObject2;
// => ERROR
````

## Разница между var и let

Переменные объявленные через var инициализируются до выполнения кода. Их область видимости - вся функция. У let только блок

````js 
(function var_func() {
    var x = "var";

    {
        {
            let x = "let";
            {
                console.log( x );
                // => "let"
            }
            console.log( x );
            // => "let"
        }
        console.log( x );
        // => "var"
    }
    console.log( x );
    // => "var"
})();

console.log( x );
// => ERROR
````


Директива let создает новую переменную каждый раз когда встречается в коде, и хоть имена у переменных одинаквые, это ссылки на разные ячейки памяти 

````js 
let var_list = [];
let let_list = [];
for (let i = 1; i <= 5; i++) {

    var var_j = i;
    let let_j = i;

    var_list.push(function() { console.log(var_j) });
    let_list.push(function() { console.log(let_j) });
}

var_list.forEach(el => el());
// => 5 5 5 5 5
let_list.forEach(el => el());
// => 1 2 3 4 5
````

Объявив внутри цикла for переменную через var, будем видеть переменную и вне блока. С let, только внутри цикла

````js 
for(var i=0; i<5; i++) {};
console.log(i);
// => 5

for(let j=0; j<5; j++) {};
console.log(j);
// => ERROR
````

# Условия

## if ... else 

````js 
if( condition ) {
    ...
} else {
    ...
}
````

## тернарный оператор 

````js 
let a = condition ? if_true : if_false;
````

## switch

````js 
switch (value) {
    case 10:
        // выполнить если value === 10
        break;
    case "ok":
        // выполнить если value === "ok"
        break;
    default:
        // выполнить если ни один случай не подошел
        break;
````

# Циклы

## while

````js 
while ( условие ) { ... }
````

## do ... while ...

````js 
do { ... } while ( условие )
````

## for

````js 
// классика
for(let i=0; i<obj.length; i++) { ... }
// объявление нескольких переменных
for(let i=0, max=obj.length; i<max; i++) { ... }

// цикл без инициализации
for(; i<obj.length; i++) { ... }
// цикл только с услоием
for(; i<obj.length;) { ... }
// бесконечный цикл
for(;;;) { ... }
````

## for ... of 

Обходит иттерируемые объекты. Такие как: Array, String, Map, Object, Set, function\*, DOMCollection, [кастомный иттерируемый объект](./04-Object.md#иттерируемый-объект)

````js
let iterable = [10, 20, 30];

for (const value of iterable) { console.log(value); }
// => 10, 20, 30
````

## for ... in 

Проходить по всем свойста(enumerable не важен) объекта, включая сойства прототипов. Есть некоторые исключения, но они не критичны

````js 
var obj = {a:1, b:2, c:3};

for (var prop in obj) {
  console.log("obj." + prop + " = " + obj[prop]);
}

// => "obj.a = 1"
// => "obj.b = 2"
// => "obj.c = 3"
````

## for await ... for
  
Цикл проходящий по асинхронно этерируемым объектам. В примере создается асинхронный иттератор

````js 
var asyncIterable = {
  [Symbol.asyncIterator]() {
    return {
      i: 0,
      next() {
        if (this.i < 3) {
          return Promise.resolve({ value: this.i++, done: false });
        }

        return Promise.resolve({ done: true });
      }
    };
  }
};

(async function() {
   for await (let num of asyncIterable) {
     console.log(num);
   }
})();

// => 0
// => 1
// => 2
````

## label

Перед циклами можно поставить метки. После, можно break и continue указывать к какому циклу относится команда прерывания

````js 
let data = [
    [ 0,  0,  0,  0,  1,  0],
    [ 0,  0,  1,  0,  0,  0],
    [ 0,  0,  0,  0,  0,  0],
    [ 0,  0,  0,  1,  0,  0],
    [ 1,  0,  0,  0,  0,  0],
    [ 1,  0,  0,  0,  0,  0],
];

labelName: for(let i=0; i<data.length; i++) {
    labelNoUse: for(let j=0; j<data[i].length; j++) {
        if(data[i][j] === 1) {
            continue labelName;
        }
        data[i][j] = -1;
    }
}

console.log( data );
/*
    [-1, -1, -1, -1,  1,  0],
    [-1, -1,  1,  0,  0,  0],
    [-1, -1, -1, -1, -1, -1],
    [-1, -1, -1,  1,  0,  0],
    [ 1,  0,  0,  0,  0,  0],
    [ 1,  0,  0,  0,  0,  0],
*/
````

# Ошибки

## try ... catch ... finally 

````js 
try {
    // блок кода который пытаемся выполнить

    // вызываем ошибку
    throw Error('messge');
} catch(error) {
    // блок кода при пойманной ошибке
    if(error instanceof TypeError) {
        ...
    }
} finally {
    // блок выполняющийся в любом случае
}
````
