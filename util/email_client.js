const nodemailer = require('nodemailer');  
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        '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'
    }
  })
);  
exports.sendEmail = (mailOptions) => new Promise((resolve, reject) => {   
	transporter.sendMail(mailOptions, function(error, info) {     
		if (error) {       
			return reject(error);     
		} 
		else {       
			console.log('Email sent: ' + info.response);       
			return resolve(true);     
		}   
	});
});