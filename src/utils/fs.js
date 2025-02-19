import { promises as fs } from 'fs';

/**
 * 创建文件如果不存在
 * @param {string} filePath 文件路径
 * @returns {Promise<void>} 创建文件的Promise
 */
export async function createFileIfNotExist(filePath) {
    try {
        // 尝试访问文件
        await fs.access(filePath);
    } catch (error) {
        // 如果文件不存在，则创建文件
        if (error.code === 'ENOENT') {
            await fs.writeFile(filePath, '');
        } else {
            // 如果不是ENOENT错误，则抛出错误
            throw error;
        }
    }
}

/**
 * 遍历目录的文件函数
 * @param {string} dirPath 目录路径
 * @returns {Promise<string[]>} 文件列表
 */
export async function traverseDir(dirPath) {
    // 读取目录中的文件列表
    const files = await fs.readdir(dirPath);
    // 对每个文件进行处理
    const filePromises = files.map(async (file) => {
        // 构建文件的完整路径
        const filePath = `${dirPath}/${file}`;
        // 获取文件的状态
        const stats = await fs.stat(filePath);
        // 如果是目录，则递归遍历
        if (stats.isDirectory()) {
            return traverseDir(filePath);
        } else {
            // 如果是文件，则返回文件路径
            return filePath;
        }
    });
    // 等待所有文件处理完成，并返回所有文件路径的数组
    return Promise.all(filePromises).then((results) => results.flat());
}

/**
 * 检查文件是否存在
 * @param {string} filePath 文件路径
 * @returns {Promise<boolean>} 文件是否存在
 */
export async function checkFileExists(filePath) {
    try {
        // 尝试访问文件
        await fs.access(filePath);
        // 如果成功访问，则文件存在
        return true;
    } catch (error) {
        // 如果访问失败，则检查错误代码
        if (error.code === 'ENOENT') {
            // 如果是ENOENT错误，则文件不存在
            return false;
        } else {
            // 如果不是ENOENT错误，则抛出错误
            throw error;
        }
    }
}

/**
 * @description 删除文件
 * @param {string} filePath 文件路径
 * @returns {Promise<void>} 删除文件的Promise
 */
export async function deleteFile(filePath) {
    if(await checkFileExists(filePath) && await isFile(filePath)){
        await fs.unlink(filePath);
    }
}

/**
 * @description 删除目录及其所有内容
 * @param {string} dirPath 目录路径
 * @returns {Promise<void>} 删除目录的Promise
 */
export async function deleteDir(dirPath) {
    const files = await fs.readdir(dirPath);
    const deletePromises = files.map(async (file) => {
        const filePath = `${dirPath}/${file}`;
        const stats = await fs.stat(filePath);
        if (stats.isDirectory()) {
            return deleteDir(filePath); // 递归删除子目录
        } else {
            return fs.unlink(filePath); // 删除文件
        }
    });
    await Promise.all(deletePromises);
    await fs.rmdir(dirPath); // 删除空目录
}

/**
 * @description 检查文件是否存在
 * @param {string} filePath 文件路径
 * @returns {Promise<boolean>} 文件是否存在
 */
export const isFile = async (filePath)=>{
    const stats = await fs.stat(filePath);
    return stats.isFile();
}

/**
 * @description 检查目录是否存在
 * @param {string} dirPath 目录路径
 * @returns {Promise<boolean>} 目录是否存在
 */
export const isDir = async (dirPath)=>{
    const stats = await fs.stat(dirPath);
    return stats.isDirectory();
}

/**
 * @description 复制目录
 * @param {string} srcDir 源目录路径
 * @param {string} distDir 目标目录路径
 * @returns {Promise<boolean>} 复制目录的Promise
 */
export async function copyDir(srcDir, distDir){
    //判断是否存在
    if(!fs.existsSync(srcDir)){
        return false;
    }
    if(!fs.existsSync(distDir)){
        return false;
    }
    //判断是否是文件夹
    if(!fs.statSync(srcDir).isDirectory()){
        return false;
    }
    if(!fs.statSync(distDir).isDirectory()){
        return false;
    }
    //获取文件夹下的所有文件
    var srcFiles = fs.readdirSync(srcDir);

    let saveTasks =  srcFiles.filter((fileName, index)=>{
        var srcFilePath = path.join(srcDir, fileName);

        var fileStats = fs.statSync(srcFilePath);
        if(fileStats.isDirectory()){//如果是目录，直接跳过
            return false;
        }
        return true;
    }).map((fileName, index)=>{
        var srcFilePath = path.join(srcDir, fileName);
        var distFilePath = path.join(distDir, fileName);

        return copyFile(srcFilePath, distFilePath);
    });

    await Promise.all(saveTasks);
}

/**
 * @description 复制文件
 * @param {string} srcFilePath 源文件路径
 * @param {string} distFilePath 目标文件路径
 * @returns {Promise<boolean>} 复制文件的Promise
 */
export async function copyFile(srcFilePath, distFilePath){
    await fs.copyFile(srcFilePath, distFilePath);
}

/**
 * @description 读取JSON文件
 * @param {string} filePath 文件路径
 * @returns {Promise<object>} 文件内容
 */
export async function readJSONFile(filePath){
    let fileContent = await fs.readFile(filePath);
    return JSON.parse(fileContent);
}

/**
 * @description 写入JSON文件
 * @param {string} filePath 文件路径
 * @param {object} data 数据
 * @returns {Promise<void>} 写入文件的Promise
 */
export async function writeJSONFile(filePath, data){
    await fs.writeFile(filePath, JSON.stringify(data));
}

