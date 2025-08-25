import fs from 'fs';
import os from 'os';
import chalk from "chalk";
import path from 'path';
import { execFile } from "child_process";
import readline from 'readline';
import Table from "cli-table3";
const appsFile = path.join(os.homedir(), '.OpenAppThroughCli', 'path.json');
// ✅ Ensure directory exists
const dir = path.dirname(appsFile);
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}
// ✅ Add function
export const Add = (alias, appPath) => {
    // 🔒 If file doesn't exist, create it with empty object
    if (!alias || !appPath) {
        console.log(chalk.red("please provide the correct alias or appPath"));
    }
    if (!fs.existsSync(appsFile)) {
        fs.writeFileSync(appsFile, JSON.stringify({}), 'utf-8');
    }
    // 📖 Read existing data
    const fileData = fs.readFileSync(appsFile, 'utf-8');
    const apps = JSON.parse(fileData);
    //   ✅ Add or update alias
    if (alias.toLowerCase() in apps) {
        console.log(chalk.red("❌ Error: Alias already exists"));
        return;
    }
    apps[alias.toLowerCase()] = appPath;
    // 💾 Write back to file
    fs.writeFileSync(appsFile, JSON.stringify(apps, null, 2), 'utf-8');
    console.log(chalk.green("✅ Added alias"));
};
export const Show = () => {
    if (!fs.existsSync(appsFile)) {
        fs.writeFileSync(appsFile, JSON.stringify({}), "utf-8");
    }
    const fileData = fs.readFileSync(appsFile, "utf-8");
    const apps = JSON.parse(fileData);
    const aliases = Object.keys(apps);
    if (aliases.length === 0) {
        console.log(chalk.yellow("⚠️  No applications saved yet. Use `openapp add` to add one."));
        return;
    }
    // Build table
    const table = new Table({
        head: [chalk.cyan("Alias"), chalk.cyan("Path")],
        style: { head: [], border: ["grey"] }
    });
    aliases.forEach((alias) => {
        table.push([chalk.green(alias), apps[alias]]);
    });
    console.log(chalk.bold("\n📂 Saved Applications:\n"));
    console.log(table.toString());
};
export const Execute = (alias) => {
    if (!fs.existsSync(appsFile)) {
        fs.writeFileSync(appsFile, JSON.stringify({}), 'utf-8');
    }
    if (!alias.toLowerCase()) {
        console.log("please provide the app name");
    }
    // 📖 Read existing data
    const fileData = fs.readFileSync(appsFile, 'utf-8');
    const apps = JSON.parse(fileData);
    if (!(alias.toLowerCase() in apps)) {
        console.log("First add the path of application");
        return;
    }
    const path = apps[alias.toLowerCase()];
    //Running the application;
    execFile(path, (error) => {
        if (error) {
            console.error(`❌ Failed to open app: ${error.message}`);
            return;
        }
        console.log(`🚀 App launched: ${path}`);
    });
};
export const Delete = (alias) => {
    if (!fs.existsSync(appsFile)) {
        console.log("⚠️ No apps saved yet.");
        return;
    }
    const data = fs.readFileSync(appsFile, 'utf-8');
    const apps = JSON.parse(data);
    const existingKey = Object.keys(apps).find((key) => key.toLowerCase() === alias.toLowerCase());
    if (!existingKey) {
        console.log(`❌ Alias '${alias}' not found.`);
        return;
    }
    delete apps[existingKey];
    fs.writeFileSync(appsFile, JSON.stringify(apps, null, 2), 'utf-8');
    console.log(`🗑️ Deleted alias '${existingKey}'`);
};
export const DeleteAll = (force = false) => {
    if (!fs.existsSync(appsFile)) {
        console.log("⚠️ No apps saved yet.");
        return;
    }
    const clearAll = () => {
        fs.writeFileSync(appsFile, JSON.stringify({}, null, 2), 'utf-8');
        console.log("🧹 All aliases have been deleted.");
    };
    if (force) {
        clearAll();
        return;
    }
    // Ask for confirmation
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question("⚠️ Are you sure you want to delete ALL aliases? (y/N): ", (answer) => {
        rl.close();
        if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
            clearAll();
        }
        else {
            console.log("❌ Cancelled.");
        }
    });
};
export const Rename = async (alias) => {
    if (!alias) {
        console.log("❌ Please provide an alias.");
        return;
    }
    if (!fs.existsSync(appsFile)) {
        console.log("⚠️ No apps saved yet.");
        return;
    }
    const fileData = fs.readFileSync(appsFile, 'utf-8');
    const apps = JSON.parse(fileData);
    const existingKey = Object.keys(apps).find((key) => key.toLowerCase() === alias.toLowerCase());
    if (!existingKey) {
        console.log(`❌ Alias '${alias}' not found.`);
        return;
    }
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    const askQuestion = (question) => {
        return new Promise((resolve) => {
            rl.question(question, (answer) => resolve(answer));
        });
    };
    const newPath = await askQuestion(`✏️ Enter new path for '${existingKey}': `);
    rl.close();
    if (!newPath) {
        console.log("❌ No path entered. Rename cancelled.");
        return;
    }
    apps[existingKey] = newPath;
    fs.writeFileSync(appsFile, JSON.stringify(apps, null, 2), 'utf-8');
    console.log(`✅ Updated alias '${existingKey}' → ${newPath}`);
};
