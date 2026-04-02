import jwt from "jsonwebtoken";

export function createSecretToken(id: string): string {
	return jwt.sign({ id }, process.env.TOKEN_KEY as string, {
		expiresIn: 3 * 24 * 60 * 60,
	});
}

export function verifyToken(token: string): { id: string } | null {
	try {
		const payload = jwt.verify(token, process.env.TOKEN_KEY as string);
		if (typeof payload === "object" && payload !== null && "id" in payload) {
			return { id: payload.id as string };
		}
		return null;
	} catch {
		return null;
	}
}
