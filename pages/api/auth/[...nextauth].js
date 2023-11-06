// import { mongooseConnect } from "@/lib/mongoose";
// import { User } from "@/models/user";
// import NextAuth from "next-auth/next"
// import bcrypt from "bcryptjs"
// import GoogleProvider from "next-auth/providers/google";
// import GitHubProvider from "next-auth/providers/github";
// // import Providers from "next-auth/providers";
// // import { CredentialsProvider } from "next-auth/providers/credentials"
// import CredentialsProvider from "next-auth/providers/credentials";

//  const authOptions={
//     providers:[
       
//         GoogleProvider({
//             clientId: process.env.GOOGLE_ID,
//             clientSecret: process.env.GOOGLE_SECRET
//           }),
//           // GitHubProvider({
//           //   clientId: process.env.GITHUB_ID,
//           //   clientSecret: process.env.GITHUB_SECRET
//           // })
//     ],

//     // session: {
//     //     strategy: "jwt",
//     //   },
//     //   secret: process.env.NEXTAUTH_SECRET,
//     //   pages: {
//     //     signIn: "/login",
//     //   },
// }


// // const handler= NextAuth(authOptions)

// export default NextAuth(authOptions)

// // export {handler as GET, handler as POST}