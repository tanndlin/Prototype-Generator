"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyCodeLensProvider = void 0;
const vscode = require("vscode");
const PrototypeCreator_1 = require("./Prototype/PrototypeCreator");
class MyCodeLensProvider {
    provideCodeLenses(document) {
        return __awaiter(this, void 0, void 0, function* () {
            const decs = PrototypeCreator_1.PrototypeCreator.getFunctionDeclarations(document);
            const mainLine = decs[0].lineNumber;
            const protos = this._getPrototypes(document, mainLine);
            const lengthLens = decs.map((d, i) => {
                const methodLen = this._getMethodLength(document, d.lineNumber);
                const c = {
                    command: 'prototype-generator.getMethodReport',
                    title: `Lines: ${methodLen}`,
                };
                if (d.text.includes('main')) {
                    return new vscode.CodeLens(d.range, c);
                }
                const pLine = protos[i - 1];
                return new vscode.CodeLens(new vscode.Range(pLine, 0, pLine, 0), c);
            });
            const refLens = decs
                .filter((d) => !d.text.includes('main'))
                .map((d, i) => {
                const refCount = this._getMethodRefCount(document, d.lineNumber);
                const c = {
                    command: 'prototype-generator.getMethodReport',
                    title: `References: ${refCount}`,
                };
                const pLine = protos[i];
                return new vscode.CodeLens(new vscode.Range(pLine, 0, pLine, 0), c);
            });
            return [...lengthLens, ...refLens];
        });
    }
    _getPrototypes(document, mainLine) {
        const lines = [];
        let index = mainLine - 2;
        while (document.lineAt(index).text !== '') {
            lines.push(index);
            index--;
        }
        return lines.reverse();
    }
    _getMethodLength(document, lineNum) {
        let endingLine = lineNum + 1;
        while (PrototypeCreator_1.PrototypeCreator.getIndentLevel(document, endingLine) !== 0) {
            endingLine++;
        }
        return endingLine - lineNum;
    }
    _getMethodRefCount(document, lineNum) {
        let methodName = document
            .lineAt(lineNum)
            .text.replace(new RegExp(/\*/g), '')
            .split(' ')
            .filter((s) => s.includes('('))[0];
        methodName = methodName.slice(0, methodName.indexOf('('));
        if (methodName === 'main') {
            return 0;
        }
        console.log(`Getting refs for ${methodName}`);
        let times = 0;
        for (let i = 0; i < document.lineCount; i++) {
            const text = document.lineAt(i).text;
            if (text.includes(`${methodName}(`) && !text.trim().startsWith('//')) {
                console.log(text, i);
                times++;
            }
        }
        console.log('\n');
        return times - 2;
    }
}
exports.MyCodeLensProvider = MyCodeLensProvider;
//# sourceMappingURL=CodeLensProvider.js.map