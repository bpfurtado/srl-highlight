"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
// This function is called when your extension is activated
function activate(context) {
    // Register a formatting provider for the SRL language
    const srlFormatter = vscode.languages.registerDocumentFormattingEditProvider('srl', {
        provideDocumentFormattingEdits(document) {
            const edits = [];
            let indentLevel = 0;
            const indentString = '    '; // Change to '\t' if you want tabs
            // Iterate through each line of the document
            for (let i = 0; i < document.lineCount; i++) {
                let line = document.lineAt(i).text.trim();
                let formattedLines = [];
                // Split by `{` to handle multiple opening braces
                const parts = line.split('{');
                // Process each segment
                parts.forEach((part, index) => {
                    if (index > 0) {
                        // If it's not the first part, there was a `{` before this
                        formattedLines.push(indentString.repeat(indentLevel) + '{');
                        indentLevel++; // Increase indent level after an opening brace
                    }
                    // Split by `}` to handle multiple closing braces within a segment
                    const subParts = part.split('}');
                    subParts.forEach((subPart, subIndex) => {
                        if (subIndex > 0) {
                            // If it's not the first sub-part, there was a `}` before this
                            indentLevel = Math.max(0, indentLevel - 1);
                        }
                        // Trim and format the current segment
                        const trimmedSubPart = subPart.trim();
                        if (trimmedSubPart) {
                            formattedLines.push(indentString.repeat(indentLevel) + trimmedSubPart);
                        }
                    });
                });
                // Join the formatted lines back together with newlines
                const formattedText = formattedLines.join('\n');
                // Replace the current line if there's a difference
                const lineRange = document.lineAt(i).range;
                edits.push(vscode.TextEdit.replace(lineRange, formattedText));
            }
            return edits;
        }
    });
    // Register the formatting provider in the extension's context
    context.subscriptions.push(srlFormatter);
}
// This function is called when your extension is deactivated
function deactivate() { }
