
/** 
 * Объект Геометрии. Базовый класс в котором определены статические методы
 */
const oGeometryEntity = {    
    /**
     * Возращает прямоугольник в который вписана фигура
     */
    bounds: function() {
        // TODO прямоугольник должен вернуть
        return 0;
    },

    /**
     * Дистанция от объекта до объекта (от центров)
     */
    distance: function( obj ) {
        let result = obj || 300;
        return result;
    },

    /**
     * Дистанция от периметра до периметра
     */
    distanceTo: function( obj ) {
        let result = obj || 400;
        return result;
    },
};



function GeometryContext( axes ) {
    if(!new.target) { throw Error("Call GeometryContext without new"); }

    // axesList
    Object.defineProperty(this, "axesList", {
        value: [],
        enumerable: false,
        writable: true,
    });

    // axes
    Object.defineProperty(this, "axes", {
        get: function() { return this.axesList; },
        set: function( axes ) {
            this.axesList = [];
            this.addAxes( axes );
        },
    });

    // addAxes
    this.addAxes = function( axes ) {
        for(let i=0; i<axes.length; i++) {
            let axis = axes[i];
            if( this.axesList.indexOf(axis)===-1 ) {
                this.axesList.push(axis); 
            }
        }
    };

    this.addAxes( axes );
};

const context2D = new GeometryContext(['x', 'y']);
console.log( context2D );
console.log( context2D.__proto__ );
process.exit();


/**
 * Объект отвечающий за позицию
 */
const oPosition = {
    // Координатная система относительно которой ведем расчет позиции
    base: undefined,

    axesList: [],

}

function Position() {

}
Position.prototype = oPosition;

console.log(oPosition.axes);
oPosition.axes = ['x'];
console.log(oPosition.axes);
oPosition.axes = ['o', 'y', 'z'];
console.log(oPosition);

oPosition.x = 2;
console.log(oPosition.x);

/**
 * Конструктор позиции
 */ 
function Position(...args) {
    this.coords = args;
    this.dimension = args.length;

//    for(let i=0; i<args.length; i++) {  
//        const name = oPosition.namesOfAxis[i] || oPosition.namesOfAxis.at(-1) + (i - oPosition.namesOfAxis.length + 2);
//        this[name] = args[i]
//    }
};

Position.prototype = oPosition;


const oPoint = {
    __proto__: oGeometryEntity,
//    position: new Position(),
};
oPoint.setName = function( name ) { this.name = name; }


/**
 * Конструктор точки
 */ 
function Point() {
    this.name = undefined;
}
Point.prototype = oPoint;

point = new Point();
point.setName('A');

position = new Position( 1, 2, 3, 4, 400);
console.log(  position );

console.log( Object.keys( point ) );
console.log( Object.getOwnPropertyNames( point ) );
console.log( Object.getOwnPropertySymbols( point ) );
console.log( point.name );
console.log( point.bounds() );
console.log( point.distance() );
