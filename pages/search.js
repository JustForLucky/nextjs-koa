import { memo, isValidElement } from 'react'
import Router, { withRouter } from 'next/router'
import Link from 'next/link'
import { Row, Col, List, Pagination } from 'antd'
import Repo from '../components/Repo'

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
const selectedItemStyle = {
    borderLeft: '2px solid #e36209',
    fontWeight: 100
}
function noop() {}
const per_page = 20
const FilterLink = memo(({ name, nextQuery = {}}) => {
    const { lang, sort, page, order, query } = nextQuery
    let queryString = `?query=${query}`
    if (lang) {
        queryString += `&lang=${lang}`
    }
    if (sort) {
        queryString += `&sort=${sort}&order=${order || 'desc'}`
    }
    if (page) {
        queryString += `&page=${page}`
    }
    queryString += `&per_page=${per_page}`
    return (
        <Link href={`/search${queryString}`}>
            { isValidElement(name) ? name : <a>{name}</a> }
        </Link>
    )
})
const Search = ({ router, repos }) => {
    // const { sort, order, lange } = router.query
    const { page, ...currentQuery } = router.query
    return (
        <div className="root">
            <Row gutter={20}>
                <Col span={6}>
                    <List
                        bordered
                        header={<span className="list-header">语言</span>}
                        style={{ marginBottom: 20 }}
                        dataSource={LANGUAGES}
                        renderItem={lang => {
                            const selected = lang === currentQuery.lang
                            return (
                                <List.Item style={ selected ? selectedItemStyle :  {}}>
                                    {
                                        selected ? <span>{lang}</span> : (
                                            <FilterLink
                                                name={lang}
                                                nextQuery={{...currentQuery, lang }}
                                            />
                                        )
                                    }
                                    {/* <a onClick={doSearch.bind(null, { ...currentQuery, lang })}>{lang}</a> */}
                                </List.Item>
                            )
                        }}
                    />
                    <List
                        bordered
                        header={<span className="list-header">排序</span>}
                        style={{ marginBottom: 20 }}
                        dataSource={SORT_TYPES}
                        renderItem={ item => {
                            let selected = false
                            if (item.name === 'Best Match' && !currentQuery.sort && !currentQuery.desc) {
                                selected = true
                            } else if (currentQuery.sort === item.value && currentQuery.order === item.order) {
                                selected = true
                            }
                            return (
                                <List.Item style={ selected ? selectedItemStyle : {}}>
                                    {
                                        selected ? <span>{item.name}</span> : (
                                            <FilterLink
                                                name={item.name}
                                                nextQuery={{...currentQuery, sort: item.value || '', order: item.order || '' }}
                                            />
                                        )
                                    }
                                    {/* <a onClick={doSearch.bind(null, { ...currentQuery, sort: item.value || '', order: item.order || '' })}>{item.name}</a> */}
                                </List.Item>
                            )
                        }}
                    ></List>
                </Col>
                <Col span={18}>
                    <h3 className='repos-title'>{repos.total_count}个仓库</h3>
                    {
                        repos.items.map(repo => {
                            return (
                                <Repo repo={repo} key={repo.id} />
                            )
                        })
                    }
                    <div className='pagination'>
                        <Pagination 
                            pageSize={per_page}
                            showSizeChanger={false}
                            current={Number(page) || 1}
                            total={repos.total_count > 1000 ? 1000 : repos.total_count }
                            onChange={noop}
                            itemRender={(page, type, ol) => {
                                const _page = type === 'page' ? page : type === 'prev' ? page - 1 : page + 1
                                const name = type === 'page' ? page : ol
                                return (
                                    <FilterLink nextQuery={{ ...currentQuery, page }} name={name} />
                                )
                            }}
                        />
                    </div>
                </Col>
            </Row>
            <style jsx>{`
                .root {
                    padding: 20px 0;
                }
                .list-header {
                    font-weight: 800;
                    font-size: 16px;
                }
                .repos-title {
                    border-bottom: 1px solid #eeeeee;
                    font-size: 24px;
                    line-height: 50px;
                }
                .pagination {
                    text-align: center;
                    padding: 20px 0;
                }
            `}</style>
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
    queryString += `&per_page=${per_page}`

    const result = await api.request({
        url: '/search/repositories' + queryString
    }, ctx.req, ctx.res)
    return {
        repos: result.data
    }
}

export default withRouter(Search)