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

