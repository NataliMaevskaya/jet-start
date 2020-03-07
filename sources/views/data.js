import { JetView } from "webix-jet";
import TableToolbar from "views/tabletoolbar.js";
import { countries } from "models/countries.js";
import { statuses } from "models/statuses.js";

export default class DataView extends JetView {
	config() {
		const dataHeader = {
			view: "toolbar",
			localId: "data:dataHeader",
			css: "webix_dark",
			elements: [{
				view: "label",
				label: "Data"
			}]
		};
		const segmentedToolbar = {
			view: "segmented",
			localId: "data:segmentedToolbar",
			value: "data:countries",
			options: [
				{
					id: "data:countries",
					value: "Countries"

				},
				{
					id: "data:statuses",
					value: "Statuses"

				}
			]
		};
		const toolbarCells = {
			animate: false,
			cells: [
				{
					localId: "data:countries",
					rows: [new TableToolbar(this.app, "", countries)]
				},
				{
					localId: "data:statuses",
					rows: [new TableToolbar(this.app, "", statuses)]
				},
				{}
			]
		};
		const dataView = {
			fitBiggest: true,
			rows: [
				dataHeader,
				segmentedToolbar,
				toolbarCells
			]				
		};
		return dataView;
	}
	init() {
		this.dataComp = this.$$("data:segmentedToolbar");
		this.dataComp.attachEvent("onChange", (value) => {
			this.$$(value).show();
		});
	}
}