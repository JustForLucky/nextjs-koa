import { withRouter } from 'next/router'
import Link from "next/link";
import api from "../lib/api";
import Repo from "./Repo";

function makeQuery(queryObject) {
    const query = Object.entries(queryObject).reduce((result, entry) => {
        result.push(entry.join('='))
        return result
    }, []).join('&')
    return query ? `?${query}` : query
}

export default function withRepoBasic(InnerComponent, type = 'index') {
    const Detail = ({ repoBasic, router, ...restProps }) => {
        const query = makeQuery(router.query)
        console.log(repoBasic, 'repoBais')
        const tabs = [
            {
                key: 'index',
                name: 'Readme',
                path: '/detail'
            },
            {
                key: 'issues',
                name: 'Issues',
                path: '/detail/issues'
            }
        ]
        return (
            <div className='root'>
                <div className='repo-basic'>
                    <Repo repo={repoBasic} />
                    <div className='tabs'>
                        {
                            tabs.map((tab) => (
                                <Link key={tab.key} href={`${tab.path}${query}`}>
                                    {
                                        type === tab.key ? (
                                            <span className='tab'>{tab.name}</span>
                                        ) : (
                                                <a className={`tab ${tab.key}`}>{tab.name}</a>
                                            )
                                    }
                                </Link>
                            ))
                        }
                    </div>
                </div>
                <div>
                    <InnerComponent {...restProps} />
                </div>
                <style jsx>{`
                .root {
                    padding-top: 20px;
                }
                .repo-basic {
                    padding: 20px;
                    border: 1px solid #eeeeee;
                    margin-bottom: 20px;
                    border-radius: 5px;
                }
                .tab + .tab {
                    margin-left: 20px;
                }
                `}</style>
            </div>
        )
    }
    /**
     * router的query可能有延迟
     * 需要使用ctx.query
     */
    Detail.getInitialProps = async (context) => {
        const { router, ctx } = context
        const { owner, name } = ctx.query
        const repoBasic = await api.request({
            url: `/repos/${owner}/${name}`,
        }, ctx.req, ctx.res)
        let pageData = {}
        if (InnerComponent.getInitialProps) {
            pageData = await InnerComponent.getInitialProps(context)
        }
        return {
            repoBasic: repoBasic.data,
            ...pageData
        }
    }

    return withRouter(Detail)
}