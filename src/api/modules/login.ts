import { PORT1 } from "@/api/config/servicePort";
import http from "@/api";
// * 获取菜单列表
export const getMenuList = () => {
	return http.get<Menu.MenuOptions[]>(PORT1 + `/menu/list`);
};
