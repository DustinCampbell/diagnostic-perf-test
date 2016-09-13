'use strict';

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let collection = vscode.languages.createDiagnosticCollection('perf-text');

    let disposable = vscode.commands.registerCommand('extension.populateDiagnostics', () => {
        let newDiagnostics: [vscode.Uri, vscode.Diagnostic[]][] = [];

        for (let i = 1; i <= 2000; i++) {
            let uri = vscode.Uri.file(`file${i}.txt`);

            let entries: vscode.Diagnostic[] = [];
            for (let j = 1; j <= 1; j++) {
                let range = new vscode.Range(j-1, 1, j-1, 1);
                let message = `Diagnostic ${j}`;
                let diagnostic = new vscode.Diagnostic(range, message, vscode.DiagnosticSeverity.Error);
                entries.push(diagnostic);
            }

            newDiagnostics.push([uri, entries]);
        }

        collection.set(newDiagnostics);
    });

    context.subscriptions.push(disposable);
    context.subscriptions.push(collection);
}