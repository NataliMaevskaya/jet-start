import { JetView } from "webix-jet";
import { contacts } from "models/contacts.js";
import { countries } from "models/countries";
import { statuses } from "models/statuses";

export default class UsersFormView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		return {
			view: "form",
			localId: "contacts:usersForm",
			paddingX: 100,
			margin: 20,
			elements: [
				{
					view: "text",
					label: _("Name"),
					name: "Name", 
					invalidMessage: "Name field cannot be empty!"
				},
				{
					view: "text",
					label: _("Email"),
					name: "Email", 
					invalidMessage: "Email field cannot be empty!"
				},
				{ 
					view: "combo", 
					label: _("Country"), 
					value: 1, 
					name: "Country", 
					options: { body: {template:"#Name#"}, data: countries }, 
					invalidMessage: "Choose the country!" },
				{ 
					view: "combo", 
					label: _("Status"), 
					value: 1, 
					name: "Status", 
					options: { body: {template:"#Name#"}, data: statuses }, 
					invalidMessage: "Choose the status!" },
				{ 
					view: "button", 
					label: _("Save"), 
					hotkey:"enter",					
					click: () => this.saveUserData()
				},
				{}
			],
			rules: {
				Name: webix.rules.isNotEmpty,
				Email: webix.rules.isNotEmpty && webix.rules.isEmail,
				Country: webix.rules.isNotEmpty,
				Status : webix.rules.isNotEmpty
			}
		};
	}
	init(){
		this.form = this.$$("contacts:usersForm");
		this.on(this.app, "onChangeUsersListUrl", (item) => {
			this.form.setValues(item);
		});
	}
	
	saveUserData() {
		if (this.form.validate()) {
			const values = this.form.getValues();
			if (values.id) {
				contacts.updateItem(values.id, values);
				webix.message("User's data is updated");
			} 
			this.form.clear();
		}
	}
	urlChange(view, url) {
		const urlId = url[0].params.id;
		if (urlId && contacts.exists(urlId)) {
			view.setValues(contacts.getItem(urlId));
			view.clearValidation();
		} 		
	} 
}