import { useEffect } from "react";
import { Button, Tabs } from "antd";
import getConfig from "next/config";
import { MailOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import Router, { withRouter } from "next/router";
import LRU from 'lru-cache';
import Repo from "../components/Repo";

const cache = new LRU({
  maxAge: 1000 * 60 * 10
})

const api = require("../lib/api");

const { publicRuntimeConfig } = getConfig();

let cachedUserRepos, cachedUserStaredRepos;
const isServer = typeof window === "undefined";

const Index = ({ userRepos, userStaredRepos, user, router }) => {
	console.log(userRepos, "userRepos");

	const tabKey = router.query.key || "1";
	const handleTabChange = (activeKey) => {
		Router.push(`/?key=${activeKey}`);
	};

	useEffect(() => {
		/** 只在客户端使用缓存 */
		if (!isServer) {
			// cachedUserRepos = userRepos;
      // cachedUserStaredRepos = userStaredRepos;
      userRepos && cache.set('userRepos', userRepos)
      userStaredRepos && cache.set('userStaredRepos', userStaredRepos)
		}
	}, [userRepos, userStaredRepos]);

	if (!user || !user.id) {
		return (
			<div className="root">
				<p>亲，您还没有登录哦～</p>
				<Button type="primary" href={publicRuntimeConfig.OAUTH_URL}>
					点击登录
				</Button>
				<style jsx>{`
					.root {
						height: 400px;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
					}
				`}</style>
			</div>
		);
	}
	return (
		<div className="root">
			<div className="user-info">
				<img src={user.avatar_url} alt="user avatar" className="avatar" />
				<span className="login">{user.login}</span>
				<span className="bio">{user.bio}</span>
				<span className="email">
					<a href={`mailto:${user.email}`}>
						<MailOutlined style={{ marginRight: 10 }} />
						{user.email}
					</a>
				</span>
			</div>
			<div className="user-repos">
				<Tabs activeKey={tabKey} onChange={handleTabChange} animated={false}>
					<Tabs.TabPane tab="你的仓库" key="1">
						{userRepos.map((repo) => (
							<Repo key={repo.id} repo={repo} />
						))}
					</Tabs.TabPane>
					<Tabs.TabPane tab="你关注的仓库" key="2">
						{userStaredRepos.map((repo) => (
							<Repo key={repo.id} repo={repo} />
						))}
					</Tabs.TabPane>
				</Tabs>
			</div>
			<style jsx>{`
				.root {
					display: flex;
					align-items: flex-start;
					padding: 20px 0;
				}
				.user-info {
					width: 200px;
					margin-right: 40px;
					flex-shrink: 0;
					display: flex;
					flex-direction: column;
				}
				.login {
					font-weight: 800;
					font-size: 20px;
					margin-top: 20px;
				}
				.name {
					font-size: 16px;
					color: #777;
				}
				.bio {
					margin-top: 20px;
					color: #333;
				}
				.avatar {
					width: 100%;
					border-radius: 5px;
				}
				.user-repos {
					flex-grow: 1;
				}
			`}</style>
		</div>
	);
};

Index.getInitialProps = async ({ ctx, reduxStore }) => {
	const user = reduxStore.getState().user;
	if (!user || !user.id) {
		return {
			isLogin: false,
		};
	}
	/** 只在客户端使用缓存 */
	if (!isServer) {
		if (cache.get('userRepos') && cache.get('userStaredRepos')) {
			return {
				userRepos: cache.get('userRepos'),
				userStaredRepos: cache.get('userStaredRepos'),
			};
		}
	}
	const userRepos = await api.request(
		{
			url: "/user/repos",
		},
		ctx.req,
		ctx.res
	);
	const userStaredRepos = await api.request(
		{
			url: "/user/starred",
		},
		ctx.req,
		ctx.res
	);

	return {
		isLogin: true,
		userRepos: userRepos.data,
		userStaredRepos: userStaredRepos.data,
	};
};

/** withRouter需要放在connect外部，防止状态不同步问题 */
export default withRouter(
	connect(function mapState(state) {
		return {
			user: state.user,
		};
	})(Index)
);
