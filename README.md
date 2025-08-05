# frik-cli 🚀

> Open your desktop applications blazing fast from your terminal using simple aliases.

**frik-cli** is a global CLI tool that lets you launch your favorite apps from anywhere in your terminal. Set a one-time alias for any app, and never browse your system or desktop menu again.

---

## 🔧 Installation

You can install `frik-cli` globally using **npm**, **pnpm**, or **yarn**:

```bash
npm install -g frik-cli
# OR
pnpm add -g frik-cli
# OR
yarn global add frik-cli
```

---

## 🚀 Usage

### 1. Add an alias for an app
Use this command to register any application by alias:

```bash
frik add <alias> <absolute-path-to-app>
```

#### Example:
```bash
frik add postman "C:/Users/yourname/AppData/Local/Postman/Postman.exe"
```

### 2. Launch the app using the alias

```bash
frik run <alias>
```

#### Example:
```bash
frik run postman
```

Boom 💥 — Postman opens instantly!

---

## 📄 Commands

| Command           | Description                                |
|------------------|--------------------------------------------|
| `frik add`        | Add a new app alias                        |
| `frik run`       | Open the app associated with an alias      |
| `frik list` _(optional)_ | List all saved aliases (if implemented) |
| `frik remove` _(optional)_ | Remove an alias (if implemented)     |

---

## 🌐 How it Works

- Stores your alias-to-path mapping in a local JSON file inside:
  ```
  ~/.start-o/apps.json
  ```
- Cross-platform support (Windows, macOS, Linux – path formats may differ)
- Built with Node.js + TypeScript + Commander.js

---

## 📦 Tech Stack

- [Node.js](https://nodejs.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Commander.js](https://www.npmjs.com/package/commander)
- [fs](https://nodejs.org/api/fs.html) for file-based alias storage

---

## 🛠 Example Use Cases

- `frik add chrome "C:/Program Files/Google/Chrome/Application/chrome.exe"`
- `frik add vs "C:/Users/YourName/AppData/Local/Programs/Microsoft VS Code/Code.exe"`
- `frik run vs` → launches VS Code in a flash

---

## 📥 Contributing

Want to contribute? PRs and ideas welcome!

- Add features like `frik remove`, `frik list`, UI improvements, or encryption
- Create cross-platform enhancements

---

## 📄 License

MIT License © 2025 [Tanmay Joshi](https://github.com/tanmayjoshi)

---

## ❤️ Made with `frik` and fast fingers
