import { JetView } from "webix-jet";

export default class TableToolbar extends JetView {
	constructor(app, name, data) {
		super(app, name);
		this._gridData = data;
	}

	config() {
		const _ = this.app.getService("locale")._;
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
					value: _("Add"),
					click: () => this.addItem()
				},
				{
					view: "button",
					localId: "data:deleteButton",
					value: _("Delete"),
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
		this._gridData.waitData
			.then(() => {
				this.datatable.sync(this._gridData);
			});
	}

	addItem() {
		this._gridData.waitSave(() => {
			this._gridData.add({}, 0);
		})
			.then((res) => {
				this.datatable.edit({
					row: res.id,
					column: "Name"
				});
			});
	}

	deleteItem() {
		const selectedId = this.datatable.getSelectedId();
		if (selectedId) {
			webix.confirm({
				text: "Record will be deleted permanently! Continue?"
			}).then(() => {
				this._gridData.remove(selectedId);
			});
		}
	}
}