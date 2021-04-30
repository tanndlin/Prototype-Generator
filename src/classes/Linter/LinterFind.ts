import { TextDocument, TextLine } from 'vscode';

export class LinterFind {
  public static checkConstant(document: TextDocument): TextLine[] {
    const numLines = document.lineCount;
    const violations: TextLine[] = [];

    for (let i = 0; i < numLines; i++) {
      const line = document.lineAt(i);
      if (!line.text.includes('#define')) {
        continue;
      }

      const [, name] = line.text.split(' ');
      if (name.toUpperCase() !== name) {
        violations.push(line);
      }
    }

    return violations;
  }

  public static checkCurly(document: TextDocument) {
    const numLines = document.lineCount;
    const violations: TextLine[] = [];

    for (let i = 0; i < numLines; i++) {
      const line = document.lineAt(i);
      const targets = ['if', 'for', 'while'];

      if (!targets.some((t) => line.text.includes(`${t} (`))) {
        continue;
      }

      if (!line.text.includes('{')) {
        violations.push(line);
      }
    }

    return violations;
  }
}
