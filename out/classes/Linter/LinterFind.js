"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinterFind = void 0;
class LinterFind {
    static checkConstant(document) {
        const numLines = document.lineCount;
        const violations = [];
        for (let i = 0; i < numLines; i++) {
            const line = document.lineAt(i);
            if (!line.text.includes('#define')) {
                continue;
            }
            const [, name] = line.text.split(' ');
            if (name.toUpperCase() !== name) {
                violations.push(line);
            }
        }
        return violations;
    }
    static checkCurly(document) {
        const numLines = document.lineCount;
        const violations = [];
        for (let i = 0; i < numLines; i++) {
            const line = document.lineAt(i);
            const targets = ['if', 'for', 'while'];
            if (!targets.some((t) => line.text.includes(`${t} (`))) {
                continue;
            }
            if (!line.text.includes('{')) {
                violations.push(line);
            }
        }
        return violations;
    }
}
exports.LinterFind = LinterFind;
//# sourceMappingURL=LinterFind.js.map