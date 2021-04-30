"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinterFind = void 0;
class LinterFind {
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