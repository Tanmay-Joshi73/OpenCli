import fs from 'fs';
import { describe, expect, test } from '@jest/globals';
import path from 'path';
import { Add } from "../add";
const testFile = path.join('./', "test.path.json");
beforeEach(() => {
    if (!fs.existsSync(testFile)) {
        fs.writeFileSync(testFile, "{}", "utf-8"); // create empty JSON
    }
    else {
        fs.writeFileSync(testFile, "{}", "utf-8"); // clear file
    }
    global.appsFile = testFile;
});
describe('add module', () => {
    test("Add function should add Proper Alias and Path in Json File", () => {
        Add("Postman", "C://Desktop/Postman.exe");
        const Path = JSON.parse(fs.readFileSync(testFile, 'utf-8'));
        console.log(Path);
        console.log(typeof (Path));
        expect(Path).toHaveProperty("Postman", "C://Desktop/Postman.exe");
    });
});
