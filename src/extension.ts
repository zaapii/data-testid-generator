import * as vscode from 'vscode';
import { addTestIdToVueComponent } from './testidProvider';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.addTestId', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const selection = editor.selection;
            const cursorPosition = selection.active;
            const lineText = document.lineAt(cursorPosition.line).text;
            const selectedText = document.getText(selection).trim();

            // Capturar el texto desde el final del cursor hasta el principio de la palabra actual
            const wordRange = document.getWordRangeAtPosition(cursorPosition);
            let textFromCursor = '';
            if (wordRange) {
                textFromCursor = document.getText(new vscode.Range(wordRange.start, cursorPosition));
            }

            // Solo proceder si hay texto seleccionado o texto desde el cursor
            if (selectedText.length > 0 || textFromCursor.length > 0) {
                const fullText = document.getText();
                const updatedText = addTestIdToVueComponent(fullText, selectedText + textFromCursor);

                // Reemplazar el texto seleccionado con el data-testid
                editor.edit(editBuilder => {
                    editBuilder.replace(new vscode.Range(0, 0, document.lineCount, 0), updatedText);
                });
            } else {
                vscode.window.showInformationMessage('Please select a valid element or position the cursor at the end of the name.');
            }
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
