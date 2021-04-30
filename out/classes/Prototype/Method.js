"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Method = void 0;
const Parameter_1 = require("./Parameter");
class Method {
    constructor(_returnType, _name, _params, _lineNum) {
        this.name = _name;
        this.returnType = _returnType;
        this.params = _params;
        this.lineNum = _lineNum;
    }
    createPrototype() {
        //Every function has these 2
        let s = `${this.returnType} ${this.name}(`;
        //If it has parameters, add them after the '('
        this.params.forEach((p) => {
            s += `${p.type}`;
            //If its a pointer, preserve the *
            if (p.name.startsWith('*')) {
                s += ' ';
                for (let i = 0; p.name[i] === '*'; i++) {
                    s += '*';
                }
            }
            //If there are params after this one, put a comma
            if (this.params.indexOf(p) < this.params.length - 1) {
                s += ', ';
            }
        });
        //Finish the prototype
        s += ');\n';
        return s;
    }
    static parseToMethod(line) {
        const text = line.text;
        const [returnType] = text.split(' '); //Return type is seperated by a space
        const paramsStart = text.indexOf('(') + 1; //Params start after the (
        const paramsEnd = text.indexOf(')'); //Params end after the )
        //Function name is after the space, up until the '('
        const functionName = text.slice(text.indexOf(' ') + 1, paramsStart - 1);
        //String of the params
        const paramsList = text.slice(paramsStart, paramsEnd);
        let params = [];
        if (paramsList.length > 0) {
            //Each param is seperated by commas
            params = paramsList.split(', ').map((p) => {
                const [type, pName] = p.split(' '); //Data type and name are seperated by space
                return new Parameter_1.Parameter(type, pName);
            });
        }
        return new Method(returnType, functionName, params, line.lineNumber);
    }
}
exports.Method = Method;
//# sourceMappingURL=Method.js.map