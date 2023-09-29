# Импорт и экспорт

[topLink]: #импорт-и-экспорт

Импорт и экспорт работает только в Node.js
Все остальное это собранные webpack'ом и исполняемый последовательно js

-   [CommonJS][CommonJS]
-   [ECMAScript][ecmas]

# CommonJS

[CommonJS]: #commonjs

CommonJS это классический вариант. Работает во всех случаях кроме тех, когда работает [ECMAScript][ecmas]. Можно применять в любой части кода и даже делать импорты по условию

## Пример

Структура файлов:

```bash
.
└── Folder
    ├── export.js
    └── index.js
```

**export.js**

```javascript
const text = "test text";
module.exports = text;
```

**index.js**

```javascript
const text = require("./export");
console.log(text);
```

# ECMAScript

[ecmas]: #ecmascriptalsd-as-a-a--dsas-d_asasda

Данный синтаксис работает только если:

-   файлы этого модлуя с разрешение .mjs
-   если в package.json имеется конструкция "type": "module"
-   если в html файле, при импорте имеется конструкция \<script type="module" src="../../...js"\>\<script\>

## Пример

Структура файлов:

```bash
.
└── Folder
    ├── export.js
    └── index.js
```

**export.js**

```javascript
const var_default = "it is text";
export default var_default;
export const var2 = "test text2";
export const var3 = "test text3";
```

**index.js**

```javascript
import vars from "./export.mjs";
```

```javascript
import var_default from "./export.mjs";
```

```javascript
import { default as name } from "./export.mjs";
```

```javascript
import { var2, var3 as name_var3 } from "./export.mjs";
```

```javascript
import var_default, { var2, var3 } from "./export.mjs";
```

```javascript
import * as name_vars from "./export.mjs";
```

```javascript
import var_default, * as name_vars from "./export.mjs";
```

```javascript
// Где-то в коде делаем асинхронный импорт
(async function () {
	const {
		default: name_var_default,
		var2,
		var3,
	} = await import("./export.mjs");
	console.log(`${name_var_default} and ${var2} and ${var3}`);
})();
```
