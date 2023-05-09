const metricPrefix = {
    u: {u:0},
    da: {da:0},
    h: {h:0},
    k: {k:0},
    m: {m:0},
    g: {g:0},
    t: {t:0}
};
function Metric() {

}

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
function Units() {

}


const num = { value: 0, base: 0, baseName: "u" }
function Num( value ) {
    // TODO: для метрик и юнитс сделать флаг врйтбл и ридбл
    this.writable = true;
    this.base = num.base;
    this.baseName = num.baseName;
    this.value = value | 0;
};
Num.prototype = metricPrefix;

let AB = new Num(100);
console.log( AB );
console.log( AB );
