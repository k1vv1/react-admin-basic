import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { connect } from "react-redux";
import { Layout } from "antd";
import { setAuthButtons } from "@/redux/modules/auth/action";
import { updateCollapse } from "@/redux/modules/menu/action";
import LayoutHeader from "./components/Header";
import LayoutTabs from "./components/Tabs/index";
import LayoutMenu from "./components/Menu";
import LayoutFooter from "./components/Footer/index";
import "./index.less";

const LayoutIndex = (props: any) => {
	const { Sider, Content } = Layout;
	const { isCollapse, updateCollapse, setAuthButtons } = props;

	// 获取按钮权限列表
	const getAuthButtonsList = async () => {
		// !通过调用接口获取按钮权限列表
		// const { data } = await getAuthorButtons();
		const data = {};
		setAuthButtons(data);
	};

	// 监听窗口大小变化
	const listeningWindow = () => {
		window.onresize = () => {
			return (() => {
				let screenWidth = document.body.clientWidth;
				if (!isCollapse && screenWidth < 800) updateCollapse(true);
				if (isCollapse && screenWidth > 800) updateCollapse(false);
			})();
		};
	};

	useEffect(() => {
		listeningWindow();
		getAuthButtonsList();
	}, [isCollapse]);

	return (
		<section className="container">
			<Sider trigger={null} collapsed={props.isCollapse} width={220} theme="dark">
				<LayoutMenu />
			</Sider>
			<Layout className="site-layout">
				<LayoutHeader />
				<LayoutTabs></LayoutTabs>
				<Content>
					<Outlet></Outlet>
				</Content>
				<LayoutFooter />
			</Layout>
		</section>
	);
};

const mapStateToProps = (state: any) => state.menu;
const mapDispatchToProps = { setAuthButtons, updateCollapse };
export default connect(mapStateToProps, mapDispatchToProps)(LayoutIndex);
