# Асинхронность в JS

В JS есть много моментов, когда надо дождаться чего-то. Например загрузки данных, конца таймера и т.д. Но JS все делается в один поток. Чтобы все не тормозило есть асинхронность. Это когда ты указываешь функции, что она может начать выполняться послк какого-то события

# Callback

Пример для подражания

Есть API асинхронных функций. Они принимают на вход функцию, которую вызовут по происшествии какого-то события

````js
setTime( 
    () => { console.log("Прошло 2.5 секунды")},
    2500
)
````

Единственный способ использовать вложенную асинхронность - использовать Callback внутри Callback'а. Это приводит к проблеме которую называют: __Callback Hell__

# Promise

Был создан чтобы рещить проблемы вложенности которые имелись у Callback'ов. У этой проблемы даже имя название есть: __Callback Hell__

Когда мы доходим до __new Promise( ... )__, то функция внутри __new Promise( ... )__ запускается во втором "потоке", а в "первом" мы спускаемся по коду дальше.

Функция которую мы прописываем в new Promise, должна принимать __resolve__ и __reject__:
- resolve( data ) - НЕ завершает работу функции. Просто передает data в качестве аргумента функции указанной в .then
- reject( reason ) - НЕ завершает работу функции. Просто передает reason в качестве аргумента функции указанной в .then

## Общий синтаксис:
````javascript
new Promise((resolve, reject) => {
    // Код, оканчание работы которого мы ждем
    // resolve( data ); - перекинет data в блок then
    // reject( reason ); - перекинет reason в блок catch
}).then(( data ) => {
    // Код выше отработал
    // Обрабатываем переданные нам данные(data)
}).catch(( reason ) => {
    // Код выдал ошибку
    // Обрабатываем причину(reason) ошибки
}).finally(() => {
    // Код который срабатывает всегда
    // Вне зависимости от ошибок
});
````

## then

- Блоков __then__ может быть сколько угодно
- __return__ передает данные в следующий блок __then__
````js
new Promise((resolve, reject) => {
    // Код, оканчание работы которого мы ждем
}).then(( data ) => {
    // Код выше отработал
    return data;
}).then(( data ) => {
    // Код выше отработал
    return data;
}).then(( data ) => {
    // Код выше отработал
    return data;
})
````
## catch

- Блоков __catch__ может быть сколько угодно
- Если в каком-то блоке __then__ произошла ошибка/reject, то все последующие блоки __then__ пропускаются, пока не дойдем до __catch__. Блоки finally не пропускаются
- __return__ передает данные в следующий блок __then__

````js
new Promise((resolve, reject) => {
    // Код, оканчание работы которого мы ждем
    reject(reason)
}).then(( data ) => {
    // Пропускаетя, т.к. выше сработал reject
    return data;
}).finally(() => {
    // Пофиг на reject и error все равно исполняется
}).catch(( data ) => {
    // Код выше отработал
    return data;
})
````

## finally

- Блоков __finally__ может быть сколько угодно
- Даже при ошибках/reject - не пропускается
- В него ничего не передается. Ни из response ни из reject
- Сам ничего не передает, но и другим не мешает

# Promise - вложенность

Вложенность построенна на том, что если функция в .then/.catch возвращает Promise, то он подставляется за место текущего

Пример:
````js
new Promise((resolve, reject) => {
    setTimeout(() => resolve("Прошла 1 сек"), 1000)
}).then((data) => {
    console.log( data )
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve("Прошло еще 1 сек"), 1000)
    })
}).then((data) => {
    console.log( data )
    return new Promise((resolve, reject) => {
        setTimeout(() => reject("Вызываем ошибк спустя 1 сек"), 1000)
    })
}).catch(console.log)
````

## Promise.all и Promise.race

Ждет когда ВСЕ промисы в списке исполнятся

````js
async function displayContent() {
    // Запускаем асинхронные функции
    let coffee = fetchAndDecode('coffee.jpg', 'blob');
    let tea = fetchAndDecode('tea.jpg', 'blob');
    let description = fetchAndDecode('description.txt', 'text');

    // Ждем выполнения всех асинхронных функций
    let values = await Promise.all([coffee, tea, description])
}
````

Ждет когда ХОТЬ ОДИН промис в списке исполнятся

````js
async function displayContent() {
    // Запускаем асинхронные функции
    let coffee = fetchAndDecode('coffee.jpg', 'blob');
    let tea = fetchAndDecode('tea.jpg', 'blob');
    let description = fetchAndDecode('description.txt', 'text');

    // Ждем выполнения одной асинхронных функций
    let values = await Promise.race([coffee, tea, description])
}
````

# async/await

## async

Создан чтобы писать асинхронный код в синхронном стиле

Ключевое слово __async__ создает обертку вокруг функции. Эта обертка является __Promise__. Поэтому можно писать вот так:
````js
async function hello() { return "Hello" };
hello().then(console.log)
>> Hello
````

## await

Заставляет браузер ждать завершения работы __async__ функции

````js
async function hello() {
    const greeting = await Promise.resolve("Hello");
    return greeting;
};

hello().then(console.log);
````

## Await. Возможная проблема

Не оптимальный вариант

Ждем поочередного исполнения каждого Promise. То есть последовательно:
````js

async function timeTest() {
    // Запускаем 1 промис. Ждем исполнения 1 промиса
    const timeoutPromise1 = await timeoutPromise(3000);
    // Потом. Запускаем 2 промис. Ждем исполнения 2 промиса
    const timeoutPromise2 = await timeoutPromise(3000);
    // Потом. Запускаем 3 промис. Ждем исполнения 3 промиса
    const timeoutPromise3 = await timeoutPromise(3000);
}
````
Оптимальный вариант

Сначало запускаем все промисы, а потом ждем их исполнения. То есть параллельно:
````js
async function timeTest() {
    // Запускаем 1
    const timeoutPromise1 = timeoutPromise(3000);
    // Запускаем 2 промис
    const timeoutPromise2 = timeoutPromise(3000);
    // Запускаем 3 промис
    const timeoutPromise3 = timeoutPromise(3000);

    // Пока ждем, исполненяются сразу все промисы
    await timeoutPromise1;
    await timeoutPromise2;
    await timeoutPromise3;
}
````