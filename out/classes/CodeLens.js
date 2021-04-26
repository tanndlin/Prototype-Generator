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
const PrototypeCreator_1 = require("./PrototypeCreator");
class MyCodeLensProvider {
    provideCodeLenses(document) {
        return __awaiter(this, void 0, void 0, function* () {
            const decs = PrototypeCreator_1.PrototypeCreator.getFunctionDeclarations(document);
            const lens = decs.map((d) => {
                let c = {
                    command: "extension.addConsoleLog",
                    title: "Insert console.log",
                };
                return new vscode.CodeLens(d.range, c);
            });
            return lens;
        });
    }
}
exports.MyCodeLensProvider = MyCodeLensProvider;
//# sourceMappingURL=CodeLens.js.map