const nodemailer = require("nodemailer");
const settings = require('../modals/settings');

const sendMail = async (userData, token, path) => {
    return new Promise(async (resolve, reject) => {
        let setting = await getSettings();
        const transporter = nodemailer.createTransport({
            host: setting.host,
            port: setting.port,
            secure: true,
            service: setting.service,
            auth: {
                user: setting.user,
                pass: setting.pass
            }
        });
        let mailOptions = {
            from: setting.user, // sender address
            to: userData.email, // list of receivers
            subject: "Forget Password", // Subject line
            text: "this is your password", // plain text body
            html: `<html> <head> <style type="text/css" rel="stylesheet" media="all"> body {width: 100% !important;height: 100%;margin: 0;-webkit-text-size-adjust: none;}a {color: #ff256f;text-decoration: none;}a img {border: none;}td {word-break: break-word;}body, td, th {font-family: "Nunito Sans", Helvetica, Arial, sans-serif;}h1 {margin-top: 0;color: #333333;font-size: 22px;font-weight: bold;text-align: left;}h2 {margin-top: 0;color: #333333;font-size: 16px;font-weight: bold;text-align: left;}h3 {margin-top: 0;color: #333333;font-size: 14px;font-weight: bold;text-align: left;}td, th {font-size: 16px;}p, ul, ol, blockquote {margin: .4em 0 1.1875em;font-size: 16px;line-height: 1.625;color: #6b6b6b;}p.sub {font-size: 13px;}</style> </head> <body> <table style="width: 100%;"> <tr> <td> <div style="background: #e9e9ea94;"> <h1 style="text-align: center;font-size: 30px;padding: 30px;"><a style="color: #ff256f;" href="javascript:void(0)" > Video Project </a></h1> </div> </td> </tr> </table> <table class="email-wrapper" style="margin: auto;"> <tr> <td align="center"> <table class="email-content"> <tr> <td class="email-body" width="100%" cellpadding="0" cellspacing="0"> <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation"> <tbody> <tr> <td class="content-cell"> <div class="f-fallback"> <h1>Hi ${userData.first_name}  ${userData.last_name}</h1> <p>You recently requested to reset your password for your [Product Name] account. Use the button below to reset it. <strong>This password reset is only valid for the next 24 hours.</strong></p> <!-- Action --> <div style="text-align: center;margin: 10%;"> <a href="${path}?token=${token}" style="background: #00860c;padding: 10px;border-radius: 5px;color: white;" target="_blank">Reset your password</a> </div> <p>For security, this request was received from a {{operating_system}}device using {{browser_name}}. If you did not request a password reset, please ignore this email or <a style="color: #ff256f;"href="javascript:void(0)" >contact support</a> if you have questions.</p> <p>Thanks, <br>The [Product Name] Team</p> <!-- Sub copy --> <table class="body-sub" role="presentation"> <tbody> <tr> <td> <p class="f-fallback sub">If you’re having trouble with the button above, copy and paste the URL below into your web browser.</p> <p class="f-fallback sub">{{action_url}}</p> </td> </tr> </tbody> </table> </div> </td> </tr> </tbody> </table> </td> </tr> </table> </td> </tr> </table> <table style="width: 100%;"> <tr> <td> <div style="text-align: center;background: #f2f2f3;padding: 15px;" > <p class="f-fallback sub align-center">© 2019 [Product Name]. All rights reserved.</p> <p class="f-fallback sub align-center"> [Company Name, LLC] <br>1234 Street Rd. <br>Suite 1234 </p> </div> </td> </tr> </table> </body> </html>`
        };
        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                resolve({ status: false, error: err }); // console.log('error sending email ----', err);
            } else {
                resolve({ status: true, message: 'Email Send SuccessFull' });
            }
        });
    });
}

const getSettings = async () => {    //  Get Setting  ----- 
    return new Promise(async (resolve, reject) => {
        let result = JSON.parse(JSON.stringify(await settings.findAll()));
        if (result) {
            let data = {
                host: result[0].value,
                port: result[1].value,
                service: result[2].value,
                user: result[3].value,
                pass: result[4].value,
            }
            resolve(data);
        } else {
            resolve(false);
        }
    });
}

module.exports = sendMail; 