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

/**
 * 创建一个流程日志装饰器
 * @returns {function} - 装饰后的函数
 */
export const createFlowLog = ()=>{
    const flow = performance.now()+"";
    return logDecorator(`flow:{${flow}}`);
}