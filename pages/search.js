import Link from 'next/link'
import { withRouter } from 'next/router'
import { Row, Col, List } from 'antd'

const api = require('../lib/api')


const LANGUAGES = ['Javascript', 'HTML', 'CSS', 'TypeScript', 'Java', 'Rust']
const SORT_TYPES = [
    { name: 'Best Match' },
    { name: 'Most Stars', value: 'stars', order: 'desc' },
    { name: 'Fewest Stars', value: 'stars', order: 'asc' },
    { name: 'Most Forks', value: 'forks', order: 'desc' },
    { name: 'Fewes Forks', value: 'forks', order: 'asc' },
]

/**
 * sort: 排序方式
 * order: 排序顺序
 * lang: 仓库项目开发的主语言
 * page: 分页页面
 */

const Search = ({ router, repos }) => {
    console.log(repos, 'repos')
    return (
        <div className="root">
            <Row gutter={20}>
                <Col span={6}>
                    <List
                        bordered
                        header={<span className="list-header">语言</span>}
                        style={{ marginBottom: 20 }}
                        dataSource={LANGUAGES}
                        renderItem={lang => (
                            <List.Item>
                                <Link href="/search">
                                    <a>{lang}</a>
                                </Link>
                            </List.Item>
                        )}
                    />
                </Col>
                <Col span={18}>

                </Col>
            </Row>
        </div>
    )
}

Search.getInitialProps = async ({ ctx }) => {
    const { query, sort, order, lang, page } = ctx.query
    if (!query) {
        return {
            repos: {
                total_count: 0
            }
        }
    }

    // ?q=react+language:javascript&sort=stars&order=desc&page=2
    let queryString = `?q=${query}`
    if (lang) {
        queryString += `+language:${lang}`
    }
    if (sort) {
        queryString += `&sort=${sort}&order=${order || 'desc'}`
    }
    if (page) {
        queryString += `&page=${page}`
    }

    const result = await api.request({
        url: '/search/repositories' + queryString
    }, ctx.req, ctx.res)
    return {
        repos: result.data
    }
}

export default withRouter(Search)