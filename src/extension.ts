import * as vscode from 'vscode';
import { addTestIdToVueComponent } from './testidProvider';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.addTestId', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const selection = editor.selection;
            const selectedText = document.getText(selection).trim();

            // Solo proceder si hay texto seleccionado
            if (selectedText.length > 0) {
                const fullText = document.getText();
                const updatedText = addTestIdToVueComponent(fullText, selectedText);

                // Reemplazar el texto seleccionado con el data-testid
                editor.edit(editBuilder => {
                    editBuilder.replace(new vscode.Range(0, 0, document.lineCount, 0), updatedText);
                });
            } else {
                vscode.window.showInformationMessage('Please select a valid element.');
            }
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
