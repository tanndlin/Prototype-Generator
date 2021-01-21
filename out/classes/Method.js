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
        let s = `${this.returnType} ${this.name}(`;
        this.params.forEach((p) => {
            s += `${p.type}`;
            //If its a pointer, preserve it
            if (p.name.startsWith("*")) {
                s += "*";
            }
            //If there are params after this one, put a comma
            if (this.params.indexOf(p) < this.params.length - 1) {
                s += ", ";
            }
        });
        s += ");\n";
        return s;
    }
    static parseToMethod(line) {
        const text = line.text;
        const [returnType] = text.split(" ");
        const paramsStart = text.indexOf("(") + 1;
        const paramsEnd = text.indexOf(")");
        const functionName = text.slice(text.indexOf(" ") + 1, paramsStart - 1);
        const paramsList = text.slice(paramsStart, paramsEnd);
        let params = [];
        if (paramsList.length > 0) {
            params = paramsList.split(", ").map((p) => {
                const [type, pName] = p.split(" ");
                return new Parameter_1.Parameter(type, pName);
            });
        }
        return new Method(returnType, functionName, params, line.lineNumber);
    }
}
exports.Method = Method;
//# sourceMappingURL=Method.js.map