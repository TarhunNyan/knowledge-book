
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


let Num = {};
Num = new Proxy( Num, {
    get(target, prop) {
        
    },
});

