# JEST

JS библиотека для тестирования

## Базовое описание

Библиотека использует три базовых понятия:

-   Tests - сами тесты, в которых делаем конкретную проверку
-   Test Suites - набор тестов, которые объеденины программистом по какому-то признаку
-   Shapshot - снимок html. Хранит файлик с которым потом сравнивает во время тестироваия и если не совпадает, то выдает ошибку

Также показывает console.log, которые были вызваны во время проведения тестов. Очень удобно

# Настройка

## Базовая настройка

Скачиваем jest:

```bash
npm install --save-dev jest
```

Добавляем комманду для тестирования в package.json:

```json
{
    ...,
    "scripts": {
        "test": "jest"
    },
    ...
}
```

Запускаем:

```bash
npm run test
```

# Запуск

## Запуск всех тестов

В проекте создаются файлы типа:

```bash
file_name.test.js
```

И когда мы запускаем JEST:

```bash
jest
```

Находит все .test.js и запускает их:

```bash
...
Test Suites: 0 passed, 0 total
Tests:       0 passed, 0 total
Snapshots:   0 total
Time:        0.001 s
```

## Запуск одного файла

Запускаем один тестовый файл:

```bash
jest ./path_to/filename.test.js
```

## Запуск тестов по шаблону

Запускаем всех файлов с именем my-test.js:

```bash
jest my-test
```

# Проведение тестирования

## Создание теста

За проведение теста отвечает test, сокращенно it:

```js
test("Текст выводящийся при тестирование", () => {
	expect(test_function(test_data)).toBe(expect_data);
});
```

При тестировании асинхронного запроса, можно добавить необязательный параметр - время ожидания ответа:

```js
test(
    'Текст ...',
    () => { ... },
    0.5
)
```

## Проводим только один Test

Если падает Test и естьподозрения что в этом виноваты другие тесты, то используй only:

```js
test( 'test1', () => { ... } );
test.only( 'test2', () => { ... } );
test( 'test3', () => { ... } );
```

## Создание набора тестов

Можно создать одно окружение сразу для нескольких тестов и обращаться к нему. Для этого используй describe:

```js
describe("Текст набора тестов", () => {
	const testCase = [
		{
			input: "hello",
			output: "olleh",
		},
		{
			input: "text",
			output: "txet",
		},
	];
	testCase.forEach((el) => {
		test(testCase.input, () => {
			testFunc(el.input).toBe(el.output);
		});
	});
});
```

# Функции проверки

Для проведения тестов, получившееся значение лежащее в expect нужно сравнить с ожидаемым. Для этого в JEST сузествует свой набор функций

## Сравнение примитивов

Равенство примитивов, toBe:

```js
expect(test_func(test_data)).toBe(expect_data);
```

Проверка ключей проверяемого объекта, toBe:

```js
expect(test_func(test_data).test_key).toBe(expect_data);
```

Проверка float на равенство, toBeCloseTo:

```js
expect(test_func(test_data)).toBeCloseTo(expect_data, expect_digits);
```

Математические сравнения:

| Функция                 | Математический аналог |
| :---------------------- | :-------------------- |
| .toBeGreaterThan        | >                     |
| .toBeGreaterThanOrEqual | >=                    |
| .toBeLess               | <                     |
| .toBeLessThanOrEqual    | <=                    |

## Логические операции

Отрицание результата, not:

```js
expect(test_func(test_data)).not.toBe(expect_data);
```

Проверка на то, является ли:

| Имя функции    | Чем является результат                            |
| :------------- | :------------------------------------------------ |
| .toBeNull      | Является ли null                                  |
| .toBeUndefined | Является ли undefied                              |
| .toBeDefined   | Является ли НЕ undefied                           |
| .toBeTruthy    | Является ли НЕ: 0, '', [], false, null, undefined |
| .toBeFalsy     | Является ли: 0, '', [], false, null, undefined    |

## Сравнение строк

Проверка соответствия строки регулярному выражению:

```js
expect("Вася").toMatch(/ася/);
```

## Сравнение коллекций

Сравнение коллекций. Делает рекурсивные проверки для array и object, функция toEqual:

```js
expect(test_func(test_data)).toEqual(expect_data);
```

Содержит ли массив или иттерируемый объект значение, toContain:

```js
const arr = ["milk", "dipers"];
expect(arr).toContain("milk");
```

## Функции

Была ли функция вообще вызвана, toHaveBeenCalled:

```js
const func = jest.fn();
func();
expect(func).toHaveBeenCalled();
```

Проверяет, сколько раз функция бала вызвана, toHaveBeenCalledTimes:

```js
const func = jest.fn();
func();
expect(func).toHaveBeenCalledTimes(1);
```

## Исключения

Проаерка возврата ошибки, toTrow:

```js
expect(() => test_func()).toThrow();
expect(() => test_func()).toThrow("Error text");
expect(() => test_func()).toThrow(/regexp for text error/);
```

## Асинхронные код

Проверить resolves:

```js
expect(test_func(test_data)).resolves.toBe(expect_data);
```

Проверить rejects:

```js
expect(test_func(test_data)).rejects.toBe(expect_data);
```
