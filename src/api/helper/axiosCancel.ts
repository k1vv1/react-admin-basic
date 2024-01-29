import axios, { AxiosRequestConfig, Canceler } from "axios";
import { isFunction } from "@/utils/is/index";
import qs from "qs";

// * 声明一个Map用于存储每个请求的标识和取消函数
let pengdingMap = new Map<string, Canceler>();

// * 序列化参数
export const getPendingUrl = (config: AxiosRequestConfig) =>
	[config.method, config.url, qs.stringify(config.data), qs.stringify(config.params)].join("&");

export class AxiosCanceler {
	/**
	 * @description: 添加请求
	 * @param {Object} config
	 */
	addPending(config: AxiosRequestConfig) {
		// * 在请求开始前，对之前的请求做检查取消操作
		this.removePending(config);
		const url = getPendingUrl(config);
		config.cancelToken =
			config.cancelToken ||
			new axios.CancelToken(cancel => {
				if (!pengdingMap.has(url)) {
					// 如果pending中不存在当前请求，则添加进去
					pengdingMap.set(url, cancel);
				}
			});
	}

	/**
	 * @description: 移除请求
	 * @return {Object} config
	 */
	removePending(config: AxiosRequestConfig) {
		const url = getPendingUrl(config);

		if (pengdingMap.has(url)) {
			// 如果pending中存在当前请求标识，需要取消当前请求，并且移除
			const cancel = pengdingMap.get(url);
			cancel && cancel();
			pengdingMap.delete(url);
		}
	}

	/**
	 * @description: 清空所有pengding
	 */
	removeAllPending() {
		pengdingMap.forEach(cancel => {
			cancel && isFunction(cancel) && cancel();
		});
		pengdingMap.clear();
	}

	/**
	 * @description: 重置
	 */
	reset(): void {
		pengdingMap = new Map<string, Canceler>();
	}
}
