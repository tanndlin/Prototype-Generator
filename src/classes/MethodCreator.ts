import * as vscode from 'vscode';
import { PrototypeCreator } from './PrototypeCreator';

export class MethodCreator {
  static DEFAULT_RETURNS: Record<string, number | string | boolean> = {
    int: -1,
    void: '',
    float: -1,
    double: -1,
    bool: false,
  };

  private static _validate(document: vscode.TextDocument): boolean {
    return document.languageId === 'c';
  }

  public static async execute() {
    const document = vscode.window.activeTextEditor?.document;
    if (!document) {
      return;
    }

    if (!MethodCreator._validate(document)) {
      return;
    }

    const returnType = await vscode.window.showInputBox();
    if (!returnType) {
      return;
    }

    const name = await vscode.window.showInputBox();
    const params: string[] = [];
    let param = await vscode.window.showInputBox();
    while (param) {
      params.push(param);
      param = await vscode.window.showInputBox();
    }

    const defaultReturn = MethodCreator.DEFAULT_RETURNS[returnType];

    const targetLine = document.lineCount;
    await vscode.window.showTextDocument(document, 1, false).then(async (e) => {
      // Delete pre-existing prototypes
      await e.edit((edit) => {
        edit.insert(
          new vscode.Position(targetLine, 0),
          `\n${returnType} ${name}(${params.join(', ')})` + `{\n\n\treturn ${defaultReturn};\n}`
        );
      });
    });
    PrototypeCreator.execute();
  }
}
