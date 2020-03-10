import {JetView} from "webix-jet";
import {contacts} from "models/contacts.js";

export default class UsersListView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		return {
			rows: [
				{
					view: "list",
					type:{
						height:40
					},
					localId: "contacts:usersList",
					template: "<strong>#Name#</strong> (<ins>e-mail</ins>: <em>#Email#</em>) <span class='webix_icon wxi-close btn-right'></span>",
					select: true,
					scroll: "y",
					onClick: {
						"wxi-close": (e, id) => this.deleteUserInfo(id)
					},
					on: {
						onAfterSelect: (id) => {
							this.setParamToUrl(id);
							this.app.callEvent("onChangeUsersListUrl", [contacts.getItem(id)]);
						}
					}
				},
				{
					view: "button",
					value: _("Add"),
					click: () => this.addUsersInfo()
				}

			]
			
		};
	}
	init() {
		this.list = this.$$("contacts:usersList");
		this.list.sync(contacts);
		let id = this.getParam("id");
		if(!id || !contacts.exists(id)) {
			id = contacts.getFirstId();
		}		
		this.list.select(id);
	}
	addUsersInfo() {
		const addedId = contacts.add({Name: "User", Email: "user@gmail.com"}, 0);

		webix.message("User's info is added");
		this.list.select(addedId);
		this.setParamToUrl(addedId);
		webix.message("Fill all field and press Save button");

	}
	deleteUserInfo(id) {
		contacts.remove(id);
		webix.message("User's info is deleted");
	}
	setParamToUrl(id) {
		this.setParam("id", id, true);
	}
	urlChange(view, url) {
		const urlId = url[0].params.id;
		
		if (urlId && this.list.exists(urlId)){
			this.list.select(urlId);
		}
	}	
}