"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const PrototypeCreator_1 = require("./classes/PrototypeCreator");
function activate(context) {
    console.log('Congratulations, your extension "prototype-generator" is now active!');
    //Register the function as 'createPrototypes' Command
    context.subscriptions.push(vscode.commands.registerCommand("prototype-generator.createPrototypes", PrototypeCreator_1.PrototypeCreator.execute));
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map