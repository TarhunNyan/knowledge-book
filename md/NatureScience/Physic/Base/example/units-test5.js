
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

const listPrefix = {}
for(let i=0, keysPhysic=Object.keys(listPhysicPrefix); i<keysPhysic.length; i++) {
    const keyP = keysPhysic[i]; 
    const keyPAdict = keyP.length > 1 ? keyP[0].toUpperCase() + keyP.slice(1) : undefined;
    for(let j=0, keysMetric=Object.keys(listMetricPrefix); j<keysPhysic.length; j++) {
        const keyM = keysMetric[j]; 

        let name = keyM + keyP;
        listPrefix[name] = 0;
        if(!keyPAdict){ continue; }

        name = keyM + keyPAdict;
        listPrefix[name] = 0;
    }
}


console.log( listPrefix );

let test = {};
test = new Proxy( test, 
    {
        get(target, phrase) {
            console.log(target);
            console.log(phrase);
            return 'good';
        }
    }
);

console.log( test );
console.log( test.kek );
