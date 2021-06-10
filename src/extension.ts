import * as vscode from 'vscode';
import { PrototypeCreator } from './classes/PrototypeCreator';
import { MethodCreator } from './classes/MethodCreator';
import { MyCodeLensProvider } from './classes/CodeLensProvider';
import { Helper } from './classes/Helper';

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "prototype-generator" is now active!');

  // Register the function as 'createPrototypes' Command
  context.subscriptions.push(
    vscode.commands.registerCommand(
      'prototype-generator.createPrototypes',
      PrototypeCreator.execute
    )
  );

  // Register the function as 'createMethod' Command
  context.subscriptions.push(
    vscode.commands.registerCommand('prototype-generator.createMethod', MethodCreator.execute)
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('prototype-generator.getMethodReport', Helper.getMethodReport)
  );

  const docSelector = {
    language: 'c',
    scheme: 'file',
  };

  context.subscriptions.push(
    vscode.languages.registerCodeLensProvider(docSelector, new MyCodeLensProvider())
  );
}

export function deactivate() {}
