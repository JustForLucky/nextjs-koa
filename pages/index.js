const api = require('../lib/api')

const Index = ({ userRepos, userStarredRepos, isLogin }) => {
    console.log(userRepos, 'userRepos')
    console.log(userStarredRepos, 'userStarredRepos')
    console.log(isLogin, 'isLogin')
    return (
        <span>Index</span>
    )
}

Index.getInitialProps = async ({ ctx, reduxStore }) => {
    const user = reduxStore.getState().user
    if (!user || !user.id) {
        return {
            isLogin: false
        }
    }
    const userRepos = await api.request({
        url: '/user/repos'
    }, ctx.req, ctx.res)
    const userStarredRepos = await api.request({
        url: '/user/starred'
    }, ctx.req, ctx.res )
    return {
        isLogin: true,
        userRepos: userRepos.data,
        userStarredRepos: userStarredRepos.data
    }
}

export default Index;