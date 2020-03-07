import { JetView } from "webix-jet";

export default class SettingsView extends JetView {
	config() {

		const settingsHeader = {
			view: "toolbar",
			localId: "settings:settingsHeader",
			css: "webix_dark",
			elements: [{
				view: "label",
				label: "Settings",
			}]

		};
		const segmentedButton = {
			view: "segmented",
			value: "En",
			inputWidth: 250,
			options: [
				{
					localId: "settings:en",
					value: "En"
				},
				{
					localId: "settings:ru",
					value: "Ru"
				}
			]
		};
		const settingsView = {
			type: "clean",
			rows: [
				settingsHeader,
				segmentedButton,
				{}
			]
		};
		return settingsView;
	}
}