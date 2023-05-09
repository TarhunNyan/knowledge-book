function Lngs( lng ) { 
    let parent = this.__proto__;
    let list = parent.list;
    let index = list.indexOf( lng );
    if( index===-1 ) {
        list.push( lng );
        index = list.length - 1;
    }
    parent.lastIndex = index;
    return parent; 
}
Lngs.prototype = Languages;
Lngs.list = ["en"];
Lngs.currentIndex = 0;
Lngs.lastIndex = 0;

// console.log( Lngs );
// => { list: ["en"], currentIndex: 0, lastIndex: 0 }
// console.log( new Lngs("en") );
// => { list: ["en"], currentIndex: 0, lastIndex: 0 }
// console.log( new Lngs("ru") );
// => { list: ["en", "ru"], currentIndex: 0, lastIndex: 1 }



function physContext( obj ) {
    obj = obj | {};
    let parent = this.__proto__;

    parent.setLng(obj.lng | "ru");


    if( parent.default === undefined ) {
        parent.default = this
    }
}
physContext.prototype = physContext;
physContext.default = undefined;
physContext.setLng = function() {
    new Lngs( this.lng );
    Lngs.currentIndex = lastIndex;
}



function physGroups( obj ) {

}
physGroups.prototype = physGroups;
physGroups.lngs = [];


function physUnit() {}
physDimension.prototype = physDimension;
physDimension.list = [];


function physDimension() {

}
physDimension.prototype = physDimension;
physDimension.list = [];

new physUnit()
    .set("температура", "ru")
    .set("temperature", "en");

new physDimension("temperature")
    .set("кельвин", "К", "ru")
    .set("kelvin", "K", "en")
    .setGroups(["SI"]);
new physDimension("temperature")
    .set("градус", "\\degree C", "ru")
    .set("degree", "\\degree C", "en")
    .setGroups(["SI"]);

TODO: сделать общую языковую логику, унаследовав ее от Lngs

"\\theta": {
    "name": "температура",
    "groups": {
        "СИ": [
            {
                "name": "кельвин",
                "symbol": "К"
            }, 
            {
                "name": "градус",
                "symbol": "\\degree C"
            }
        ]
    }
},





pctx = new physContext();
// new physGroups({"en": "SI", "ru": "СИ"});
