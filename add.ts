import fs from 'fs';
import os from 'os';
import path from 'path';
import {execFile} from "child_process"
import readline from 'readline'
const appsFile = path.join(os.homedir(), '.OpenAppThroughCli', 'path.json');

// ✅ Ensure directory exists
const dir = path.dirname(appsFile);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// ✅ Add function
export const Add = (alias: string, appPath: string): void => {
  // 🔒 If file doesn't exist, create it with empty object
  if(!alias || !appPath){
    console.log("please provide the correct alias or appPath")
  }
  if (!fs.existsSync(appsFile)) {
    fs.writeFileSync(appsFile, JSON.stringify({}), 'utf-8');
  }

  // 📖 Read existing data
  const fileData = fs.readFileSync(appsFile, 'utf-8');
  const apps = JSON.parse(fileData);

//   ✅ Add or update alias
if(alias in apps){
    console.log('hey alias is already present')
    return;
}

  apps[alias] = appPath;

  // 💾 Write back to file
  fs.writeFileSync(appsFile, JSON.stringify(apps, null, 2), 'utf-8');

//   console.log(cls`✅ Added alias '${alias}' → ${appPath}`);
};

export const Show=():void=>{
     if (!fs.existsSync(appsFile)) {
    fs.writeFileSync(appsFile, JSON.stringify({}), 'utf-8');
  }

  // 📖 Read existing data
  const fileData = fs.readFileSync(appsFile, 'utf-8');
  const apps = JSON.parse(fileData);
  console.log(apps)
}

export const Execute=(alias:string):void=>{
       if (!fs.existsSync(appsFile)) {
        fs.writeFileSync(appsFile, JSON.stringify({}), 'utf-8');
    }
    if(!alias.toLowerCase()){
        console.log("please provide the app name");
    }
    // 📖 Read existing data
    const fileData = fs.readFileSync(appsFile, 'utf-8');
    const apps = JSON.parse(fileData);
    if(!(alias.toLowerCase() in apps)){
        console.log("First add the path of application")
        return;
    }
    const path=apps[alias.toLowerCase()];
  
    //Running the application;
      execFile(path, (error:any) => {
    if (error) {
      console.error(`❌ Failed to open app: ${error.message}`);
      return;
    }
    console.log(`🚀 App launched: ${path}`);
  });

}
export const Delete=(alias:string):void=>{
  if (!fs.existsSync(appsFile)) {
    console.log("⚠️ No apps saved yet.");
    return;
  }

  const data = fs.readFileSync(appsFile, 'utf-8');
  const apps = JSON.parse(data);

  const existingKey = Object.keys(apps).find(
    (key) => key.toLowerCase() === alias.toLowerCase()
  );

  if (!existingKey) {
    console.log(`❌ Alias '${alias}' not found.`);
    return;
  }

  delete apps[existingKey];

  fs.writeFileSync(appsFile, JSON.stringify(apps, null, 2), 'utf-8');

  console.log(`🗑️ Deleted alias '${existingKey}'`);

}

export const DeleteAll = (force: boolean = false): void => {
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
    } else {
      console.log("❌ Cancelled.");
    }
  });
};