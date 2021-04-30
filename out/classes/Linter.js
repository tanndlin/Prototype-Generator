"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Linter = void 0;
const vscode_1 = require("vscode");
const LinterFind_1 = require("./LinterFind");
class Linter {
    static validate(document) {
        return document.languageId === 'c';
    }
    static execute() {
        var _a;
        const document = (_a = vscode_1.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document;
        if (!document) {
            return;
        }
        if (!Linter.validate(document)) {
            return;
        }
        const violations = Linter._getViolations(document);
        Linter._fixViolations(document, violations);
    }
    static _getViolations(document) {
        const violations = { curly: LinterFind_1.LinterFind._checkCurly(document) };
        return violations;
    }
    static _fixViolations(document, violations) {
        Linter._fixCurlyViolations(document, violations.curly);
    }
    static _fixCurlyViolations(document, lines) {
        vscode_1.window.showTextDocument(document, 1, false).then((e) => {
            e.edit((edit) => {
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
        });
    }
}
exports.Linter = Linter;
//# sourceMappingURL=Linter.js.map