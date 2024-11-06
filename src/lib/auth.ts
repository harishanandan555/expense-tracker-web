import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import Google from "next-auth/providers/google";

import { db } from "@/lib/db";
import {google} from "../../data.json"
// redirect_uri: "http://localhost:3000/api/auth/callback/google"

let NEXTAUTH_SEC = "7dBS+GeL22Ilenx6t0DsDqoKnJuzWoUQPbcll+UPxjs="        // openssl rand -base64 32
let NEXTAUTH_JWT_SEC = "iaw2FR2ZhSNkjxR5KrLe42IvbRMTmhV5r2ZcVA3QrN8= "    // openssl rand -base64 32

export const authOptions = {
	adapter: PrismaAdapter(db),
	providers: [
		Google({
			clientId: google.google_client_id!,
			clientSecret: google.google_client_sec!,
		}),
	],
	session: { strategy: "jwt" },
	jwt: {
		secret: NEXTAUTH_JWT_SEC,
	},
	secret: NEXTAUTH_SEC,
} as AuthOptions;