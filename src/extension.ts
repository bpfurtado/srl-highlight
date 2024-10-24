import * as vscode from 'vscode';

// This function is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {
    // Register a formatting provider for the SRL language
    const srlFormatter = vscode.languages.registerDocumentFormattingEditProvider('srl', {
        provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
            const edits: vscode.TextEdit[] = [];
            let indentLevel = 0;
            const indentString = '    '; // Change to '\t' if you want tabs

            // Iterate through each line of the document
            for (let i = 0; i < document.lineCount; i++) {
                let line = document.lineAt(i).text.trim();
                let formattedLines: string[] = [];

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
export function deactivate() {}