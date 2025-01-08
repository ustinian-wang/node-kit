/*
 * @Author: ustinian-wang wangjser@gmail.com
 * @Date: 2025-01-09 02:56:19
 * @LastEditors: ustinian-wang wangjser@gmail.com
 * @LastEditTime: 2025-01-09 03:35:17
 * @FilePath: \node-kit\src\features\ssh.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import client from "scp2";
import { Client } from "ssh2";

const logSSH = logDecorator('ssh: ');

/**
 * @typedef {Object} SSHConfig
 * @property {string} host - 主机
 * @property {number} port - 端口
 * @property {string} username - 用户名
 * @property {string} privateKey - 私钥
 */

/**
 * Uploads a file to a remote server via SSH and executes a command to extract it.
 *
 * @param {Object} options - The options for the upload.
 * @param {SSHConfig} options.config - The config for the upload.
 * @param {string} options.src - The source file path.
 * @param {string} options.dist - The destination file path.
 * @returns {Promise<void>} A promise that resolves when the upload and command execution are complete.
 * @throws {Error} Throws an error if the upload or command execution fails.
 */
export async function uploadSSH(options) {
  let { config, src, dist } = options;

  return new Promise((resolve, reject) => {
    client.defaults(config);
    client.upload(src, dist, function (err) {
      if (err) {
        return reject(err);
      }
      resolve(res);
    });
  });
}

/**
 * 执行命令
 * @param {SSHConfig} config - 配置
 * @param {string} cmd - 命令
 * @returns {Promise<[number, string]>} - 返回码
 */
export async function execSSHCMD(config, cmd) {
  return new Promise((resolve, reject) => {
    // //下面作命令执行
    const conn = new Client();
    conn.on("ready", () => {
      // console.log("Client :: ready");
      conn.exec(cmd, (err, stream) => {
        if (err) throw err;
        stream
          .on("close", resolve)
          .on("data", (data) => {
            // console.log("STDOUT: " + data);
          })
          .stderr.on("data", reject);
      });
    }).connect(config);
  });
}

/**
 * 部署文件
 * @param {Object} config - 配置
 * @param {string} src - 源文件
 * @param {string} dist - 目标文件
 * @returns {boolean} - 是否成功
 */
export async function deploySSHAssert(config, src, dist) {
  let res = null;

  res = checkConfig(config);
  if(!res.success){
    logSSH(res.msg);
    return false;
  }

  try {
    res = await uploadSSH(config, src, dist);
  } catch (e) {
    logSSH("upload file failed", e);
    return false;
  }
  let { code, signal } = await execSSHCMD(config, `cd ${dist} && tar -xzvf ${src}`);
  if (code !== 0) {
    logSSH("upload file failed; code=", code, "; signal=", signal);
    return false;
  }
  return true;
}

/**
 * @description 检查配置
 * @param {Object} config - 配置
 * @returns {ResultDef} - 结果
 */
function checkConfig(config) {
  if (!config) {
    return getResult(false, "config is invalid");
  }
  if (!config.host) {
    return getResult(false, "host is invalid");
  }
  if (!config.port) {
    return getResult(false, "port is invalid");
  }
  if (!config.username) {
    return getResult(false, "username is invalid");
  }
  if (!config.privateKey) {
    return getResult(false, "privateKey is invalid");
  }
  if (!checkFileExists(config.privateKey)) {
    return getResult(false, "privateKey is not exists");
  }

  return getResult(true, "config is valid");
}
