import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import InstagramProvider from "next-auth/providers/instagram";
import LinkedInProvider from "next-auth/providers/linkedin";
import TwitterProvider from "next-auth/providers/twitter";

// TikTok provider (custom)
const TikTokProvider = (options) => ({
  id: "tiktok",
  name: "TikTok",
  type: "oauth",
  authorization: {
    url: "https://open-api.tiktok.com/platform/oauth/connect",
    params: {
      client_key: options.clientId,
      response_type: "code",
      scope: "user.info.basic",
    },
  },
  token: {
    url: "https://open-api.tiktok.com/oauth/access_token/",
    params: {
      client_key: process.env.TIKTOK_CLIENT_KEY,
      client_secret: process.env.TIKTOK_CLIENT_SECRET,
      grant_type: "authorization_code",
    },
  },
  userinfo: "https://open-api.tiktok.com/user/info/",
  profile(profile) {
    return {
      id: profile.data?.user?.id || null,
      name: profile.data?.user?.display_name || "",
      email: null,
      image: profile.data?.user?.avatar_large || null,
    };
  },
  ...options,
});

export const authOptions = {
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      authorization: { params: { scope: "public_profile,email" } },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    InstagramProvider({
      clientId: process.env.INSTAGRAM_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
      version: "2.0",
    }),
    TikTokProvider({
      clientId: process.env.TIKTOK_CLIENT_ID,
      clientSecret: process.env.TIKTOK_CLIENT_SECRET,
    }),
  ],
  debug: true,

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },

    async jwt({ token, account, profile, user }) {
      console.log("JWT Callback - Account:", account);
      console.log("JWT Callback - Profile:", profile);
      console.log("USER is as - User:", user);

      if (account && profile) {
        const providerName = account.provider;

        console.log("Id condition inside the JWT Token Triggered..!=====>");

        token.id = profile.sub ?? null;
        token.name = profile.name ?? "";
        token.email = profile.email ?? "";
        token.profileUrl = "";

        // Set the profile URL based on provider
        switch (providerName) {
          case "twitter":
            token.profileUrl = `https://twitter.com/${profile.username}`;
            break;
          case "linkedin":
            token.profileUrl = profile.publicProfileUrl || "";
            break;
          case "facebook":
            token.profileUrl = `https://www.facebook.com/${account.id}`;
            break;
          case "instagram":
            token.profileUrl = `https://www.instagram.com/${account.id}`;
            break;
          case "google":
            token.profileUrl = `https://plus.google.com/${user.id}`;
            break;
          case "tiktok":
            token.profileUrl = `https://www.tiktok.com/@${profile.unique_id}`;
            break;
          case "telegram":
            token.profileUrl = `https://t.me/${profile.name}`;
            break;
          default:
            token.profileUrl = "";
        }
      }
      return token;
    },

    async session({ session, token }) {
      console.log("Session Callback - Token:", token);
      console.log("Session Callback = Session: ", session);
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
};

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;

// Redurect URI links

// https://yourdomain.com/api/auth/callback/{provider}
// https://yourdomain.com/api/auth/callback/facebook
// https://yourdomain.com/api/auth/callback/google
// https://yourdomain.com/api/auth/callback/instagram
// https://yourdomain.com/api/auth/callback/linkedin
// https://yourdomain.com/api/auth/callback/twitter
// https://yourdomain.com/api/auth/callback/tiktok

// Telegram is have diferent
// https://yourdomain.com/api/auth/telegram
