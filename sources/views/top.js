import { JetView } from "webix-jet";
import { data } from "models/menu";

export default class TopView extends JetView {
	config() {
		const rightMenu = {
			view: "menu",
			localId: "top:menu",
			layout: "y",
			width: 200,
			select: true,
		};
		const topView = {
			cols: [
				rightMenu,
				{
					$subview: true
				}
			]
		};
		return topView;
	}
	init() {
		this.topview = this.$$("top:menu");
		this.topview.parse(data);
		this.topview.select(data.config.data[0].id);
	}
}