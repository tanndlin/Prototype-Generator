import { TextDocument, TextLine, window } from 'vscode';
import { LinterFind } from './LinterFind';
import { LinterFix } from './LinterFix';

export class Linter {
  private static validate(document: TextDocument): boolean {
    return document.languageId === 'c';
  }

  public static async execute() {
    const document = window.activeTextEditor?.document;
    if (!document) {
      return;
    }

    if (!Linter.validate(document)) {
      return;
    }

    const violations = Linter._getViolations(document);
    await Linter._fixViolations(document, violations);
  }

  private static _getViolations(document: TextDocument): Violations {
    const violations: Violations = {
      curly: LinterFind.checkCurly(document),
      constant: LinterFind.checkConstant(document),
    };
    return violations;
  }

  private static async _fixViolations(document: TextDocument, violations: Violations) {
    await LinterFix.fixCurlyViolations(document, violations.curly);
    await LinterFix.fixConstantViolations(document, violations.constant);
  }
}

interface Violations {
  curly: TextLine[];
  constant: TextLine[];
}
