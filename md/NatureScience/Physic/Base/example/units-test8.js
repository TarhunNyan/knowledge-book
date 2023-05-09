class Num {

    constructor( value ) {
        this.value = value;
    };

    __add__(right) { // +
        this.value += right.valueOf();
        return this;
    }

    __sub__(right) { // -
        this.value -= right.valueOf();
        return this;
    }

    __mul__(right) { // *
        this.value *= right.valueOf();
        return this;
    }

    __truediv__(right) { // /
        this.value = this.value / right.valueOf();
        return this;
    }

    __power__(right) { // **
        this.value = this.value ** right.valueOf();
        return this;
    }

    valueOf() {
        return this.value;
    }
}

let A = new Num( 10 );
let B = new Num( 3 );
A.__power__(B);
console.log( A );
