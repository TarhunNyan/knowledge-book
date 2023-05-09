let obj = require('./metricPrefix.json');
let newObj = {};

obj.forEach(el => {
    let text = el.en.base.toString().valueOf()
    newObj[text] = {
        "en": {
            "name": el.en.name,
            "symbol": el.en.symbol
        }
    }
});

console.log(newObj['-1']);

function isEqual(str1, str2) {
    console.log(str1);
    for (let i = 0; i < str1.length; i++) {
        console.log(str1[i], str2[i]);
        if(str1[i]!=str2[i]) { return false; }
    }
    return true;
}

let text = `дека да 1
гекто г 2
кило к 3
мега М 6
гига Г 9
пико п -12
фемто ф -15
атто а -18
деци д -1
зепто з -21
иокто и -24
санти с -2
мили м -3
микро мк -6
нано н -9
тера Т 12
пета П 15
экса Э 18
зетта з 21
иотта И 24`;

text.split('\n').forEach((el) => {
    fields = el.split(' ');
    Object.getOwnPropertyNames(newObj).forEach((prop) => {
        if(prop === fields[2]) {
            newObj[fields[2]]["ru"] = {
                "name": fields[0],
                "symbol": fields[1]
            };
        }
    })
});

// console.log(newObj);
console.log( JSON.stringify(newObj) );
const {writeFile} = require('../../../../../lib/fileProcess');
writeFile('./units.json', JSON.stringify(newObj));
