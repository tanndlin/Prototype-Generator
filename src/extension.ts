import * as vscode from "vscode";
import { PrototypeCreator } from "./classes/PrototypeCreator";
import { MethodCreator } from "./classes/MethodCreator";

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "prototype-generator" is now active!'
  );

  //Register the function as 'createPrototypes' Command
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "prototype-generator.createPrototypes",
      PrototypeCreator.execute
    )
  );

  //Register the function as 'createMethod' Command
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "prototype-generator.createMethod",
      MethodCreator.execute
    )
  );
}

export function deactivate() {}
