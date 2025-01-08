/**
 * 日志装饰器
 * @param {string} prefix - 前缀
 * @param {string} post - 后缀
 * @returns {function} - 装饰后的函数
 */
export const logDecorator = (prefix='', post='')=>{
    return (msg='')=>{
       let data = [prefix, ...msg, post];
       console.log(...data);
    }
}

