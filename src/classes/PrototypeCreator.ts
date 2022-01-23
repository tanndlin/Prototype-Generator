import * as vscode from 'vscode';
import { Method } from './Method';

export class PrototypeCreator {
  public static WHITELISTED_TERMS: string[] = ['#include', '#define', 'struct', 'FILE', 'using'];

  public static validate(document: vscode.TextDocument): boolean {
    return document.languageId === 'c' || document.languageId === 'cpp';
  }

  public static execute() {
    const document = vscode.window.activeTextEditor?.document;
    if (!document) {
      return;
    }

    if (!PrototypeCreator.validate(document)) {
      return;
    }

    console.log('Creating prototypes');

    // Get Function declarations
    const decs: vscode.TextLine[] = PrototypeCreator.getFunctionDeclarations(document);
    const declarations = decs.map((dec) => Method.parseToMethod(dec));
    const mainLine = decs[0].lineNumber;

    // Get prototypes
    const prototypes: number[] = PrototypeCreator._getFunctionPrototypes(document, mainLine); // All prototypes are before main function

    // Apply edits
    vscode.window.showTextDocument(document, 1, false).then((e) => {
      // Delete pre-existing prototypes
      e.edit((edit) => {
        prototypes.forEach((lineNum) => {
          // Delete all in line, and the \n on the next line
          const start = new vscode.Position(lineNum, 0);
          const end = new vscode.Position(lineNum + 1, 0);
          edit.delete(new vscode.Range(start, end));
        });

        // If there were no prototypes we need the extra space to separate from includes
        if (prototypes.length === 0) {
          edit.insert(new vscode.Position(mainLine - 1, 0), '\n');
        }

        // Create prototypes
        declarations.forEach((dec) => {
          // Make sure we don't prototype the main function
          if (dec.name === 'main') {
            return;
          }

          edit.insert(new vscode.Position(mainLine - 1, 0), dec.createPrototype());
        });
      });
    });
  }

  private static _getFunctionPrototypes(document: vscode.TextDocument, mainLine: number) {
    const prototypes: number[] = [];

    for (let i = 0; i < mainLine; i++) {
      const line = document.lineAt(i);

      // Blank line
      if (line.text.length === 0) {
        continue;
      }

      // If its an include`
      if (this.WHITELISTED_TERMS.some((term) => line.text.includes(term))) {
        continue;
      }

      // If its inside a struct
      if (PrototypeCreator.getIndentLevel(document, i) > 0) {
        continue;
      }

      // If none of the conditions are true,
      // its a function that needs to be prototyped
      prototypes.push(i);
    }
    return prototypes;
  }

  public static getFunctionDeclarations(document: vscode.TextDocument): vscode.TextLine[] {
    const decs = [];

    // Find where the main function is
    let mainLine = -1;
    for (let i = 0; i < document.lineCount; i++) {
      if (document.lineAt(i).text.startsWith('int main')) {
        mainLine = i;
        break;
      }
    }

    // Store all the indentation levels for each line
    const indents: number[] = [];
    for (let i = 0; i < document.lineCount; i++) {
      indents.push(PrototypeCreator.getIndentLevel(document, i));
    }

    // Starting after the main function
    for (let i = mainLine; i < document.lineCount; i++) {
      // If this line's indentation is 1 while the previous was 0,
      // This line is a function declaration
      if (indents[i] === 0 && indents[i + 1] === 1) {
        decs.push(document.lineAt(i));
      }
    }

    return decs;
  }

  // Count the { } to see how indented a line is
  public static getIndentLevel(document: vscode.TextDocument, line: number) {
    // Start at the first line, and go to target line counting indents
    let indentLevel = 0;
    for (let i = 0; i < line; i++) {
      const text = document.lineAt(i).text;

      if (text.includes('{')) {
        indentLevel++;
      }
      if (text.includes('}')) {
        indentLevel--;
      }
    }

    return indentLevel;
  }
}
