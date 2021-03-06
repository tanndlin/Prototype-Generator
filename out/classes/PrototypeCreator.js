"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrototypeCreator = void 0;
const vscode = require("vscode");
const Method_1 = require("./Method");
class PrototypeCreator {
    static validate(document) {
        return document.languageId === "c";
    }
    static execute() {
        var _a;
        const document = (_a = vscode.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document;
        if (!document) {
            return;
        }
        if (!PrototypeCreator.validate(document)) {
            return;
        }
        console.log("Creating prototypes");
        //Get Function declarations
        const decs = PrototypeCreator.getFunctionDeclarations(document);
        const declarations = decs.map((dec) => Method_1.Method.parseToMethod(dec));
        const mainLine = decs[0].lineNumber;
        //Get prototypes
        const prototypes = PrototypeCreator.getFunctionPrototypes(document, mainLine); //All prototypes are before main function
        //Apply edits
        vscode.window.showTextDocument(document, 1, false).then((e) => {
            //Delete pre-existing prototypes
            e.edit((edit) => {
                prototypes.forEach((lineNum) => {
                    //Delete all in line, and the \n on the next line
                    const start = new vscode.Position(lineNum, 0);
                    const end = new vscode.Position(lineNum + 1, 0);
                    edit.delete(new vscode.Range(start, end));
                });
                //If there were no prototypes we need the extra space to seperate from includes
                if (prototypes.length === 0) {
                    edit.insert(new vscode.Position(mainLine - 1, 0), "\n");
                }
                //Create prototypes
                declarations.forEach((dec) => {
                    //Make sure we don't prototype the main function
                    if (dec.name === "main") {
                        return;
                    }
                    edit.insert(new vscode.Position(mainLine - 1, 0), dec.createPrototype());
                });
            });
        });
    }
    static getFunctionPrototypes(document, mainLine) {
        const prototypes = [];
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
            if (PrototypeCreator.getIndentLevel(document, i) > 0) {
                continue;
            }
            // If none of the conditions are true,
            // its a function that needsto be prototyped
            prototypes.push(i);
        }
        return prototypes;
    }
    static getFunctionDeclarations(document) {
        const decs = [];
        //Find where the main function is
        let mainLine = -1;
        for (let i = 0; i < document.lineCount; i++) {
            if (document.lineAt(i).text.startsWith("int main")) {
                mainLine = i;
                break;
            }
        }
        //Store all the indentation levels for each line
        const indents = [];
        for (let i = 0; i < document.lineCount; i++) {
            indents.push(PrototypeCreator.getIndentLevel(document, i));
        }
        //Starting after the main function
        for (let i = mainLine; i < document.lineCount; i++) {
            //If this line's indentation is 1 while the previous was 0,
            //This line is a function declaration
            if (indents[i] === 0 && indents[i + 1] === 1) {
                decs.push(document.lineAt(i));
            }
        }
        return decs;
    }
    //Count the { } to see how indented a line is
    static getIndentLevel(document, line) {
        //Start at the first line, and go to target line counting indents
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
exports.PrototypeCreator = PrototypeCreator;
//# sourceMappingURL=PrototypeCreator.js.map