import * as vscode from "vscode";
import { Method } from "./classes/Method";

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "prototype-generator" is now active!'
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "prototype-generator.createPrototypes",
      () => {
        console.log("Creating prototypes");

        const document = vscode.window.activeTextEditor?.document;
        if (!document) {
          return;
        }

        const decs: vscode.TextLine[] = getFunctionDeclarations(document);
        const declarations = decs.map((dec) => Method.parseToMethod(dec));
        console.log(declarations);

        const mainLine = decs[0].lineNumber;
        console.log(mainLine);

        const prototypes: number[] = getFunctionPrototypes(document, mainLine);
        console.log(prototypes);

        vscode.window.showTextDocument(document, 1, false).then((e) => {
          e.edit((edit) => {
            prototypes.forEach((lineNum) => {
              const start = new vscode.Position(lineNum, 0);
              const end = new vscode.Position(lineNum + 1, 0);

              edit.delete(new vscode.Range(start, end));
            });

            //If there were no prototypes we need the extra space to seperate from includes
            if (prototypes.length === 0) {
              edit.insert(new vscode.Position(mainLine - 1, 0), "\n");
            }
            declarations.forEach((dec) => {
              if (dec.name === "main") {
                return;
              }

              edit.insert(
                new vscode.Position(mainLine - 1, 0),
                dec.createPrototype()
              );
            });
          });
        });
      }
    )
  );

  function getFunctionPrototypes(
    document: vscode.TextDocument,
    mainLine: number
  ) {
    const prototypes: number[] = [];

    for (let i = 0; i < mainLine; i++) {
      const line = document.lineAt(i);

      //Blank line
      if (line.text.length === 0) {
        continue;
      }

      //If its an include
      if (line.text.includes("#include")) {
        continue;
      }

      //Constant
      if (line.text.includes("#define")) {
        continue;
      }

      //If its a struct
      if (line.text.includes("struct")) {
        continue;
      }

      //If its inside a struct
      if (getIndentLevel(document, i) > 0) {
        continue;
      }

      prototypes.push(i);
    }
    return prototypes;
  }

  function getFunctionDeclarations(
    document: vscode.TextDocument
  ): vscode.TextLine[] {
    const decs = [];
    let mainLine = -1;
    for (let i = 0; i < document.lineCount; i++) {
      if (document.lineAt(i).text.startsWith("int main")) {
        mainLine = i;
        break;
      }
    }

    const indents: number[] = [];
    for (let i = 0; i < document.lineCount; i++) {
      indents.push(getIndentLevel(document, i));
    }

    console.log(indents);

    for (let i = mainLine; i < document.lineCount; i++) {
      if (indents[i] === 0 && indents[i + 1] === 1) {
        decs.push(document.lineAt(i));
      }
    }

    return decs;
  }

  function getIndentLevel(document: vscode.TextDocument, line: number) {
    let indentLevel = 0;
    for (let i = 0; i < line; i++) {
      const text = document.lineAt(i).text;

      if (text.includes("{")) {
        indentLevel++;
      }
      if (text.includes("}")) {
        indentLevel--;
      }
    }

    return indentLevel;
  }
}

export function deactivate() {}
