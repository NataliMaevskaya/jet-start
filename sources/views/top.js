import { JetView } from "webix-jet";
// import { data } from "models/menu";

export default class TopView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		const rightMenu = {
			view: "menu",
			localId: "top:menu",
			layout: "y",
			width: 200,
			select: true,
			data: [
				{
					id: "contacts",
					value: _("Contacts"),
					href: "#!/top/contacts"
				},
				{
					id: "data",
					value: _("Data"),
					href: "#!/top/data"
				},
				{
					id: "settings",
					value: _("Settings"),
					href: "#!/top/settings"
				}
			]
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
		// this.topview.parse(data);		
	}
	urlChange(view, url) {
		if(url[1] && url[1].page) {
			this.topview.select(url[1].page);
		}
	}
}