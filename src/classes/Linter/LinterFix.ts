import { TextDocument, TextLine, window } from 'vscode';

export class LinterFix {
  public static fixCurlyViolations(document: TextDocument, lines: TextLine[]) {
    window.showTextDocument(document, 1, false).then((e) => {
      e.edit((edit) => {
        lines.forEach((line) => {
          //Add curly after if
          edit.insert(line.range.end, ' {');

          const lineNum = line.lineNumber;
          //Line pos of nested statement
          const nextLinePos = document.lineAt(lineNum + 1).range.end;
          //Number of spaces needed to match indent
          const numSpaces = line.firstNonWhitespaceCharacterIndex;
          edit.insert(nextLinePos, `\n${' '.repeat(numSpaces)}}`);
        });
      });
    });
  }
}
