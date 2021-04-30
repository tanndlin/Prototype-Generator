import { Position, Range, TextDocument, TextLine, window } from 'vscode';

export class LinterFix {
  public static async fixConstantViolations(document: TextDocument, lines: TextLine[]) {
    await window.showTextDocument(document, 1, false).then(async (e) => {
      await e.edit((edit) => {
        lines.forEach((line) => {
          //Generate Correct Name
          const [, name] = line.text.split(' ');
          let newName = name;
          for (let i = 0; i < newName.length; i++) {
            if (newName[i] !== newName[i].toLowerCase()) {
              console.log(i);

              newName = `${newName.slice(0, i)}_${newName.slice(i)}`;
              i++;
            }
          }

          //Find all occurances of the constant
          const toChange = [];
          for (let i = 0; i < document.lineCount; i++) {
            const l = document.lineAt(i);
            if (l.text.includes(name)) {
              toChange.push(l);
            }
          }

          //Change each occurance
          toChange.forEach((occ) => {
            const nameIndex = occ.text.indexOf(name);
            const start = new Position(occ.lineNumber, nameIndex);
            const end = new Position(occ.lineNumber, nameIndex + name.length);
            const range = new Range(start, end);
            edit.replace(range, newName.toUpperCase());
          });
        });
      });
    });
  }

  public static async fixCurlyViolations(document: TextDocument, lines: TextLine[]) {
    await window.showTextDocument(document, 1, false).then(async (e) => {
      await e.edit((edit) => {
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
