import { useState, useCallback } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import Link from 'next/link'
import { GithubFilled, UserOutlined } from '@ant-design/icons'
import { Layout, Input, Avatar, Tooltip, Dropdown, Menu } from 'antd'
import getConfig from 'next/config'
import axios from 'axios'
import { logout } from '../store/store'
import Container from './Container'

const { publicRuntimeConfig } = getConfig()

const { Header, Content, Footer } = Layout

const githubIconStyle = {
    color: 'white',
    fontSize: 40,
    display: 'block',
    paddingTop: 10,
    paddingRight: 20
}
const footerStyle = {
    textAlign: 'center'
}
const AppLayout = ({ children, user, logout, router }) => {
    const urlQuery = router.query && router.query.query
    const [search, setSearch] = useState(urlQuery || '')
    const handleOnChange = useCallback(event => {
        event.persist()
        setSearch(event.target.value)
    }, [setSearch])
    const handleOnSearch = useCallback(() => {
        router.push(`/search?query=${search}`)
    }, [search])
    const handleLogout = useCallback(() => {
        logout()
        return false
    }, [logout])
    const userDropdown = (
        <Menu>
            <Menu.Item>
                <a onClick={handleLogout}>登出</a>
            </Menu.Item>
        </Menu>
    )
    return (
        <Layout>
            <Header>
                <Container renderer={<div className="header-inner"></div>}>
                    <div className="header-left">
                        <div className="logo">
                            <Link href="/">
                                <GithubFilled style={githubIconStyle} />
                            </Link>
                        </div>
                        <div>
                            <Input.Search
                                placeholder="搜索仓库"
                                value={search}
                                onChange={handleOnChange}
                                onSearch={handleOnSearch}
                            />
                        </div>
                    </div>
                    <div className="header-right">
                        {
                            user && user.id ? (
                                <Dropdown overlay={userDropdown}>
                                    <a href="">
                                        <Avatar size={40} src={user.avatar_url}></Avatar>
                                    </a>
                                </Dropdown>
                            ) : (
                                <Tooltip title="点击进行登录">
                                    <a href={`/prepare-auth?url=${router.asPath}`}>
                                        <Avatar size={40} icon={<UserOutlined />}></Avatar>
                                    </a>
                                </Tooltip>
                            )
                        }
                    </div>
                </Container>
            </Header>
            <Content>
                <Container>{children}</Container>
            </Content>
            <Footer style={footerStyle}>
                Develop by lily&nbsp;
                <a href="emailto:@751502445@qq.com">751502445@qq.com</a>
            </Footer>
            <style jsx>{`
                .header-inner {
                    display: flex;
                    justify-content: space-between;
                }
                .header-left {
                    display: flex;
                    justify-content: flex-start;
                }
            `}</style>
            <style jsx global>{`
                 #__next {
                     height: 100%;
                 }
                 .ant-layout {
                     min-height: 100%;
                 }
                 .ant-layout-header {
                     padding-left: 0;
                     padding-right: 0;
                 }
                 .ant-layout-content {
                     background: #ffffff;
                 }
            `}</style>
        </Layout>
    )
}

export default connect(function mapState(state) {
    return {
        user: state.user
    }
}, function mapReducer(dispatch) {
    return {
        logout: () => dispatch(logout())
    }
})(withRouter(AppLayout))