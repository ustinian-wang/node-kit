/*
 * @Author: ustinian-wang wangjser@gmail.com
 * @Date: 2025-01-09 02:52:47
 * @LastEditors: ustinian-wang wangjser@gmail.com
 * @LastEditTime: 2025-01-09 03:52:09
 * @FilePath: \node-kit\src\features\prompt.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import inquirer from 'inquirer';

/**
 * Prompts the user for input using Inquirer.js.
 * @param {string} question - The question to ask the user.
 * @param {string[]} choices - The list of choices for the user to select from.
 * @returns {Promise<string>} - The user's selected answer.
 */
export async function promptUser(question, choices) {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'response',
            message: question,
            choices: choices,
        },
    ]);
    return answers.response;
}

/**
 * Prompts the user for a yes/no confirmation.
 * @param {string} question - The question to ask the user.
 * @returns {Promise<boolean>} - True if the user confirms, false otherwise.
 */
export async function confirmAction(question) {
    const answers = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirm',
            message: question,
            default: false,
        },
    ]);
    return answers.confirm;
}
