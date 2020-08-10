const axios = require('axios')

const isServer = typeof window === 'undefined'

const github_base_url = 'https://api.github.com'

async function requestGithub(method, url, data, headers = {}) {
    return await axios({
        method,
        url: `${github_base_url}${url}`,
        data,
        headers
    })
}

async function request({ method = 'GET', url, data ={} }, req, res) {
    if (!url) {
        throw new Error('url must provide')
    }
    if (isServer) {
        const headers = {}
        const session = req.session
        const githubAuth = session.githubAuth || {}
        if (githubAuth.access_token) {
            headers['Authorization'] = `${githubAuth.token_type} ${githubAuth.access_token}`
        }
        return await requestGithub(method, url, data, headers)
    }
    return await axios({
        method,
        url: `/github${url}`,
        data
    })
}

module.exports = {
    request,
    requestGithub
}