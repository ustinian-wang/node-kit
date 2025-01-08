/**
 * @typedef {Object} ResultDef
 * @property {boolean} success - 是否成功
 * @property {string} msg - 消息
 * @property {any} data - 数据
 */

/**
 * 返回结果
 * @param {boolean} success - 是否成功
 * @param {string} msg - 消息
 * @param {any} data - 数据
 * @returns {ResultDef} - 结果
 */
export function getResult(success, msg='', data=null){
    return { success, msg, data };
}
