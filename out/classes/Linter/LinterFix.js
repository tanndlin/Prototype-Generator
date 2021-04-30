"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinterFix = void 0;
const vscode_1 = require("vscode");
class LinterFix {
    static fixCurlyViolations(document, lines) {
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
exports.LinterFix = LinterFix;
//# sourceMappingURL=LinterFix.js.map