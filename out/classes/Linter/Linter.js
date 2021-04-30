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
        return __awaiter(this, void 0, void 0, function* () {
            const document = (_a = vscode_1.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document;
            if (!document) {
                return;
            }
            if (!Linter.validate(document)) {
                return;
            }
            const violations = Linter._getViolations(document);
            yield Linter._fixViolations(document, violations);
        });
    }
    static _getViolations(document) {
        const violations = {
            curly: LinterFind_1.LinterFind.checkCurly(document),
            constant: LinterFind_1.LinterFind.checkConstant(document),
        };
        return violations;
    }
    static _fixViolations(document, violations) {
        return __awaiter(this, void 0, void 0, function* () {
            yield LinterFix_1.LinterFix.fixCurlyViolations(document, violations.curly);
            yield LinterFix_1.LinterFix.fixConstantViolations(document, violations.constant);
        });
    }
}
exports.Linter = Linter;
//# sourceMappingURL=Linter.js.map