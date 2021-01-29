"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const PrototypeCreator_1 = require("./classes/PrototypeCreator");
const MethodCreator_1 = require("./classes/MethodCreator");
function activate(context) {
    console.log('Congratulations, your extension "prototype-generator" is now active!');
    //Register the function as 'createPrototypes' Command
    context.subscriptions.push(vscode.commands.registerCommand("prototype-generator.createPrototypes", PrototypeCreator_1.PrototypeCreator.execute));
    //Register the function as 'createMethod' Command
    context.subscriptions.push(vscode.commands.registerCommand("prototype-generator.createMethod", MethodCreator_1.MethodCreator.execute));
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map