import * as vscode from 'vscode';

export function addTestIdToVueComponent(componentCode: string, selectedText: string): string {
    const componentNameMatch = componentCode.match(/name:\s*['"](\w+)['"]/);
    if (componentNameMatch) {
        const componentName = componentNameMatch[1];
        const dataTestId = `${componentName}-${selectedText}`;
        
        // Crear una expresión regular para encontrar el texto seleccionado
        const selectedTextRegex = new RegExp(`(${selectedText})`, 'g');

        // Reemplazar el texto seleccionado con el data-testid
        return componentCode.replace(selectedTextRegex, `data-testid="${dataTestId}"`);
    } else {
        vscode.window.showErrorMessage('El componente no tiene un atributo "name", por favor agregarlo.');
    }
    return componentCode;
}
