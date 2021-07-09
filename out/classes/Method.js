"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Method = void 0;
class Method {
    constructor(_returnType, _name, _params, _lineNum) {
        this.name = _name;
        this.returnType = _returnType;
        this.params = _params;
        this.lineNum = _lineNum;
    }
    createPrototype() {
        const s = `${this.returnType} ${this.name}(${this.params.join(', ')});\n`;
        return s;
    }
    static parseToMethod(line) {
        const text = line.text;
        const [returnType] = text.split(' '); // Return type is separated by a space
        const paramsStart = text.indexOf('(') + 1; // Params start after the (
        const paramsEnd = text.lastIndexOf(')'); // Params end after the )
        // Function name is after the space, up until the '('
        const functionName = text.slice(text.indexOf(' ') + 1, paramsStart - 1);
        // String of the params
        const params = text.slice(paramsStart, paramsEnd);
        return new Method(returnType, functionName, params.split(', '), line.lineNumber);
    }
}
exports.Method = Method;
//# sourceMappingURL=Method.js.map