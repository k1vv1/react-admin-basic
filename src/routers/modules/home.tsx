import LayoutIndex from "@/layouts/index";
import { RouteObject } from "@/routers/interface";
import Home from "@/views/home/index";

const homeRouter: RouteObject[] = [
	{
		element: <LayoutIndex />,
		children: [
			{
				path: "/home/index",
				element: <Home />,
				meta: {
					requiresAuth: false,
					title: "首页",
					key: "home"
				}
			}
		]
	}
];

export default homeRouter;
