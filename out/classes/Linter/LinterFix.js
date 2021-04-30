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
exports.LinterFix = void 0;
const vscode_1 = require("vscode");
class LinterFix {
    static fixConstantViolations(document, lines) {
        return __awaiter(this, void 0, void 0, function* () {
            yield vscode_1.window.showTextDocument(document, 1, false).then((e) => __awaiter(this, void 0, void 0, function* () {
                yield e.edit((edit) => {
                    lines.forEach((line) => {
                        //Generate Correct Name
                        const [, name] = line.text.split(' ');
                        let newName = name;
                        for (let i = 0; i < newName.length; i++) {
                            if (newName[i] !== newName[i].toLowerCase()) {
                                console.log(i);
                                newName = `${newName.slice(0, i)}_${newName.slice(i)}`;
                                i++;
                            }
                        }
                        //Find all occurances of the constant
                        const toChange = [];
                        for (let i = 0; i < document.lineCount; i++) {
                            const l = document.lineAt(i);
                            if (l.text.includes(name)) {
                                toChange.push(l);
                            }
                        }
                        //Change each occurance
                        toChange.forEach((occ) => {
                            const nameIndex = occ.text.indexOf(name);
                            const start = new vscode_1.Position(occ.lineNumber, nameIndex);
                            const end = new vscode_1.Position(occ.lineNumber, nameIndex + name.length);
                            const range = new vscode_1.Range(start, end);
                            edit.replace(range, newName.toUpperCase());
                        });
                    });
                });
            }));
        });
    }
    static fixCurlyViolations(document, lines) {
        return __awaiter(this, void 0, void 0, function* () {
            yield vscode_1.window.showTextDocument(document, 1, false).then((e) => __awaiter(this, void 0, void 0, function* () {
                yield e.edit((edit) => {
                    lines.forEach((line) => {
                        //Add curly after if
                        edit.insert(line.range.end, ' {');
                        const lineNum = line.lineNumber;
                        //Line pos of nested statement
                        const nextLinePos = document.lineAt(lineNum + 1).range.end;
                        //Number of spaces needed to match indent
                        const numSpaces = line.firstNonWhitespaceCharacterIndex;
                        edit.insert(nextLinePos, `\n${' '.repeat(numSpaces)}}`);
                    });
                });
            }));
        });
    }
}
exports.LinterFix = LinterFix;
//# sourceMappingURL=LinterFix.js.map