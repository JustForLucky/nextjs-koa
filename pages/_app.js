import chalk from "chalk"
import App from "next/app"
import { Provider } from "react-redux"
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import "antd/dist/antd.css"
import MyContext from "../lib/my-context"
import Layout from "../components/Layout"
import PageLoading from '../components/PageLoading'
import withRedux from "../lib/with-redux"

class MyApp extends App {
  static async getInitialProps(ctx) {
    const { Component } = ctx;
    console.log(chalk.green("app init"));
    let pageProps = {};
    if (Component && Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return {
      pageProps,
    };
  }
  state = {
    loading: false
  }
  componentDidMount() {
    Router.events.on('routeChangeStart', this.startLoading)
    Router.events.on('routeChangeComplete', this.stopLoading)
    Router.events.on('routeChangeError', this.stopLoading)
  }
  componentWillUnmount() {
    Router.events.off('routeChangeStart', this.startLoading)
    Router.events.off('routeChangeComplete', this.stopLoading)
    Router.events.off('routeChangeError', this.stopLoading)
  }
  startLoading = () => {
    this.setState({ loading: true })
  }
  stopLoading = () => {
    this.setState({ loading: false })
  }
  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Provider store={reduxStore}>
        {
          this.state.loading ? 
          (<PageLoading />) : null
        }
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    );
  }
}

export default withRedux(MyApp);
