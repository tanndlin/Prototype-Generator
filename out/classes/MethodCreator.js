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
exports.MethodCreator = void 0;
const vscode = require("vscode");
const PrototypeCreator_1 = require("./PrototypeCreator");
class MethodCreator {
    static _validate(document) {
        return document.languageId === 'c';
    }
    static execute() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const document = (_a = vscode.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document;
            if (!document) {
                return;
            }
            if (!MethodCreator._validate(document)) {
                return;
            }
            const returnType = yield vscode.window.showInputBox();
            if (!returnType) {
                return;
            }
            const name = yield vscode.window.showInputBox();
            const params = [];
            let param = yield vscode.window.showInputBox();
            while (param) {
                params.push(param);
                param = yield vscode.window.showInputBox();
            }
            const defaultReturn = MethodCreator.DEFAULT_RETURNS[returnType];
            const targetLine = document.lineCount;
            yield vscode.window.showTextDocument(document, 1, false).then((e) => __awaiter(this, void 0, void 0, function* () {
                // Delete pre-existing prototypes
                yield e.edit((edit) => {
                    edit.insert(new vscode.Position(targetLine, 0), `\n${returnType} ${name}(${params.join(', ')})` + `{\n\n\treturn ${defaultReturn};\n}`);
                });
            }));
            PrototypeCreator_1.PrototypeCreator.execute();
        });
    }
}
exports.MethodCreator = MethodCreator;
MethodCreator.DEFAULT_RETURNS = {
    int: -1,
    void: '',
    float: -1,
    double: -1,
    bool: false,
};
//# sourceMappingURL=MethodCreator.js.map