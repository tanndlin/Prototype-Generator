import * as vscode from 'vscode';
import { PrototypeCreator } from './PrototypeCreator';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      'prototype-generator.createPrototypes',
      PrototypeCreator.execute
    )
  );
}

export function deactivate() {}
