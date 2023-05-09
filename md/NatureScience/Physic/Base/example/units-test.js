
function Num( value ) {
    if( !new.target ) {
        Num._value = value;
        return Num;
    }
    Object.defineProperty( this, "_value", {
        value: value | 0,
        writable: true,
        enumerable: false
    });

    Object.defineProperty( this, "value", {
        enumerable: false,
        get: function() { return this._value; },
        set: function( value ) {
            if( typeof value === "number" ) {
                this._value=value;
            }
        },
    });
}
Num.prototype = Num;

Object.defineProperty( Num, "_value", {
    value: 0,
    writable: true,
    enumerable: true
});

Object.defineProperty( Num, "u", {
    enumerable: true,
    get: function() { this.prefix = "u"; return this; },
    set: function( value ) {},
});

Object.defineProperty( Num, "k", {
    enumerable: true,
    get: function() { this.prefix = "k"; return this; },
    set: function( value ) {},
});

let AB = Num(2);
console.log(AB);
AB.k;
console.log(AB);


function T( value ) {
    if( !new.target ) {
        T._value = value;
        return T;
    }
    Object.defineProperty( this, "_value", {
        value: value | 0,
        writable: true,
        enumerable: false
    });

    Object.defineProperty( this, "value", {
        enumerable: false,
        get: function() { return this._value; },
        set: function( value ) {
            if( typeof value === "number" ) {
                this._value=value;
            }
        },
    });
}
T.prototype = T;

Object.defineProperty( T, "_value", {
    value: 0,
    writable: true,
    enumerable: true
});

Object.defineProperty(T, "K", {
    enumerable: true,
    get: function() { return this._value; },
    set: function( value ) {
        if( typeof value === "number" ) {
            this._value=value;
        }
    },
});

Object.defineProperty(T, "C", {
    enumerable: true,
    get: function() { return this._value-273; },
    set: function( value ) {
        if( typeof value === "number" ) {
            this._value=value+273;
        }
    },
});

T1 = new T(100);
T2 = new T(200);
T1.value = 3000;

console.log( T(200).K );
console.log( T(200).C );
console.log( T1.C );
console.log( T2.C );
console.log( Object.keys(T) );
