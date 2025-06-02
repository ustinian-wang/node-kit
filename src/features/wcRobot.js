import { httpPost } from "../utils/http";

/**
 * 发送 WCRobot 消息
 * @param {Object} options - 发送消息的选项
 * @param {string} options.url - WCRobot 的 URL
 * @param {Object} options.body - 消息体
 */
export function callWcRobot(options){
    httpPost({
        url: options.url,
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(options.body)
    })
}

/**
 * 发送 WCRobot Markdown 消息
 * @param {string} url - WCRobot 的 URL
 * @param {string} content - Markdown 内容
 */
export function callWcRobotMD(url, content){
    callWcRobot({
        url,
        body: {
            msgtype: 'markdown',
            markdown: {
                content: content,
            },
        }
    });
}

/**
 * 发送 WCRobot At Markdown 消息
 * @param {string} url - WCRobot 的 URL
 * @param {string} user - 被 @ 的用户
 * @param {string} content - Markdown 内容
 */
export function callWcRobotAtMD(url, user, content){
    callWcRobotMD(url, `<@${user}> ${content}`);
}
