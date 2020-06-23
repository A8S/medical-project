const express = require('express');
const router = express.Router();
const Mailchimp = require('mailchimp-api-v3');
const fetch = require('node-fetch');
var mailchimp = new Mailchimp('8e8239829f5f34b421d1cbc9f5b3d520-us10');

router.post('/subscribe', (req, res) => {
	const { email } = req.body;
	if (!email) {
		res.send('enter valid email');
		return;
	}

	// Construct req data
	const data = {
		members: [
			{
				email_address: email,
				status: 'subscribed'
			}
		]
	};

	const postData = JSON.stringify(data);

	fetch('https://us10.api.mailchimp.com/3.0/lists/1b0c37da6e', {
		method: 'POST',
		headers: {
			Authorization: 'auth 7d77484da36a004847013686d4c642a4-us10'
		},
		body: postData
	})
		.then(
			res.statusCode === 200
				? res.send({ status: 200, content: 'subscription successful' })
				: res.send('try again')
		)
		.catch((err) => console.log(err));
});

module.exports = router;
