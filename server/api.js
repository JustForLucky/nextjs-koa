const axios = require("axios")
const { requestGithub } = require('../lib/api')
const { GITHUB_BASE_URL } = require("../config");

function api(server) {
  server.use(async (ctx, next) => {
        const path = ctx.path
        const method = ctx.method
        if (path.startsWith("/github/")) {
          console.log(ctx.request.body)
          const headers = {}
          const session = ctx.session
          const githubAuth = (session && session.githubAuth) || {}
          if (githubAuth && githubAuth.access_token) {
              headers['Authorization'] = `${githubAuth.token_type} ${githubAuth.access_token}`
          }
          const result = await requestGithub(method, ctx.url.replace('/github/', '/'), 
            ctx.request.body || {}
          , headers)
          ctx.status = result.status
          ctx.body = result.data
        } else {
          await next()
        }
  })
}


// function api(server) {
//   server.use(async (ctx, next) => {
//     const path = ctx.path;
//     if (path.startsWith("/github/")) {
//       const githubAuth = ctx.session.githubAuth;
//       const githubPath = `${GITHUB_BASE_URL}${ctx.url.replace("/github/", "/")}`;
//       const token = githubAuth && githubAuth.access_token;
//       let headers = {};
//       if (token) {
//         headers[
//           "Authorization"
//         ] = `${githubAuth.token_type} ${githubAuth.access_token}`;
//       }
//       try {
//         const result = await axios({
//           method: "GET",
//           url: githubPath,
//           headers,
//         });
//         if (result.status === 200) {
//           ctx.body = result.data;
//           ctx.set("Content-Type", "application/json");
//         } else {
//           ctx.status = result.status;
//           ctx.body = {
//             success: false,
//           };
//           ctx.set("Content-Type", "application/json");
//         }
//       } catch (error) {
//         console.log(error);
//         ctx.body = {
//           success: false,
//         };
//         ctx.set("Content-Type", "application/json");
//       }
//     } else {
//       await next();
//     }
//   });
// }

module.exports = api;
