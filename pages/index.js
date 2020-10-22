import { Button } from "antd";
import getConfig from "next/config";
import { MailOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
const api = require("../lib/api");

const { publicRuntimeConfig } = getConfig();

const Index = ({ userRepos, userStarredRepos, user }) => {
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
        <img src={user.avatar_url} alt="user avatar" clasName="avatar" />
        <span className="login">{user.login}</span>
        <span className="bio">{user.bio}</span>
        <span className="email">
          <a href={`mailto:${user.email}`}>
            <MailOutlined style={{ marginRight: 10 }} />
            { user.email }
          </a>
        </span>
      </div>
      <style jsx>{``}</style>
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
  const userRepos = await api.request(
    {
      url: "/user/repos",
    },
    ctx.req,
    ctx.res
  );
  const userStarredRepos = await api.request(
    {
      url: "/user/starred",
    },
    ctx.req,
    ctx.res
  );
  return {
    isLogin: true,
    userRepos: userRepos.data,
    userStarredRepos: userStarredRepos.data,
  };
};

export default connect(function mapState(state) {
  return {
    user: state.user,
  };
})(Index);
