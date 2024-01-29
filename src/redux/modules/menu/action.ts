import * as types from "@/redux/mutation-types";
import { getMenuList } from "@/api/modules/login";
import { Dispatch } from "react";

// * updateCollapse
export const updateCollapse = (isCollapse: boolean) => ({
	type: types.UPDATE_COLLAPSE,
	isCollapse
});

// * setMenuList
export const setMenuList = (menuList: Menu.MenuOptions[]) => ({
	type: types.SET_MENU_LIST,
	menuList
});

interface MenuProps {
	type: string;
	menuList: Menu.MenuOptions[];
}
// * redux-thunk
export const getMenuListActionThunk = () => {
	return async (dispatch: Dispatch<MenuProps>) => {
		const res = await getMenuList();
		console.log(res);
		dispatch(setMenuList((res.data as Menu.MenuOptions[]) ?? []));
	};
};
