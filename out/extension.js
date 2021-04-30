"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const PrototypeCreator_1 = require("./classes/Prototype/PrototypeCreator");
const MethodCreator_1 = require("./classes/Prototype/MethodCreator");
const CodeLensProvider_1 = require("./classes/CodeLensProvider");
const Linter_1 = require("./classes/Linter/Linter");
function activate(context) {
    console.log('Congratulations, your extension "prototype-generator" is now active!');
    //Register the function as 'createPrototypes' Command
    context.subscriptions.push(vscode.commands.registerCommand('prototype-generator.createPrototypes', PrototypeCreator_1.PrototypeCreator.execute));
    //Register the function as 'createMethod' Command
    context.subscriptions.push(vscode.commands.registerCommand('prototype-generator.createMethod', MethodCreator_1.MethodCreator.execute));
    context.subscriptions.push(vscode.commands.registerCommand('prototype-generator.lint', Linter_1.Linter.execute));
    const docSelector = {
        language: 'c',
        scheme: 'file',
    };
    context.subscriptions.push(vscode.languages.registerCodeLensProvider(docSelector, new CodeLensProvider_1.MyCodeLensProvider()));
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map