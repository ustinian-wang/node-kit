import { httpPost } from "../utils/http.js";

let apiKey = 'sk-yw81yFm9zSmf8XCmQRneZD9XCssIvUBudiUVbhGzkFZfw0ur';
let apiUrl = 'https://api.lkeap.cloud.tencent.com/v1';
/**
 * 
 * @param {string} question 
 * @returns <{choices: [{message: {content: string}}]}}
 */
export async function askDSR1AI(question) {
    console.log("jser 111", question)
    // let res = await httpPost({
    //     url: "https://www.baidu.com"
    // })
    // console.log("res", res)
    
    const response = await httpPost({
        url: `${apiUrl}/chat/completions`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: {
            model: "deepseek-r1",
            messages: [
                {
                    role: "user",
                    content: question
                }
            ],
            stream: false
        }
    });
    console.log("jser 222")

    if (!response) {
        console.log("jser 333")
        throw new Error(`HTTP error!`);
    }
    console.log("jser 444")
    console.log("response", response)
    return JSON.parse(response);
}