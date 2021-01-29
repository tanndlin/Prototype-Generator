import * as vscode from "vscode";
import { PrototypeCreator } from "./classes/PrototypeCreator";

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
}

export function deactivate() {}
