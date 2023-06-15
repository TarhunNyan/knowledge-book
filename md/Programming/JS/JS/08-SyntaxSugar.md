# Синтаксический сахар

# Обработка undefined

## ||

````js
function example( a ) {
    a = a || 'Value';
    console.log( a );
}

example( 10 );
// => 10

example( undefined );
// => 'Value'
example( 0 );
// => 'Value'
example( false );
// => 'Value'
example( '' );
// => 'Value'
````

## ??

````js
function example( a ) {
    a = a ?? 'Value';
    console.log( a );
}

example( 10 );
// => 10
example( 0 );
// => 0
example( false );
// => false
example( '' );
// => ''

example( undefined );
// => 'Value'
````

