import * as vscode from 'vscode';
import { MyCodeLensProvider } from './CodeLensProvider';
import { Helper } from './Helper';
import { MethodCreator } from './MethodCreator';
import { PrototypeCreator } from './PrototypeCreator';

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "prototype-generator" is now active!');
  console.log('Congratulations, your extension "prototype-generator" is now active!');
  console.log('Congratulations, your extension "prototype-generator" is now active!');
  console.log('Congratulations, your extension "prototype-generator" is now active!');
  console.log('Congratulations, your extension "prototype-generator" is now active!');
  console.log('Congratulations, your extension "prototype-generator" is now active!');
  console.log('Congratulations, your extension "prototype-generator" is now active!');
  console.log('Congratulations, your extension "prototype-generator" is now active!');
  console.log('Congratulations, your extension "prototype-generator" is now active!');
  console.log('Congratulations, your extension "prototype-generator" is now active!');
  console.log('Congratulations, your extension "prototype-generator" is now active!');
  console.log('Congratulations, your extension "prototype-generator" is now active!');
  console.log('Congratulations, your extension "prototype-generator" is now active!');
  console.log('Congratulations, your extension "prototype-generator" is now active!');
  console.log('Congratulations, your extension "prototype-generator" is now active!');
  console.log('Congratulations, your extension "prototype-generator" is now active!');
  console.log('Congratulations, your extension "prototype-generator" is now active!');
  console.log('Congratulations, your extension "prototype-generator" is now active!');
  console.log('Congratulations, your extension "prototype-generator" is now active!');

  // Register the function as 'createPrototypes' Command
  context.subscriptions.push(
    vscode.commands.registerCommand(
      'prototype-generator.createPrototypes',
      PrototypeCreator.execute
    )
  );

  vscode.window.showInformationMessage('Prototype Generator is now active!');

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
