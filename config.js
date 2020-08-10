const GITHUB_OAUTH_URL = 'https://github.com/login/oauth/authorize'
const SCOPE = 'user'
const GITHUB_BASE_URL = 'https://api.github.com'
const config = {
    github: {
        request_token_url: 'https://github.com/login/oauth/access_token',
        client_id: 'b79aa62b3813fa470d26',
        client_secret: '8499120baff6d2215c48f01c20c0857c00e3ac99',
    },
    githubAPI: {
        user: `${GITHUB_BASE_URL}/user`
    },
    GITHUB_OAUTH_URL,
    GITHUB_BASE_URL
}
config.OAUTH_URL = `${GITHUB_OAUTH_URL}?scope=${SCOPE}&client_id=${config.github.client_id}`

module.exports = config
