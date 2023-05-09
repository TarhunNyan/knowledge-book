var acorn = require("./acorn"); 

tokTypes = acorn.tokTypes;

tokTypes.star = new acorn.TokenType("*",   {beforeExpr: true, binop: 10});
tokTypes.plusMin = new acorn.TokenType("+/-", {beforeExpr: true, binop: 9, prefix: true, startsExpr: true}),
tokTypes.angel = new acorn.TokenType("∠",   {beforeExpr: true, binop: 10, prefix: true});


tokTypes._pipe = new acorn.TokenType("|>", {keyword: "|>",  beforeExpr: true}); // оператор конвейра. Пример новой инфиксной операции
// acorn.keywordTypes["|>"] = tokTypes._pipe;
// tokTypes.pipeOperator = new acorn.TokenType("|>", {beforeExpr: true, binop: 10}); // оператор конвейра. Пример новой инфиксной операции
// tokTypes.pipeVariable = new acorn.TokenType("pipeVariable"); // оператор конвейра. Результат работы предыдущего выражения

let acornOptions = {ecmaVersion: 2020};
let res2 = `
b+=10 |> a+=2 };
`;

const binaryOperators = {
    ">": "__>__",
    "<": "__<__",

    "∠": "__angle__",

    "+": "__add__",
    "*": "__mul__",
};

acorn.Parser.parsePipeStatement = function() {

  // pp$8.parseVarStatement = function(node, kind) {
  //   this.next();
  //   this.parseVar(node, false, kind);
  //   this.semicolon();
  //   return this.finishNode(node, "VariableDeclaration")
  // };
};

acorn.Parser.prototype.maybeInfix = function( node ) {

};

acorn.Parser.prototype.readToken_angle = function() {
    var next = this.input.charCodeAt(this.pos + 1);
    // if (next === 61) { return this.finishOp(tokTypes.assign, 2) } // ∠=
    // console.log( this.parseMaybeUnary(null, true, false, false) );
    let res = this.finishOp(tokTypes.angel, 1);
    return res;
}

acorn.Parser.prototype.readToken_pipeOperator = function( code ) {
    var next = this.input.charCodeAt(this.pos + 1);
    if (next === 62) // >
    {
        console.log( this.type );
        this.pos += 2;
        debugger;
        return this.finishToken(tokTypes._pipe)
        return this.finishToken(tokTypes.braceL);
        
        this.pos += 2;
        return acorn.Parser.prototype.parseBlock.call(this, true);
        console.log( this.context );
        // let node = this.startNode();
        // node.body = [];
        // this.enterScope(0);
        // while (this.type !== tokTypes.braceR) {
        //     var stmt = this.parseStatement(null);
        //     node.body.push(stmt);
        // }
        // this.next();
        // if (createNewLexicalScope) { this.exitScope(); }
        // return this.finishNode(node, "BlockStatement")

        // this.context.push( new acorn.TokContext("{", false) );
        this.pos += 2;
        return this.finishToken(tokTypes.semi)
    } 
    return this.readToken_pipe_amp(code)
}

acorn.Parser.prototype.readToken_pipeVariable = function() {
    this.start = this.pos;
    let res = this.finishToken(tokTypes.pipeOperator, '%');
    return res;
    return this.readWord1();
    return this.finishOp(tokTypes.pipeVariable, 1)
    return this.readToken_pipe_amp(code)
    // readToken_mult_modulo_exp
}

function wrapperParseExpressionStatement( library ) {
    let parseExpressionStatement = library.Parser.prototype.parseExpressionStatement;
    return function(node, expr) {
        node.expression = expr;
        this.semicolon();
        return this.finishNode(node, "ExpressionStatement")
        node.expression = expr;
        console.log( 'parseExpressionStatement' );
        console.log( node );
        console.log( expr );
    }
};

function wrapperRaise( library ) {
    return function raise(pos, message) {
        var loc = library.getLineInfo(this.input, pos);
        message += " (" + loc.line + ":" + loc.column + ")";
        var err = new SyntaxError(message);
        err.pos = pos; err.loc = loc; err.raisedAt = this.pos;
        err.text = this.input.slice(pos-10, pos) + ' =>' + this.input.charAt(this.pos) + '<= ' + this.input.slice(pos, pos+10);
        throw err
    }
};


// plusMin: new TokenType("+/-", {beforeExpr: true, binop: 9, prefix: true, startsExpr: true}),
function wrapperGetTokenFromCode( library ) {
    let getTokenFromCode = library.Parser.prototype.getTokenFromCode;
    return function(code) {
        switch (code) {
            case 8736: // '∠'
                return this.readToken_angle(code);
            case 124: // '|'
                console.log(this.type);
                return this.readToken_pipeOperator(code);
            case 37: // '%'
                return this.readToken_pipeVariable(code);
        }
        return getTokenFromCode.call( this, code );
    }
};

function wrapperReadNumber( library ) {
    function stringToBigInt(str) {
        if (typeof BigInt !== "function") {
            return null
        }

        // `BigInt(value)` throws syntax error if the string contains numeric separators.
        return BigInt(str.replace(/_/g, ""))
    }

    function stringToNumber(str, isLegacyOctalNumericLiteral) {
        if (isLegacyOctalNumericLiteral) {
            return parseInt(str, 8)
        }

        // `parseFloat(value)` stops parsing at the first numeric separator then returns a wrong value.
        return parseFloat(str.replace(/_/g, ""))
    }

    return function(node, startsWithDot = false) {
        var start = this.pos;
        var end = this.pos;
        switch (this.fullCharCodeAtPos()) {
            case 49: case 50: case 51: case 52: case 53: case 54: case 55: case 56: case 57: // 1-9
                if (!startsWithDot && this.readInt(10, undefined, true) === null) {this.raise(start, "Invalid number");}
                var octal = this.pos - start >= 2 && this.input.charCodeAt(start) === 48;
                if (octal && this.strict) {this.raise(start, "Invalid number");}
                var next = this.input.charCodeAt(this.pos);
                if (!octal && !startsWithDot && this.options.ecmaVersion >= 11 && next === 110) {
                    var val$1 = stringToBigInt(this.input.slice(start, this.pos));
                    ++this.pos;
                    if (library.isIdentifierStart(this.fullCharCodeAtPos())) {this.raise(this.pos, "Identifier directly after number");}
                    return this.finishToken(types$1.num, val$1)
                }
                if (octal && /[89]/.test(this.input.slice(start, this.pos))) {octal = false;}
                if (next === 46 && !octal) { // '.'
                    ++this.pos;
                    this.readInt(10);
                    next = this.input.charCodeAt(this.pos);
                }
                if ((next === 69 || next === 101) && !octal) { // 'eE'
                    next = this.input.charCodeAt(++this.pos);
                    if (next === 43 || next === 45) {++this.pos;} // '+-'
                    if (this.readInt(10) === null) {this.raise(start, "Invalid number");}
                }

                const newLocal = end = this.pos;
                if (library.isIdentifierStart(this.fullCharCodeAtPos())) {
                    this.readWord1();
                    // TODO: записываем рзультат работы readWord1 в node
                }

                var val = stringToNumber(this.input.slice(start, end), octal);
                let res = this.finishToken(acorn.tokTypes.num, val);
        }
    };
};

function wrapperParseStatement ( library ) {
    let parseStatement = library.Parser.prototype.parseStatement;

    return function (context, topLevel, exports) {
        return parseStatement.call( this, context, topLevel, exports);
    };
};

acorn.Parser.prototype.parseExpressionStatement = wrapperParseExpressionStatement( acorn );
acorn.Parser.prototype.readNumber = wrapperReadNumber( acorn );
acorn.Parser.prototype.getTokenFromCode = wrapperGetTokenFromCode( acorn );
acorn.Parser.prototype.raise = wrapperRaise( acorn );
acorn.Parser.prototype.parseStatement = wrapperParseStatement( acorn );



function walkAST( node, type ) {
    if (node) {
        try {
            if( Array.isArray(node) ) {
                return type.ArrayParam( node );
            }
            return type[node.type]( node );
        } catch ( error ) {
            console.log('HERE');
            console.log( `ERROR: unexpect type "${node.type}". walkAST` );
            console.log(node);
            console.log(error);
        }
    }
};

let UpdateNode = {
    
    code: '',
    isDebug: false,
    debug: function( node ) {
        if( this.isDebug ) {
            console.log(`!It is standart update behaviour of ` + node.type);
       }
    },

    replaceCode: function( node, str ) {
        let offset = str.length - ( node.end - node.start );
        this.code = this.code.slice(0, node.start).concat(str, this.code.slice(node.end));
        offset = this.updateLocation( node, offset );
        console.log( "Code\n" + this.code + "---\n" );
        return offset;
    },
    
    updateLength: function( node, length ) {
        node.end += length;
        return length;
    },

    updateOffset: function( node, offset) {
        node.offset = (node.offset ?? 0) + offset;
        node.start += offset;
        node.end += offset;
        return offset;
    },

    updateLocation: function( node, length, offset=0) {
        offset = this.updateOffset( node, offset );
        if( length > 0 ) { length = this.updateLength( node, length ) }
        return offset + length;
    },

    updateNodeLocation: function( node, params ) {
        // let preNode = { ...node };
        params = params.filter( param => node[param]!=null );

        let foo = 0;
        let sum = 0;
        for(let param of params) {
            let elem = node[param];
            this.updateOffset( elem, node.offset + sum );
            foo = walkAST(elem, this);
            sum += foo;
        }
        this.updateLength( node, sum );
        // console.log( preNode );
        // console.log( node );
        return sum;
    },

    ArrayParam: function( node ) {
        let params = [];
        for(let param=0; param<node.length; param++) {
            params.push( param );
        }
        return this.updateNodeLocation( node, params );
    },

    BlockStatement: function( node ) {
        // node.body[]
        return this.updateNodeLocation( node, ["body"] );
    },
    
    Program: function( node ) {
        // node.body[]
        node.offset = 0;
        node.body.map( (newNode) => { 
            this.updateOffset( newNode, node.offset );
            node.offset += walkAST(newNode, this) 
        } );
    },

    PipeStatement: function( node ) {
        //
        console.log( node );
        return node;
    },

    VariableDeclaration: function( node ) {
        // node.declarations[]
        return this.updateNodeLocation( node, ["declarations"] );
    },

    VariableDeclarator: function( node ) {
        // node.id, node.init
        return this.updateNodeLocation( node, ["id", "init"] );
    },

    BreakStatement: function( node ) {
        // node.label
        return this.updateNodeLocation( node, ["label"] );
    },

    ContinueStatement: function( node ) {
        // node.label
        return this.updateNodeLocation( node, ["label"] );
    },

    DebuggerStatement: function( node ) {
        return 0;
    },

    DoWhileStatement: function( node ) {
        // node.body, node.test
        return this.updateNodeLocation( node, ["body", "test"] );
    },

    IfStatement: function( node ) {
        // node.test, node.consequent, node.alternate
        return this.updateNodeLocation( node, ["test", "consequent", "alternate"] );
    },

    ReturnStatement: function( node ) {
        // node.argument
        return this.updateNodeLocation( node, ["argument"] );
    },

    SwitchCase: function( node ) {
        // node.consequent[], node.test
        return this.updateNodeLocation( node, ["consequent", "test"] );
    },

    SwitchStatement: function( node ) {
        // node.discriminant, node.cases[]
        return this.updateNodeLocation( node, ["discriminant", "cases"] );
    },

    ThrowStatement: function( node ) {
        // node.argument
        return this.updateNodeLocation( node, ["argument"] );
    },

    CatchClause: function( node ) {
        // node.param, node.body
        return this.updateNodeLocation( node, ["param", "body"] );
    },

    TryStatement: function( node ) {
        // node.block, node.handler, node.finalizer
        return this.updateNodeLocation( node, ["block", "handler", "finalizer"] );
    },

    WhileStatement: function( node ) {
        // node.test, node.body
        return this.updateNodeLocation( node, ["test", "body"] );
    },

    WithStatement: function( node ) {
        // node.object, node.body
        return this.updateNodeLocation( node, ["object", "body"] );
    },

    EmptyStatement: function( node ) {
        return 0;
    },

    LabeledStatement: function( node ) {
        // node.body, node.label
        return this.updateNodeLocation( node, ["label", "body"] );
        process.exit();
    },

    ForStatement: function( node ) {
        // node.init, node.test, node.update, node.body
        return this.updateNodeLocation( node, ["init", "test", "update", "body"] );
    },

    ForInStatement: function( node ) {
        // node.left, node.right, node.body
        return this.updateNodeLocation( node, ["left", "right", "body"] );
    },

    FunctionDeclaration: function( node ) {
        // node.id, node.params[], node.body
        return this.updateNodeLocation( node, ["id", "params", "body"] );
    },

    ClassBody: function( node ) {
        // node.body
        return this.updateNodeLocation( node, ["body"] );
    },

    ClassDeclaration: function( node ) {
        // node.id, node.superClass, node.body
        return this.updateNodeLocation( node, ["id", "superClass", "body"] );
    },

    ClassExpression: function( node ) {
        console.log( node );
        process.exit();
        // node.left, node.right, node.operator
        return this.updateNodeLocation( node, ["left", "right"] );
    },

    MethodDefinition: function( node ) {
        // node.static, node.computed, node.key, node.kind, node.value
        return this.updateNodeLocation( node, ["key", "value"] );
    },

    PropertyDefinition: function( node ) {
        console.log( node );
        process.exit();
        // node.left, node.right, node.operator
        return this.updateNodeLocation( node, ["left", "right"] );
    },

    StaticBlock: function( node ) {
        console.log( node );
        process.exit();
        // node.left, node.right, node.operator
        return this.updateNodeLocation( node, ["left", "right"] );
    },

    ExportAllDeclaration: function( node ) {
        console.log( node );
        process.exit();
        // node.left, node.right, node.operator
        return this.updateNodeLocation( node, ["left", "right"] );
    },

    ExportDefaultDeclaration: function( node ) {
        console.log( node );
        process.exit();
        // node.left, node.right, node.operator
        return this.updateNodeLocation( node, ["left", "right"] );
    },

    ExportNamedDeclaration: function( node ) {
        console.log( node );
        process.exit();
        // node.left, node.right, node.operator
        return this.updateNodeLocation( node, ["left", "right"] );
    },

    ExportSpecifier: function( node ) {
        console.log( node );
        process.exit();
        // node.left, node.right, node.operator
        return this.updateNodeLocation( node, ["left", "right"] );
    },

    ImportDeclaration: function( node ) {
        console.log( node );
        process.exit();
        // node.left, node.right, node.operator
        return this.updateNodeLocation( node, ["left", "right"] );
    },

    ImportDefaultSpecifier: function( node ) {
        console.log( node );
        process.exit();
        // node.left, node.right, node.operator
        return this.updateNodeLocation( node, ["left", "right"] );
    },

    ImportNamespaceSpecifier: function( node ) {
        console.log( node );
        process.exit();
        // node.left, node.right, node.operator
        return this.updateNodeLocation( node, ["left", "right"] );
    },

    ImportSpecifier: function( node ) {
        console.log( node );
        process.exit();
        // node.left, node.right, node.operator
        return this.updateNodeLocation( node, ["left", "right"] );
    },

    RestElement: function( node ) {
        console.log( node );
        process.exit();
        // node.left, node.right, node.operator
        return this.updateNodeLocation( node, ["left", "right"] );
    },

    ArrayPattern: function( node ) {
        console.log( node );
        process.exit();
        // node.left, node.right, node.operator
        return this.updateNodeLocation( node, ["left", "right"] );
    },

    AssignmentPattern: function( node ) {
        console.log( node );
        process.exit();
        // node.left, node.right, node.operator
        return this.updateNodeLocation( node, ["left", "right"] );
    },

    SequenceExpression: function( node ) {
        console.log( node );
        process.exit();
        // node.left, node.right, node.operator
        return this.updateNodeLocation( node, ["left", "right"] );
    },

    AssignmentExpression: function( node ) {
        // node.left, node.right, node.operator
        return this.updateNodeLocation( node, ["left", "right"] );
    },

    ConditionalExpression: function( node ) {
        console.log( node );
        process.exit();
        // node.left, node.right, node.operator
        return this.updateNodeLocation( node, ["left", "right"] );
    },

    LogicalExpression: function( node ) {
        console.log( node );
        process.exit();
        // node.left, node.right, node.operator
        return this.updateNodeLocation( node, ["left", "right"] );
    },

    UnaryExpression: function( node ) {
        console.log( node );
        // node.operator, node.prefix, node.argument
        return this.updateNodeLocation( node, ["argument"] );
    },

    UpdateExpression: function( node ) {
        // node.operator, node.argument
        return this.updateNodeLocation( node, ["argument"] );
    },

    ChainExpression: function( node ) {
        console.log( node );
        process.exit();
        // node.left, node.right, node.operator
        return this.updateNodeLocation( node, ["left", "right"] );
    },

    MemberExpression: function( node ) {
        // node.object, node.property, node.computed, node.optional
        return this.updateNodeLocation( node, ["object", "property"] );
    },

    CallExpression: function( node ) {
        // node.callee, node.arguments, node.optional
        return this.updateNodeLocation( node, ["callee", "arguments"] );
    },

    TaggedTemplateExpression: function( node ) {
        console.log( node );
        process.exit();
        // node.left, node.right, node.operator
        return this.updateNodeLocation( node, ["left", "right"] );
    },

    Super: function( node ) {
        return 0;
    },

    ThisExpression: function( node ) {
        return 0;
    },

    ArrayExpression: function( node ) {
        console.log( node );
        process.exit();
        // node.left, node.right, node.operator
        return this.updateNodeLocation( node, ["left", "right"] );
    },

    ImportExpression: function( node ) {
        console.log( node );
        process.exit();
        // node.left, node.right, node.operator
        return this.updateNodeLocation( node, ["left", "right"] );
    },

    Literal: function( node ) {
        // node.value, node.raw
        return 0;
        process.exit();
    },

    ParenthesizedExpression: function( node ) {
        console.log( node );
        process.exit();
    },

    MetaProperty: function( node ) {
        console.log( node );
        process.exit();
        // node.left, node.right, node.operator
        return this.updateNodeLocation( node, ["left", "right"] );
    },

    NewExpression: function( node ) {
        // node.callee, node.arguments[]
        return this.updateNodeLocation( node, ["callee", "arguments"] );
    },

    TemplateElement: function( node ) {
        console.log( node );
        process.exit();
        // node.left, node.right, node.operator
        return this.updateNodeLocation( node, ["left", "right"] );
    },

    TemplateLiteral: function( node ) {
        console.log( node );
        process.exit();
        // node.left, node.right, node.operator
        return this.updateNodeLocation( node, ["left", "right"] );
    },

    ObjectPattern: function( node ) {
        console.log( node );
        process.exit();
        // node.left, node.right, node.operator
        return this.updateNodeLocation( node, ["left", "right"] );
    },

    ObjectExpression: function( node ) {
        // node.properties
        return this.updateNodeLocation( node, ["properties"] );
    },

    SpreadElement: function( node ) {
        console.log( node );
        process.exit();
        // node.left, node.right, node.operator
        return this.updateNodeLocation( node, ["left", "right"] );
    },

    Property: function( node ) {
        console.log( node );
        process.exit();
        // node.left, node.right, node.operator
        return this.updateNodeLocation( node, ["left", "right"] );
    },

    FunctionExpression: function( node ) {
        // node.params[], node.body
        return this.updateNodeLocation( node, ["params", "body"] );
        console.log( node );
        process.exit();
        // node.left, node.right, node.operator
        return this.updateNodeLocation( node, ["left", "right"] );
    },

    ArrowFunctionExpression: function( node ) {
        // node.params[], node.body
        return this.updateNodeLocation( node, ["params", "body"] );
    },

    PrivateIdentifier: function( node ) {
        console.log( node );
        process.exit();
        // node.left, node.right, node.operator
        return this.updateNodeLocation( node, ["left", "right"] );
    },

    YieldExpression: function( node ) {
        console.log( node );
        process.exit();
        // node.left, node.right, node.operator
        return this.updateNodeLocation( node, ["left", "right"] );

    },

    AwaitExpression: function( node ) {
        console.log( node );
        process.exit();
        // node.left, node.right, node.operator
        return this.updateNodeLocation( node, ["left", "right"] );
    },

    Identifier: function( node ) {
        // node.name

        // let res = '_' + node.name;
        // let offset = this.replaceCode( node, res );
        // return offset;
        return 0;
    },

    BinaryExpression: function( node ) {
        // node.left, node.right, node.operator
        return this.updateNodeLocation( node, ["left", "right"] );
    },

    ExpressionStatement: function( node ) {
        // node.expression
        return this.updateNodeLocation( node, ["expression"] );
    },
};

let UpdateBinaryExpression = {
    BinaryExpression: function(node) {
        let length = this.__proto__.BinaryExpression.call(this, node);
        
        let binaryOperator = binaryOperators[node.operator];
        if( binaryOperator === undefined ) { throw new Error( `Operator $[node.operator] is have not overloading function in binaryOperators` ); }

        let res = this.code.slice(node.left.start, node.left.end) + '.' + binaryOperator + '(' + this.code.slice(node.right.start, node.right.end) + ')';
        let offset = this.replaceCode( node, res );

        return length + offset;
    }
}
UpdateBinaryExpression.__proto__ = UpdateNode;

let UpdateUnaryExpression = {

    UnaryExpression( node ) {
    }

}
UpdateUnaryExpression.__proto__ = UpdateNode;

function compile( code ) {
    let AST;
    UpdateNode.code = code;

    AST = acorn.parse(UpdateNode.code, acornOptions);
    console.log(AST.body);
    walkAST( AST, UpdateBinaryExpression );

//    AST = acorn.parse(UpdateNode.code, acornOptions);
//    walkAST( AST, UpdateUnaryExpression );
    console.log( UpdateNode.code );
};
UpdateNode.isDebug = false;
compile( res2 );
