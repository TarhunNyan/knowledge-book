const metricPrefix = {
    u: {u:0},
    da: {da:0},
    h: {h:0},
    k: {k:0},
    M: {M:0},
    G: {G:0},
    T: {T:0}
};
function MetricPrefix() { return metricPrefix; };

const temperatureUnits = {
    C: {C:0},
    K: {K:0}
};
function TemperatureUnits() { return temperatureUnits; };

const massUnits = {
    g: {g:0},
    kg: {kg:0}
};
function MassUnits() { return massUnits; };

const allUnits = new AllUnits(metricPrefix, temperatureUnits, massUnits);
function AllUnits( ...listUnits ) {
    let current = this;
    for(let i=0; i<listUnits.length; i++) {
        let unit = listUnits[i];
        console.log( unit );
        current.__proto__ = unit;
        current = listUnits[i];
    }
    return this;
}

console.log( allUnits );
console.log( allUnits.k );
console.log( allUnits.__proto__ );
console.log( allUnits.__proto__.__proto__ );

process.exit();

// function allUnits() {
//    let res = this.obj;
//    this.obj = undefined;
//    return res; 
//};
allUnits.setObj = function (obj) {
    this.obj = obj;
    return this;
}
allUnits.wrapperSetPrefix = function( prefix ) {
    return function() {
        this.obj.prefix.push( prefix );
        return this;
    };
};
Object.defineProperties(allUnits, {
    // metric prefix
    // математические приставки
    u: { get: allUnits.wrapperSetPrefix("u") },
    da: { get: allUnits.wrapperSetPrefix("da") },
    h: { get: allUnits.wrapperSetPrefix("h") },
    k: { get: allUnits.wrapperSetPrefix("k") },
    // temperature
    // температура
    C: { get: allUnits.wrapperSetPrefix("C") },
    K: { get: allUnits.wrapperSetPrefix("K") },
    // mass
    // масса
    g: { get: allUnits.wrapperSetPrefix("g") },
    kg: { get: allUnits.wrapperSetPrefix("kg") },
});

function Num( value ) {
    this.value = value;
    this.prefix = [];
    return allUnits.setObj( this );
}
Num.prototype = Num;
Num.setMetricPrefix = function( prefix ) {
    this.metricPrefix = prefix;
    return this;
}

console.log( new Num(40).k.C.g() );

// function setPrefix( prefix ) {
//     this.obj.prefix = prefix;
//     return this.obj;  
// };
// 
// setPrefixMap = {
//     get u() { this.obj.prefix = "u"; return this.obj; },
//     get k() { this.obj.prefix = "k"; return this.obj; },
// };
// Object.defineProperty(setPrefixMap, "obj", { enumerable: false })
// 
// setUnitMap = {
//     get T() { this.obj.prefix = "u"; return this.obj; },
//     get k() { this.obj.prefix = "k"; return this.obj; },
// };
// Object.defineProperty(setPrefixMap, "obj", { enumerable: false })
// 
// function Num() {
//     if(!new.target) {
//         const constructor = Num;
//         constructor.setPrefixMap.obj = constructor;
//         return prefixMap;
//     }
// 
// }
// 
// let AB = Num(100);
// let BC = Num(100).k;
// 
// console.log( AB );
// console.log( BC );

