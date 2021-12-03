const { OAuth2Client } = require("google-auth-library");
const cliente = new OAuth2Client(process.env.GOOGLE_ID);

const googleVerify = async (token) => {
	const ticket = await cliente.verifyIdToken({
		idToken: token,
		audience: process.env.GOOGLE_ID
	});

	const payload = ticket.getPayload();
	const { name, email, picture } = payload;

	return { name, email, picture };
}

module.exports = {
	googleVerify
}