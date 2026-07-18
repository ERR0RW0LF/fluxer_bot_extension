// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "fluxerbothelper" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposableHelloWorld = vscode.commands.registerCommand('fluxerbothelper.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from FluxerBotHelper!');
	});

	// Add a way to add a new command for a fluxer bot more easily. So when the user types @bot.command() it will automatically add the rest needed to set up a new command for the bot in python
	// @bot.command() 
	// async def command_name(ctx: fluxer.models.message.Message):
	//     # Your code here
	//     pass
	vscode.languages.registerCompletionItemProvider('python', {
		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
			const linePrefix = document.lineAt(position).text.substring(0, position.character);
			if (!linePrefix.endsWith('@bot.command()') && !linePrefix.endsWith('@bot.command') && !linePrefix.endsWith('@bot.command(')) {
				return undefined;
			}

			const completionItem = new vscode.CompletionItem('Add Fluxer Bot Command', vscode.CompletionItemKind.Snippet);
			if (linePrefix.endsWith('@bot.command()')) {
				completionItem.insertText = new vscode.SnippetString(`\nasync def \${1:command_name}(ctx: fluxer.models.message.Message):\n    # Your code here\n    pass`);
			} else if (linePrefix.endsWith('@bot.command')) {
				completionItem.insertText = new vscode.SnippetString(`command()\nasync def \${1:command_name}(ctx: fluxer.models.message.Message):\n    # Your code here\n    pass`);
			} else if (linePrefix.endsWith('@bot.command(')) {
				completionItem.insertText = new vscode.SnippetString(`)\nasync def \${1:command_name}(ctx: fluxer.models.message.Message):\n    # Your code here\n    pass`);
				// if the next symbol is a ) remove it so that it doesn't add an extra ) at the end of the command
				const nextChar = document.getText(new vscode.Range(position, position.translate(0, 1)));
				if (nextChar === ')') {
					const edit = new vscode.WorkspaceEdit();
					edit.delete(document.uri, new vscode.Range(position, position.translate(0, 1)));
					vscode.workspace.applyEdit(edit);
				}
			} else {
				completionItem.insertText = new vscode.SnippetString(`@bot.command()\nasync def \${1:command_name}(ctx: fluxer.models.message.Message):\n    # Your code here\n    pass`);
			}
			completionItem.documentation = new vscode.MarkdownString('Adds a new command for the Fluxer bot.');

			return [completionItem];
		}
	}, '(', '.', ')', 'd'); // Trigger completion when '(' or '.' is typed 

	vscode.languages.registerCompletionItemProvider('python', {
		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
			const linePrefix = document.lineAt(position).text.substring(0, position.character);
			if (!linePrefix.endsWith('@bot.event') && !linePrefix.endsWith('@bot.even')) {
				return undefined;
			}
			const completionItem = new vscode.CompletionItem('Add Fluxer Bot Event', vscode.CompletionItemKind.Snippet);
			if (linePrefix.endsWith('@bot.event')) {
				completionItem.insertText = new vscode.SnippetString(`\nasync def \${1:event_name}(\${2:}):\n    # Your code here\n    pass`);
			} else if (linePrefix.endsWith('@bot.even')) {
				completionItem.insertText = new vscode.SnippetString(`t\nasync def \${1:event_name}(\${2:}):\n    # Your code here\n    pass`);
			}
			completionItem.documentation = new vscode.MarkdownString('Adds a new event for the Fluxer bot.');

			return [completionItem];
		}
	}, '(', '.', ')', 't', 'n');

	vscode.languages.registerCompletionItemProvider('python',{
		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
			const linePrefix = document.lineAt(position).text.substring(0, position.character);
			if (!linePrefix.endsWith('@Cog.listener()') && !linePrefix.endsWith('@Cog.listener(') && !linePrefix.endsWith('@Cog.listener')) {
				return undefined;
			}
			const completionItem = new vscode.CompletionItem('Add Fluxer Cog Listener', vscode.CompletionItemKind.Snippet);
			if (linePrefix.endsWith('@Cog.listener()')) {
				completionItem.insertText = new vscode.SnippetString(`\nasync def \${1:listener_name}(self, \${2:}):\n    # Your code here\n    pass`);
			} else if (linePrefix.endsWith('@Cog.listener(')) {
				completionItem.insertText = new vscode.SnippetString(`)\nasync def \${1:listener_name}(self, \${2:}):\n    # Your code here\n    pass`);
				const nextChar = document.getText(new vscode.Range(position, position.translate(0, 1)));
				if (nextChar === ')') {
					const edit = new vscode.WorkspaceEdit();
					edit.delete(document.uri, new vscode.Range(position, position.translate(0, 1)));
					vscode.workspace.applyEdit(edit);
				}
			} else if (linePrefix.endsWith('@Cog.listener')) {
				completionItem.insertText = new vscode.SnippetString(`listener())\nasync def \${1:listener_name}(self, \${2:}):\n    # Your code here\n    pass`);
			}
			completionItem.documentation = new vscode.MarkdownString('Adds a new event listener for the Fluxer cog.');

			return [completionItem];
		}
	}, '(', '.', ')', 'r');

	// Add the same for Cog.command() so when the user types @Cog.command() it will add the same
	vscode.languages.registerCompletionItemProvider('python', {
		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
			const linePrefix = document.lineAt(position).text.substring(0, position.character);
			if (!linePrefix.endsWith('@Cog.command()') && !linePrefix.endsWith('@Cog.command') && !linePrefix.endsWith('@Cog.command(')) {
				return undefined;
			}

			const completionItem = new vscode.CompletionItem('Add Cog Command', vscode.CompletionItemKind.Snippet);
			// make it so that it only adds the missing parts of the command if the user has already typed some of it. So if the user has already typed @Cog.command() it will only add the rest of the command, but if the user has only typed @Cog.command it will add the missing () and the rest of the command
			if (linePrefix.endsWith('@Cog.command()')) {
				completionItem.insertText = new vscode.SnippetString(`\nasync def \${1:command_name}(self, ctx: fluxer.models.message.Message):\n    # Your code here\n    pass`);
			} else if (linePrefix.endsWith('@Cog.command')) {
				completionItem.insertText = new vscode.SnippetString(`command()\nasync def \${1:command_name}(self, ctx: fluxer.models.message.Message):\n    # Your code here\n    pass`);
			} else if (linePrefix.endsWith('@Cog.command(')) {
				completionItem.insertText = new vscode.SnippetString(`)\nasync def \${1:command_name}(self, ctx: fluxer.models.message.Message):\n    # Your code here\n    pass`);
				// if the next symbol is a ) remove it so that it doesn't add an extra ) at the end of the command
				const nextChar = document.getText(new vscode.Range(position, position.translate(0, 1)));
				if (nextChar === ')') {
					const edit = new vscode.WorkspaceEdit();
					edit.delete(document.uri, new vscode.Range(position, position.translate(0, 1)));
					vscode.workspace.applyEdit(edit);
				}
			} else {
				completionItem.insertText = new vscode.SnippetString(`@Cog.command()\nasync def \${1:command_name}(self, ctx: fluxer.models.message.Message):\n    # Your code here\n    pass`);
			}
			completionItem.documentation = new vscode.MarkdownString('Adds a new command for the Cog.');

			return [completionItem];
		}
	}, '(', '.', ')', 'd'); // Trigger completion when '(' or '.' is typed 

	const disposableCogCommand = vscode.commands.registerCommand('fluxerbothelper.addCogCommand', async () => {
		const commandName = await vscode.window.showInputBox({
			prompt: 'Enter the name of the new Command',
			placeHolder: 'new_command'
		});
		if (!commandName) {
			return;
		}
		const commandTemplate = `@Cog.command()
async def ${commandName}(self, ctx: fluxer.models.message.Message):
	# Your code here:
	pass
`;
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const position = editor.selection.active;
			editor.edit(editBuilder => {
				editBuilder.insert(position, commandTemplate);
			});
		} else {
			const newFile = await vscode.workspace.openTextDocument({ content: commandTemplate, language: 'python' });
			await vscode.window.showTextDocument(newFile);
		}
	});

	const disposableBotCommand = vscode.commands.registerCommand('fluxerbothelper.addBotCommand', async () => {
		const commandName = await vscode.window.showInputBox({
			prompt: 'Enter the name of the new Command',
			placeHolder: 'new_command'
		});
		if (!commandName) {
			return
		}
		const commandTemplate = `@bot.command()
async def ${commandName}(ctx: fluxer.models.message.Message):
	# Your code here:
	pass
`;
		// Add at current position in file
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const position = editor.selection.active;
			editor.edit(editBuilder => {
				editBuilder.insert(position, commandTemplate);
			});
		} else {
			const newFile = await vscode.workspace.openTextDocument({ content: commandTemplate, language: 'python' });
			await vscode.window.showTextDocument(newFile);
		}
	});
	
	const disposableCogListener = vscode.commands.registerCommand('fluxerbothelper.addCogListener', async () => {
		const listenerName = await vscode.window.showInputBox({
			prompt: 'Enter the name of the Listener',
			placeHolder: 'on_raw_reaction_add'
		});
		const listenerTemplate = `@Cog.listener()
async def ${listenerName}(self, raw):
	# Your code here:
	pass
`;
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const position = editor.selection.active;
			editor.edit(editBuilder => {
				editBuilder.insert(position, listenerTemplate);
			});
		} else {
			const newFile = await vscode.workspace.openTextDocument({ content: listenerTemplate, language: 'python' });
			await vscode.window.showTextDocument(newFile);
		}
	});

	const disposableBotEvent = vscode.commands.registerCommand('fluxerbothelper.addBotEvent', async () => {
		const eventName = await vscode.window.showInputBox({
			prompt: 'Enter the name of the Event',
			placeHolder: 'on_raw_reaction_add'
		});
		const eventTemplate = `@bot.event
async def ${eventName}(raw):
	# Your code here:
	pass
`;
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const position = editor.selection.active;
			editor.edit(editBuilder => {
				editBuilder.insert(position, eventTemplate);
			});
		} else {
			const newFile = await vscode.workspace.openTextDocument({ content: eventTemplate, language: 'python' });
			await vscode.window.showTextDocument(newFile);
		}
	});

	// Add new option to New File for creating a python file with everything for a cog already set up. 
	/* # py
import fluxer
from fluxer import Cog
import logging

logger = logging.getLogger(__name__)

class {1:CogName}(Cog):
	def __init__(self, bot: fluxer.Bot):
		super().__init__(bot)
	
	@Cog.command()
	async def {2:command_name}(self, ctx: fluxer.models.message.Message):
		# Your code here
		pass

async def setup(bot: fluxer.Bot):
    await bot.add_cog({1:CogName}(bot))

async def teardown(bot):
    await bot.remove_cog("{1:CogName}")

	*/
	const disposableSetupCog = vscode.commands.registerCommand('fluxerbothelper.setupCog', async () => {
		const cogName = await vscode.window.showInputBox({
			prompt: 'Enter the name of the Cog',
			placeHolder: 'MyCog'
		});
		if (!cogName) {
			return;
		}
		const commandName = await vscode.window.showInputBox({
			prompt: 'Enter the name of the command',
			placeHolder: 'my_command'
		});
		if (!commandName) {
			return;
		}
		const cogTemplate = `import fluxer
from fluxer import Cog
import logging

logger = logging.getLogger(__name__)

class ${cogName}(Cog):
	def __init__(self, bot: fluxer.Bot):
		super().__init__(bot)
	
	@Cog.command()
	async def ${commandName}(self, ctx: fluxer.models.message.Message):
		# Your code here
		pass

async def setup(bot: fluxer.Bot):
	await bot.add_cog(${cogName}(bot))

async def teardown(bot):
	await bot.remove_cog("${cogName}")
`;
		const newFile = await vscode.workspace.openTextDocument({ content: cogTemplate, language: 'python' });
		await vscode.window.showTextDocument(newFile);
	});

	// create new file with the same template as above but using the new file command in vscode instead of the command palette. So when the user clicks on new file and selects fluxer bot cog it will create a new file with the template above.
	// this should be a new option when using the create: new file ... command in vscode. So when the user clicks on new file and selects fluxer bot cog it will create a new file with the template above.
	const disposableCreateCog = vscode.commands.registerCommand('fluxerbothelper.createCog', async () => {
		const cogName = await vscode.window.showInputBox({
			prompt: 'Enter the name of the Cog',
			placeHolder: 'MyCog'
		});
		if (!cogName) {
			return;
		}
		const commandName = await vscode.window.showInputBox({
			prompt: 'Enter the name of the command',
			placeHolder: 'my_command'
		});
		if (!commandName) {
			return;
		}
		const cogTemplate = `import fluxer
from fluxer import Cog
import logging

logger = logging.getLogger(__name__)

class ${cogName}(Cog):
	def __init__(self, bot: fluxer.Bot):
		super().__init__(bot)
	
	@Cog.command()
	async def ${commandName}(self, ctx: fluxer.models.message.Message):
		# Your code here
		pass

async def setup(bot: fluxer.Bot):
	await bot.add_cog(${cogName}(bot))

async def teardown(bot):
	await bot.remove_cog("${cogName}")
`;
		const newFile = await vscode.workspace.openTextDocument({ content: cogTemplate, language: 'python' });
		await vscode.window.showTextDocument(newFile);
	});

	context.subscriptions.push(disposableCreateCog);

	context.subscriptions.push(disposableSetupCog);

	context.subscriptions.push(disposableHelloWorld);

	context.subscriptions.push(disposableBotCommand);

	context.subscriptions.push(disposableCogCommand);

	context.subscriptions.push(disposableBotEvent);

	context.subscriptions.push(disposableCogListener);
}

// This method is called when your extension is deactivated
export function deactivate() {}
