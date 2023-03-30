# Array

## Удалить элементы

Удалить все элементы начиная с <n>

````js
const months = ['Jan', 'March', 'April', 'June'];

// Удалить все элементы начиная с 'April'
months.splice(2);
console.log(months);
// => ['Jan', 'March']
````

Удалить <k> элементов начиная с <n>

````js
const months = ['Jan', 'March', 'April', 'June'];

// Удалить 2 элемента начиная с 'March'
months.splice(1, 2);
console.log(months);
// => ['Jan', 'June']
````

Получить удаляемые элементы

````js
const months = ['Jan', 'March', 'April', 'June'];

// Удалить 2 элемента начиная с 'March'
const result = months.splice(1, 2);
console.log(result);
// => ['March', 'April']
````

## Заменить элементы