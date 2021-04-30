import { TextDocument, TextLine, window } from 'vscode';
import { LinterFind } from './LinterFind';
import { LinterFix } from './LinterFix';

export class Linter {
  private static validate(document: TextDocument): boolean {
    return document.languageId === 'c';
  }

  public static execute() {
    const document = window.activeTextEditor?.document;
    if (!document) {
      return;
    }

    if (!Linter.validate(document)) {
      return;
    }

    const violations = Linter._getViolations(document);
    Linter._fixViolations(document, violations);
  }

  private static _getViolations(document: TextDocument): Violations {
    const violations: Violations = {
      curly: LinterFind.checkCurly(document),
    };
    return violations;
  }

  private static _fixViolations(document: TextDocument, violations: Violations) {
    LinterFix.fixCurlyViolations(document, violations.curly);
  }
}

interface Violations {
  curly: TextLine[];
}
