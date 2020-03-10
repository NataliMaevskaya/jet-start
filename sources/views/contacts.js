import { JetView } from "webix-jet";
import usersForm from "views/contactsData/usersForm.js";
import usersList from "views/contactsData/usersList.js";

export default class ContactsView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		const contactsHeader = {
			view: "toolbar",
			localId: "contacts:contactsHeader",
			css: "webix_dark",
			elements: [{
				view: "label",
				label: _("Contacts")
			}]
		};
		const contactsView = {
			rows: [
				contactsHeader,
				{
					cols: [
						usersList,
						usersForm
					]
				}				
			]
		};
		return contactsView;
	}
}