import React from "react";
import ReactDOM from "react-dom/client";
import "@/styles/reset.less";
import "@/styles/common.less";
import "@/assets/iconfont/iconfont.less";
import "@/assets/fonts/font.less";
import "@/language/index";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "@/redux";
import App from "@/App";

ReactDOM.createRoot(document.getElementById("root")!).render(
	// <React.StrictMode>
	<Provider store={store}>
		<PersistGate persistor={persistor}>
			<App />
		</PersistGate>
	</Provider>
	// </React.StrictMode>
);
