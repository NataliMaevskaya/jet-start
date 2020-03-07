import { JetView } from "webix-jet";

export default class TableToolbar extends JetView {
	constructor(app, name, data) {
		super(app, name);
		this._gridData = data;
	}

	config() {
		const datatable = {
			view: "datatable",
			autoConfig: true,
			localId: "data:datatable",
			scroll: "y",
			select: true,
			editable: true,
			editor: "text"
		};

		const toolbar = {
			localId: "tabletoolbar:toolbar",
			css: "webix_dark",
			cols: [
				{
					view: "button",
					localId: "data:addButton",
					value: "Add",
					click: () => this.addItem()
				},
				{
					view: "button",
					localId: "data:deleteButton",
					value: "Delete",
					click: () => this.deleteItem()
				}
			]

		};
		const tabletoolbar = {
			rows: [
				datatable,
				toolbar
			]
		};
		return tabletoolbar;
	}

	init() {
		this.datatable = this.$$("data:datatable");
		this.datatable.parse(this._gridData);
	}

	addItem() {
		const addedId = this.datatable.add({}, 0);
		this.datatable.edit({
			row: addedId,
			column: "Name"
		});
	}

	deleteItem() {
		const selectedId = this.datatable.getSelectedId();
		if (selectedId) {
			webix.confirm({
				text: "Record will be deleted permanently! Continue?"
			}).then(() => {
				this.datatable.remove(selectedId);
			});
		}
	}
}