import * as vscode from 'vscode';

function toKebabCase(str: string): string {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

export function addTestIdToVueComponent(componentCode: string, selectedText: string): string {
    const componentNameMatch = componentCode.match(/name:\s*['"](\w+)['"]/);
    if (componentNameMatch) {
        const componentName = toKebabCase(componentNameMatch[1]);

        // Crear una expresión regular para encontrar la etiqueta del componente que contiene el texto seleccionado
        const componentTagRegex = new RegExp(`<([a-zA-Z0-9-]+)[^>]*${selectedText}[^>]*>`, 'i');
        const componentTagMatch = componentCode.match(componentTagRegex);

        if (componentTagMatch) {
            let type = componentTagMatch[1]; // Extraer el tipo de la etiqueta del componente

            if (type.includes('-')) {
                type = type.split('-')[0];
            }

            const dataTestId = `${componentName}__${selectedText}--${type}`;

            // Crear una expresión regular para encontrar el texto seleccionado
            const selectedTextRegex = new RegExp(`(${selectedText})`, 'g');

            // Reemplazar el texto seleccionado con el data-testid
            return componentCode.replace(selectedTextRegex, `data-testid="${dataTestId}"`);
        } else {
            vscode.window.showWarningMessage('No se encontró el tipo de la etiqueta del componente.');
        }
    } else {
        // Mostrar un warning si el componente no tiene nombre
        vscode.window.showWarningMessage('El componente no tiene un atributo "name".');
    }
    return componentCode;
}
