import nodemailer from 'nodemailer';
import { markdownToHtml } from './md.js';
const userInfo = {
    USER_NAME: "15816195453@163.com", // 你的163邮箱地址
    PASSWORD: "XMyivFMSucgTPM9q", // 你的163邮箱密码
    AUTH_CODE: "XMyivFMSucgTPM9q", // 你的163邮箱授权码
    EMAIL_SEND: "15816195453@163.com", // 你的163邮箱地址
    EMAIL_RECIPIENT: "jser@faisco.biz" // 收件人邮箱地址
}


// 邮件发送函数
export async function send163Email(options) {
    let {content, title, markdown=false} = options
  try {

    if(markdown){
        content = markdownToHtml(content)
    }

    // 创建邮件发送器
    const transporter = nodemailer.createTransport({
        host: 'smtp.163.com',  // 163邮箱的SMTP服务器
        port: 465,              // SMTP端口
        secure: true,           // 使用SSL
        auth: {
            user: userInfo.USER_NAME,     // 从环境变量获取
            pass: userInfo.AUTH_CODE    // 从环境变量获取
        }
    });

    // 设置邮件内容
    const mailOptions = {
      from: userInfo.EMAIL_SEND,      // 发件人
      to: userInfo.EMAIL_RECIPIENT,   // 收件人
      subject: title,             // 邮件主题
      html: content,
      headers: {
        'Content-Type': 'text/html; charset=UTF-8', // 指定内容类型为HTML
        'MIME-Version': '1.0' // 指定MIME版本
      }                        // 邮件内容
    };

    // 发送邮件
    const info = await transporter.sendMail(mailOptions);
    console.log('邮件发送成功:', info.messageId);
    return true;
  } catch (error) {
    console.error('邮件发送失败:', error);
    return false;
  }
}
