# Event

Базовое API от которого наследуются остальные. API с Event очень много, но самые основные ниже

# EventTarget

Позволяет устанавливать события на элементы HTML. Связано с DOM 

# Создаем Event

## new Event

Создаем событие, типа onClick

````js
let options = {
    // если true, то событие всплывает (вызывается у предков, пока не будет кем-то поймано)
    bubbles: true,
    // если true, тогда можно отменить действие по умолчанию
    cacnelable: true,
    // если true, событие может всплыть за пределы ShadowDOM
    compose: true
};
let event = new Event( 'onClick', options );
````

Сгенерироанное событие отличается от "настоящего" свойством isTrusted

````js
let event = new Event( 'onClick', options );
console.log( event.isTrusted );
// => false
````

Пользовательские события должны создаваться через CustomEvent. В отличии от Event, у него есть поле detail, куда записываем кастомные свойства. Это необхожимо чтобы свойства браузерных событий не пересекались с кастомными

```js 
let event = new CustomEvent( 'typeHello', {
    detail: { name: "Vasia" }
});
```

Для некоторых типов событий есть свои специфические конструкторы

````js
let event = new MouseEvent("click", {
    bubbles: true,
    ncelable: true,
    clientX: 100,
    clientY: 100,
});
````


# Зарегестрироать Event

## Через HTML

Не рекомендуется 

````html 
<input value="Click on me" onclick="alert('CLICK')" type="button">
````

## Через DOM 

Не рекомендуется 

````html
<input id="elem" type="button" value="Click on me">
<script>
    let element = document.getElementById("id");
    element.onClick = function() { this.style.color = 'red' };
</script>
````

## addEventListener

В отличии от методо [через HTML](#через-html) и [через DOM](#через-dom), можно назначить несколько обработчико одному событию

````js 
let element = document.getElementById('id');
let action = function( event ) { this.style.color = 'red' }

element.addEventListener( 'onClick', action );
````

Так же дополнительно может принимать объект options

````js 
let options = {
    // 
    capture: true,
    // если true, то удаляется после срабатывания
    once:    true,
    // если true, то никогда не вызоет действие по умолчанию - preventDefault()
    passive: true,
};
element.addEventListener( 'onClick', action, options );
````

# Удалить Event

## removeElementListener

Для уаления нужно передать ссылку на ту же функцию, которую использовали при добавлении. Поэтому если не сохранил ссылку на функцию заранее, то удалить не сможешь

````js 
element.addEventListener( 'onClick', action );
element.removeElementListener( 'onClick', action );
````

# Вызвать Event

## dispatchEvent

Создаем событие, и вызываем его на элементе

````js 
let options = {
    // если true, то событие всплывает (вызывается у предков, пока не будет кем-то поймано)
    bubbles: true,
    // если true, тогда можно отменить действие по умолчанию
    cacnelable: true,
    // если true, событие может всплыть за пределы ShadowDOM
    compose: true
};
let event = new Event( 'onClick', options );

element.dispatchEvent( event );
````
