import * as vscode from "vscode";
import { Parameter } from "./Parameter";

export class Method {
  public name: string;
  public returnType: string;
  public params: Parameter[];
  public lineNum: number;

  constructor(
    _returnType: string,
    _name: string,
    _params: Parameter[],
    _lineNum: number
  ) {
    this.name = _name;
    this.returnType = _returnType;
    this.params = _params;
    this.lineNum = _lineNum;
  }

  public createPrototype(): string {
    let s = `${this.returnType} ${this.name}(`;

    this.params.forEach((p) => {
      s += `${p.type}`;
      //If its a pointer, preserve it
      if (p.name.startsWith("*")) {
        s += " *";
      }

      //If there are params after this one, put a comma
      if (this.params.indexOf(p) < this.params.length - 1) {
        s += ", ";
      }
    });
    s += ");\n";

    return s;
  }

  public static parseToMethod(line: vscode.TextLine) {
    const text = line.text;

    const [returnType] = text.split(" ");
    const paramsStart = text.indexOf("(") + 1;
    const paramsEnd = text.indexOf(")");

    const functionName = text.slice(text.indexOf(" ") + 1, paramsStart - 1);

    const paramsList = text.slice(paramsStart, paramsEnd);
    let params: Parameter[] = [];

    if (paramsList.length > 0) {
      params = paramsList.split(", ").map((p: string) => {
        const [type, pName] = p.split(" ");
        return new Parameter(type, pName);
      });
    }

    return new Method(returnType, functionName, params, line.lineNumber);
  }
}
