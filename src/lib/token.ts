import jwt from "jsonwebtoken";

export function createSecretToken(id: string): string {
	return jwt.sign({ id }, process.env.TOKEN_KEY as string, {
		expiresIn: 3 * 24 * 60 * 60,
	});
}
