import fs from 'fs';
import os from 'os';
import path from 'path';
import {execFile} from "child_process"
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
    if(!alias){
        console.log("please provide the app name");
    }
    // 📖 Read existing data
    const fileData = fs.readFileSync(appsFile, 'utf-8');
    const apps = JSON.parse(fileData);
    if(!(alias in apps)){
        console.log("First add the path of application")
        return;
    }
    const path=apps[alias];
  
    //Running the application;
      execFile(path, (error:any) => {
    if (error) {
      console.error(`❌ Failed to open app: ${error.message}`);
      return;
    }
    console.log(`🚀 App launched: ${path}`);
  });

}
 
