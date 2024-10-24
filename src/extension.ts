import * as vscode from 'vscode';

// This function is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {
    const srlFormatter = vscode.languages.registerDocumentFormattingEditProvider('srl', {
        provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
            const edits: vscode.TextEdit[] = [];
            const indentString = '    '; // 4 spaces for indentation
            let lines: string[] = [];

            // First pass: Handle line terminators, ensuring proper braces and line breaks
            for (let i = 0; i < document.lineCount; i++) {
                const line = document.lineAt(i).text;
                lines.push(...handleLineTerminators(line));
            }

            // Second pass: Adjust indentation based on curly braces
            lines = indentByCurlyBrace(lines);

            // Third pass: Unite closing braces with catch statements
            lines = uniteClosingBracesAndCatch(lines);

            // Join the formatted lines back together
            const formattedText = lines.join('\n');

            // Replace the entire document with the formatted content
            const fullRange = new vscode.Range(
                document.positionAt(0),
                document.positionAt(document.getText().length)
            );
            edits.push(vscode.TextEdit.replace(fullRange, formattedText));

            return edits;
        }
    });

    // Register the formatting provider in the extension's context
    context.subscriptions.push(srlFormatter);
}

// Function to handle line terminators like braces and semicolons
function handleLineTerminators(line: string): string[] {
    let newLines: string[] = [];
    let newLine = '';

    for (let idx = 0; idx < line.length; idx++) {
        const currentChar = line.charAt(idx);

        if (currentChar === '{') {
            // Opening brace should be on its own line
            newLine += '{\n';
        } else if (currentChar === '}') {
            // Closing brace should be on its own line
            const previousChar = idx > 0 ? line.charAt(idx - 1) : null;
            if (previousChar === '\n') {
                newLine += '\n}\n';
            } else {
                newLine += '}\n';
            }
        } else if (currentChar === ';') {
            // Semicolon should end the current line
            newLine += ';\n';
        } else {
            newLine += currentChar;
        }
    }

    // Split the new line over newlines and trim each line
    newLine.split('\n').forEach((innerLine) => {
        const trimmedLine = innerLine.trim();
        if (trimmedLine) {
            newLines.push(trimmedLine);
        }
    });

    return newLines;
}

// Function to adjust indentation based on curly braces
function indentByCurlyBrace(lines: string[]): string[] {
    const newLines: string[] = [];
    let indentLevel = 0;
    const indentString = '    '; // 4 spaces for indentation
    lines.forEach((line) => {
        if (line.trim().match(/^\)\s*then\s*\{/)) {
            // Special case for ") then {"
            indentLevel = Math.max(0, indentLevel - 1);
            newLines.push(indentString.repeat(indentLevel) + line.trim());
            indentLevel++;
        } else
        if (line.trim().match(/^\)\s*then\s*$/)) {
            // Special case for ") then {"
            indentLevel = Math.max(0, indentLevel - 1);
            newLines.push(indentString.repeat(indentLevel) + line.trim());
            // indentLevel++;
        }
        else if (!isComment(line) && line.includes('{')) {
            newLines.push(indentString.repeat(indentLevel) + line.trim());
            indentLevel++;
        } else if (!isComment(line) && line.includes('}')) {
            indentLevel = Math.max(0, indentLevel - 1);
            newLines.push(indentString.repeat(indentLevel) + line.trim());
        } else if (!isComment(line) && line.trim().match(/^if\s*\(\s*$/)) {
            // Special case for "if ("
            newLines.push(indentString.repeat(indentLevel) + line.trim());
            indentLevel++;
        } else {
            newLines.push(indentString.repeat(indentLevel) + line.trim());
        }
    });

    return newLines;
}

// Function to unite closing braces with catch statements
function uniteClosingBracesAndCatch(lines: string[]): string[] {
    const newLines: string[] = [];
    let previousLine: string | null = null;

    lines.forEach((line) => {
        line = line.replace(/\s+$/, ''); // Remove trailing spaces
        if (previousLine && previousLine.trim() === '}' && line.trim().startsWith('catch')) {
            // Combine "}" with "catch"
            newLines.pop();
            newLines.push(previousLine + ' ' + line.trim());
        } else {
            newLines.push(line);
        }
        previousLine = line;
    });

    return newLines;
}

// Helper function to check if a line is a comment
function isComment(line: string): boolean {
    return line.trim().startsWith('//');
}

// This function is called when your extension is deactivated
export function deactivate() {}
