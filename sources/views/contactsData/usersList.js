import {JetView} from "webix-jet";
import {contacts} from "models/contacts.js";

export default class UsersListView extends JetView {
	config() {
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
					}
				},
				{
					view: "button",
					value: "Add",
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
			this.setParamToUrl(id);
		}		
		this.list.select(id);
		
		this.list.attachEvent("onAfterSelect", (id) => this.setParamToUrl(id));
	}
	addUsersInfo() {
		const addedId = contacts.add({Name: "User", Email: "user@gmail.com"});

		webix.message("User's info is added");
		this.list.select(addedId);
		this.setParamToUrl(addedId);
		this.app.callEvent("onChangeUsersListUrl", [contacts.getItem(addedId)]);

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
			this.app.callEvent("onChangeUsersListUrl", [contacts.getItem(urlId)]);
		}
	}	
}