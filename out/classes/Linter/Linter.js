"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Linter = void 0;
const vscode_1 = require("vscode");
const LinterFind_1 = require("./LinterFind");
const LinterFix_1 = require("./LinterFix");
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
        const violations = {
            curly: LinterFind_1.LinterFind.checkCurly(document),
        };
        return violations;
    }
    static _fixViolations(document, violations) {
        LinterFix_1.LinterFix.fixCurlyViolations(document, violations.curly);
    }
}
exports.Linter = Linter;
//# sourceMappingURL=Linter.js.map