import React from "react";
import LayoutIndex from "@/layouts/index";
import { RouteObject } from "@/routers/interface";
import lazyLoad from "../utils/lazyLoad";

const manageRouter: RouteObject[] = [
	{
		element: <LayoutIndex />,
		meta: {
			title: "系统管理"
		},
		children: [
			{
				path: "/manage/user",
				element: lazyLoad(React.lazy(() => import("@/views/manage/user/index"))),
				meta: {
					requiresAuth: false,
					title: "用户管理",
					key: "user"
				}
			},
			{
				path: "/manage/role",
				element: lazyLoad(React.lazy(() => import("@/views/manage/role/index"))),
				meta: {
					requiresAuth: false,
					title: "角色管理",
					key: "role"
				}
			}
		]
	}
];

export default manageRouter;
