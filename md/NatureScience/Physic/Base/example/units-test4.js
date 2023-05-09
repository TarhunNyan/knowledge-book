
const listPhysicPrefix = {
    m: "метр",
    g: "(килло)грамм",
    s: "с",
    K: "кельин",
    A: "ампер",
    mol: "моль",
    cd: "канделы"
};

const listMetricPrefix = {
    u:0, 
    da:1, h: 2, k: 3, M:   6, G: 9, T: 12, P: 15, E: 18, Z: 21, Y: 24, R: 27, Q: 30, 
    d:-1, c:-2, m:-3, mc: -6, n:-9, p:-12, f:-15, a:-18, z:-21, y:-24, r:-27, q:-30
    
}
const converterMetricPrefix = {
    __proto__: listMetricPrefix,
    convert: function( value, prefix, newPrefix ) {
        let base = this[prefix] - this[newPrefix]
        return value * (10 ** base);
    }

}

const getterMetricPrefix = {
    __proto__: converterMetricPrefix,
    getPrefixGenerator: function( prefix ) {
        return function() {
            let value = this.value;
            if( this.prefix===undefined) {
                this.prefix = prefix;
            } else {
                value = getterMetricPrefix.__proto__.convert( value, this.prefix, prefix );
            }
            return new this.constructor( value, prefix );
        }
    }
}
for(let i=0, keys=Object.keys(listMetricPrefix); i<keys.length; i++) {
    let prefix = keys[i];
    Object.defineProperty(getterMetricPrefix, prefix, {
        get: getterMetricPrefix.getPrefixGenerator( prefix )
    })
}
function Num( value, prefix ) {
    this.value = value | 0;
    this.prefix = prefix;
    this.constructor = Num;
}
Num.prototype = getterMetricPrefix;



let AB = new Num(10);
console.log( AB );
console.log( AB.k );
console.log( AB.u );
console.log( AB.k );
console.log( AB.h );
AB = AB.h;
console.log( AB.h );
