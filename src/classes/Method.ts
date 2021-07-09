import * as vscode from 'vscode';

export class Method {
  public name: string;
  public returnType: string;
  public params: string[];
  public lineNum: number;

  constructor(_returnType: string, _name: string, _params: string[], _lineNum: number) {
    this.name = _name;
    this.returnType = _returnType;
    this.params = _params;
    this.lineNum = _lineNum;
  }

  public createPrototype(): string {
    const s = `${this.returnType} ${this.name}(${this.params.join(', ')});\n`;
    return s;
  }

  public static parseToMethod(line: vscode.TextLine) {
    const text = line.text;

    const [returnType] = text.split(' '); // Return type is separated by a space
    const paramsStart = text.indexOf('(') + 1; // Params start after the (
    const paramsEnd = text.lastIndexOf(')'); // Params end after the )

    // Function name is after the space, up until the '('
    const functionName = text.slice(text.indexOf(' ') + 1, paramsStart - 1);

    // String of the params
    const params = text.slice(paramsStart, paramsEnd);
    return new Method(returnType, functionName, params.split(', '), line.lineNumber);
  }
}
