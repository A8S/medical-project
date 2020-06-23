const express = require('express');
const router = express.Router();
const mail = require('node-mailjet');

const mailjet = mail.connect('b840ddb2510aa6f7bb1eb5ccdcdbc3cb', '69436eb9cc801f2e26c41316cbf1a916');

router.post('/submit_query', (req, res) => {
	console.log('here');
	const { name, email, query } = req.body;
	const request = mailjet.post('send', { version: 'v3.1' }).request({
		Messages: [
			{
				From: {
					Email: '17uec010@lnmiit.ac.in',
					Name: 'BTP'
				},
				To: [
					{
						Email: 'abhishek7soni@gmail.com',
						Name: 'Abhishek'
					}
				],
				Subject: 'Your customer has a query',
				TextPart: 'Customer Query',
				HTMLPart: `<h3>Dear admin , here's a customer query for you</h3><br />Name : ${name}<br/>Email : ${email}<br />Query : ${query}`,
				CustomID: 'Query'
			}
		]
	});
	request
		.then((result) => {
			res.send(result);
		})
		.catch((err) => {
			console.log(err.statusCode);
		});
});

module.exports = router;
