import { JetView } from "webix-jet";
import { contacts } from "models/contacts";

export default class ContactsView extends JetView {
	config() {
		const contactsHeader = {
			view: "toolbar",
			localId: "contacts:contactsHeader",
			css: "webix_dark",
			elements: [{
				view: "label",
				label: "Contacts"
			}]
		};
		const usersList = {
			view: "list",
			type:{
				height:40
			},
			localId: "contacts:usersList",
			template: "<strong>#Name#</strong> (<ins>e-mail</ins>: <em>#Email#</em>) <span class='webix_icon wxi-close btn-right'></span>",
			select: true,
			scroll: "y"
		};
		const usersForm = {
			view: "form",
			localId: "contacts:usersForm",
			paddingX: 100,
			margin: 20,
			elements: [
				{
					view: "text",
					label: "User Name"
				},
				{
					view: "text",
					label: "Email",
				},
				{}
			]
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
	init() {
		this.$$("contacts:usersList").parse(contacts);
	}
}