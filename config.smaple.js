const GITHUB_OAUTH_URL = 'https://github.com/login/oauth/authorize'
const SCOPE = 'user'
const GITHUB_BASE_URL = 'https://api.github.com'
const config = {
    github: {
        request_token_url: 'https://github.com/login/oauth/access_token',
        client_id: '',
        client_secret: '',
    },
    githubAPI: {
        user: `${GITHUB_BASE_URL}/user`
    },
    GITHUB_OAUTH_URL,
    GITHUB_BASE_URL
}
config.OAUTH_URL = `${GITHUB_OAUTH_URL}?scope=${SCOPE}&client_id=${config.github.client_id}`

module.exports = config
