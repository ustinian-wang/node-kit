import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as path from 'node:path';
import * as fs from 'node:fs/promises';
import {
  createFileIfNotExist,
  traverseDir,
  checkFileExists,
  deleteFile,
  deleteDir,
  isFile,
  isDir,
  copyDir,
  copyFile,
  readJSONFile,
  writeJSONFile
} from '../src/utils/fs.js';

const testDir = './test-tmp';

beforeEach(async () => {
  // 创建临时测试目录
  await fs.mkdir(testDir, { recursive: true });
});
afterEach(async () => {
  // 删除临时测试目录
  await fs.rm(testDir, { recursive: true, force: true });
});

describe('fs utils', () => {
  it('createFileIfNotExist should create file', async () => {
    const filePath = path.join(testDir, 'a.txt');
    await createFileIfNotExist(filePath);
    const exists = await checkFileExists(filePath);
    expect(exists).toBe(true);
  });

  it('writeJSONFile & readJSONFile', async () => {
    const filePath = path.join(testDir, 'data.json');
    const data = { a: 1, b: 2 };
    await writeJSONFile(filePath, data);
    const readData = await readJSONFile(filePath);
    expect(readData).toEqual(data);
  });

  it('deleteFile should remove file', async () => {
    const filePath = path.join(testDir, 'b.txt');
    await fs.writeFile(filePath, 'test');
    await deleteFile(filePath);
    const exists = await checkFileExists(filePath);
    expect(exists).toBe(false);
  });

  it('isFile & isDir', async () => {
    const filePath = path.join(testDir, 'c.txt');
    await fs.writeFile(filePath, 'test');
    expect(isFile(filePath)).toBe(true);
    expect(await isDir(testDir)).toBe(true);
  });

  // 你可以继续补充 copyDir, copyFile, traverseDir, deleteDir 等方法的测试
});
