import * as vscode from "vscode";
import { PrototypeCreator } from "./PrototypeCreator";

export class MyCodeLensProvider implements vscode.CodeLensProvider {
  async provideCodeLenses(
    document: vscode.TextDocument
  ): Promise<vscode.CodeLens[]> {
    const decs = PrototypeCreator.getFunctionDeclarations(document);
    const mainLine = decs[0].lineNumber;
    const protos = this._getPrototypes(document, mainLine);

    const lengthLens = decs.map((d, i) => {
      const methodLen = this._getMethodLength(document, d.lineNumber);
      let c: vscode.Command = {
        command: "prototype-generator.getMethodReport",
        title: `Lines: ${methodLen}`,
      };

      if (d.text.includes("main")) {
        return new vscode.CodeLens(d.range, c);
      }

      const pLine = protos[i - 1];
      return new vscode.CodeLens(new vscode.Range(pLine, 0, pLine, 0), c);
    });

    const refLens = decs
      .filter((d) => !d.text.includes("main"))
      .map((d, i) => {
        const refCount = this._getMethodRefCount(document, d.lineNumber);
        let c: vscode.Command = {
          command: "prototype-generator.getMethodReport",
          title: `References: ${refCount}`,
        };

        const pLine = protos[i];
        return new vscode.CodeLens(new vscode.Range(pLine, 0, pLine, 0), c);
      });

    return [...lengthLens, ...refLens];
  }

  private _getPrototypes(
    document: vscode.TextDocument,
    mainLine: number
  ): number[] {
    const lines = [];

    let index = mainLine - 2;
    while (document.lineAt(index).text !== "") {
      lines.push(index);
      index--;
    }

    return lines.reverse();
  }

  private _getMethodLength(
    document: vscode.TextDocument,
    lineNum: number
  ): number {
    let endingLine = lineNum + 1;
    while (PrototypeCreator.getIndentLevel(document, endingLine) !== 0) {
      endingLine++;
    }

    return endingLine - lineNum;
  }

  private _getMethodRefCount(
    document: vscode.TextDocument,
    lineNum: number
  ): number {
    let methodName = document
      .lineAt(lineNum)
      .text.replace("*", "")
      .split(" ")
      .filter((s) => s.includes("("))[0];
    methodName = methodName.slice(0, methodName.indexOf("("));

    if (methodName === "main") {
      return 0;
    }

    let times = 0;
    for (let i = 0; i < document.lineCount; i++) {
      const text = document.lineAt(i).text;
      if (text.includes(methodName) && !text.trim().startsWith("//")) {
        times++;
      }
    }

    return times - 2;
  }
}
