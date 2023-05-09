var acorn = require("./acorn2"); 


let acornOptions = {ecmaVersion: 2020};
// let res2 = `
// a=20, ((x) => 20*x )(10) |> a=20 |> b=100
// c+=100;`;
let res2 = `
20 |> transform( %% ) |> func2( a, b, %%, %%+1 );
c+=100;`;


function compile( code ) {
    let AST;
    AST = acorn.parse(code, acornOptions);
    console.log(AST.body);
    console.log(AST.body[0].body[1].expression.arguments);
    console.log( res2.slice(18, 20) );
};
compile( res2 );
