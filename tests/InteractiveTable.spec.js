import {
	mount
} from "@vue/test-utils"
import InteractiveTable from "../src/components/VueTableAk.vue"
import TableAdd from "../src/components/TableAdd"
import Vue from "vue"
import {
	wrap
} from "module";

describe("Interactive Table", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(InteractiveTable, {
			propsData: {
				feed: feedData
			}
		})
	});
	it("Devloper can define if the pagination is external or the paginations calculation should occure based on the supplied feed", () => {
		wrapper.setProps({
			config: {
				paginationLength: 30,
				paginationLimit: 10,
			}
		})
		expect(wrapper.findAll(".page-link-ak").length).toBe(5)
	})

	it('will display the title if it\' defined by the developers', () => {
		wrapper.setProps({
			config: {
				title: "Test Title"
			}
		})
		expect(wrapper.html()).toContain("Test Title")
	})




	it("Rendereding the data correctly", () => {
		expect(wrapper.text()).toContain("non leo. Vivamus nibh dolor, nonummy ac, feugiat non, lobortis")
	})

	it("have the ability to check all dispalied items for bulk editing", () => {
		let checkbox = wrapper.find("#check-all-items")
		checkbox.trigger('click');
		expect(wrapper.vm.checkboxesData.length).toBe(2)
	})

	it("can format the date object", () => {
		expect(wrapper.vm.$options.filters.formatDate(["2019-03-13T09:43:05-07:00", "MMMM Do YYYY, h:mm:ss a"])).toBe("March 13th 2019, 5:43:05 pm");
	})

	it("developers can modify the default date format (Property in Config object is: date )", () => {
		wrapper.setProps({
			config: {
				date: {
					format: "MMMM Do (YYYY), h:mm:ss a"
				}
			}
		})
		expect(wrapper.vm.$options.filters.formatDate(["2019-03-13T09:43:05-07:00", wrapper.vm.dateFormat])).toBe("March 13th (2019), 5:43:05 pm");
	})

	it("create the column based on the supplied feed if the developers did not configure the column", () => {

		expect(wrapper.vm.columnsSet.length).toBe(5)
		expect(wrapper.vm.columnsSet[0].name).toBe("id")
		expect(wrapper.vm.columnsSet[1].active).toBe(true)
	})
	it("create the column based on the developers configurations (Property in Config object is: columns )", () => {
		wrapper.setProps({
			config: {
				columns: [{
						name: "name",
						active: true,
						isEditable: false
					},
					{
						name: "description",
						active: true,
						isEditable: true
					},
					{
						name: "date",
						active: true,
						isEditable: false
					},
					{
						name: "amount",
						active: true,
						isEditable: false
					}
				]
			}
		})

		expect(wrapper.vm.columnsSet.length).toBe(4)
	})

	it("developers can conifgure the columns (Property in Config object is: columns )", () => {
		wrapper.setProps({
			config: {
				columns: [{
					name: "name",
					active: true,
					isEditable: false
				}]
			}
		})
		expect(wrapper.vm.columnsSet.length).toBe(1)
		expect(wrapper.vm.columnsSet[0].isEditable).toBe(false)
	})

	it("developers can deactive or active adding new items functionality (Property in Config object is: addNewItem )", () => {
		wrapper.setProps({
			config: {
				addNewItem: false
			}
		})
		expect(wrapper.vm.activateAddNew).toBe(false)
	})
	it("render the new items feilds based on the supplied feed if the developers did not configure it", () => {

		expect(wrapper.vm.newItemFields.length).toBe(5)
	})
	it("render the new items feilds based on the developers configuration", () => {
		wrapper.setProps({
			config: {
				newItemFields: [{
					name: "Name",
					type: "text",
					required: true,
					value: ""
				}]
			}
		})
		expect(wrapper.vm.newItemFields.length).toBe(1)
	})
	it("developers can toggle adding new item functionality", () => {
		wrapper.setProps({
			config: {
				addNewItem: false
			}
		})
		expect(wrapper.html()).not.toContain("add-new-btn")
	})

	it("can trigger an (newItemsadded) event when new item is added", () => {

		window.events = new Vue();
		window.events.$on('newItemsadded', (data) => {
			wrapper.vm.$emit('newItemsadded', data);
		});
		let button = wrapper.find(TableAdd).find("button#add-new-btn")
		button.trigger('click')
		let input = wrapper.find("input[name=Name]")
		input.setValue("John Doe")
		input = wrapper.find("input[name=Description]")
		input.setValue("Paid")
		input = wrapper.find("input[name=Date]")
		input.setValue("01/20/2019")
		input = wrapper.find("input[name=Amount]")
		input.setValue("100")
		// console.log(wrapper.find(TableAdd).vm.addNew)
		wrapper.find("form").trigger("submit.prevent")
		expect(wrapper.emitted('newItemsadded')).toBeTruthy();

	})

	it("allow the developers to configure the new item field (Property in Config object is: newItemFields)", () => {
		wrapper.setProps({
			config: {
				newItemFields: [{
					name: "Name",
					type: "text",
					required: true,
					value: ""
				}]
			}
		})
		expect(wrapper.vm.newItemFields.length).toBe(1)
	})

	it("allow the developers to configure the bulk edit fields (Property in Config object is: editeItemsFields)", () => {
		wrapper.setProps({
			config: {
				editeItemsFields: [{
					name: "name",
					type: "text",
					required: true,
					value: ""
				}]
			}
		})
		expect(wrapper.vm.editeItemsFields.length).toBe(1)
	})

	it("assume all field is editable in the bulk action if the developers did not conifgure the bulk edit fields", () => {
		expect(wrapper.vm.editeItemsFields.length).toBe(5)
	})

	it("assume bulk actions is allowed if the developers did not conifgure it", () => {
		expect(wrapper.vm.bulkActions()).toBe(true)
	})
	it("allow the devlopers to toggle the bulk action (Property in Config object is: bulkActions)", () => {
		wrapper.setProps({
			config: {
				bulkActions: false
			}
		})
		expect(wrapper.vm.bulkActions()).toBe(false)
	})

	it("assume all bulk action is allowed if the developers did not conifgure it", () => {
		expect(wrapper.vm.bullkActionsList.length).toBe(2)

	})
	it("allow the developers to toggle the bulk actions (Property in Config object is: actions )", () => {
		wrapper.setProps({
			config: {
				actions: {
					edite: true,
					delete: false
				}
			}
		})
		expect(wrapper.vm.bullkActionsList.length).toBe(1)
	})

	it("allow the developers to define the dispaly limit per page (Property in Config object is: perPage  )", () => {
		wrapper.setProps({
			config: {
				perPage: [10, 20]
			}
		})
		expect(wrapper.vm.limits).toEqual([10, 20])
	})

	it("will return the default limits if the developers did not specify the limit per page", () => {
		expect(wrapper.vm.limits).toEqual([10, 20, 30, 40, 50, 60, 70, 80, 90, 100])
	})

	it("allow the developers to toggle the date filtring (Property in Config object is: date)", () => {

		expect(wrapper.vm.dateActivation).toBe(true)
	})
	it("allow the developers to toggle the date filtring (Property in Config object is: date)", () => {
		wrapper.setProps({
			config: {
				date: {
					active: false,
					format: "MMMM Do YYYY, h:mm:ss a"
				}
			}
		})
		expect(wrapper.vm.dateActivation).toBe(false)
	})

	it("allow the user to filter the displayed columns", () => {
		wrapper.vm.columnsSet[1].active = false

		expect(wrapper.vm.filteredColumn).not.toContainObject({
			name: 'name'
		})
	})

	it("allow the user to filter the data based on specific date", () => {
		let filteredDate = wrapper.vm.dates[0]
		wrapper.setData({
			selectedDate: filteredDate
		})
		expect(wrapper.vm.filteredList().length).toBe(1)
	})

	it("allow the user to instantly search the object", () => {
		wrapper.setData({
			searchKeyword: "James"
		})
		expect(wrapper.vm.filteredList()).toContainObject({
			name: "James Melton"
		})

		expect(wrapper.vm.filteredList()).not.toContainObject({
			name: "Neil Clemons",
		})
	})

	it("will consider the default key as id", () => {
		expect(wrapper.vm.uniqueKey).toBe("id")
	})
	it("the devloper can define the unique key in the configuration", () => {
		wrapper.setProps({
			config: {
				uniqueKey: "sku"
			}
		})
		expect(wrapper.vm.uniqueKey).toBe("sku")
	})

	it("will display number of items per page definded by default", () => {

		let tr = wrapper.findAll('tbody tr')
		expect(tr.length).toBe(4);
	})



	it("allow the user to sort the column based on any columns", () => {
		wrapper.vm.sort('name', false)
		expect(wrapper.vm.filteredList()[0].name).toBe('James Melton')
	})

	it("will set the contenteditable field to false if not specified by developres", () => {
		expect(wrapper.html()).not.toContain('contenteditable="true"')
	})

	it("will set the defined filed to be editable by setting the html5 attribute contenteditable to true", () => {
		wrapper.setProps({
			config: {
				columns: [{
					name: "name",
					active: true,
					isEditable: true
				}]
			}
		})
		expect(wrapper.html()).toContain('contenteditable="true"')
	})
	it("can edite the editable field and trigger an event inline", () => {
		window.events = new Vue();
		window.events.$on('itemChanged', (data) => {
			wrapper.vm.$emit('itemChanged', data);
		});
		wrapper.setProps({
			config: {
				columns: [{
					name: "description",
					active: true,
					isEditable: true
				}]
			}
		})
		let td = wrapper.find("[contenteditable=true]")
		td.trigger('blur')
		expect(wrapper.emitted('itemChanged')).toBeTruthy();
	})

	it("can edit several field togther and trigger and event (bulkUpdateActionHasBeenTaken)", () => {
		window.events = new Vue();
		window.events.$on('bulkUpdateActionHasBeenTaken', (data) => {
			wrapper.vm.$emit('bulkUpdateActionHasBeenTaken', data);
		});
		let checkboxes = wrapper.findAll("td > input[type=checkbox]")
		checkboxes.setChecked()
		wrapper.vm.triggerAction("Edite")
		wrapper.find("form#bulk-update-form").trigger("submit.prevent")

		expect(wrapper.emitted('bulkUpdateActionHasBeenTaken')).toBeTruthy();
	})

	it("can delete many or one fields at once and trigger an event (bulkDeletedeActionHasBeenTaken)", () => {

		window.events = new Vue();
		window.events.$on('bulkDeletedeActionHasBeenTaken', (data) => {
			wrapper.vm.$emit('bulkDeletedeActionHasBeenTaken', data);
		});
		let checkboxes = wrapper.findAll("td > input[type=checkbox]")
		checkboxes.setChecked()
		window.confirm = jest.fn(() => true)
		wrapper.vm.triggerAction("Delete")

		expect(wrapper.emitted('bulkDeletedeActionHasBeenTaken')).toBeTruthy();
	})


	it("Display the error page if the feed is empty or undefined", () => {
		wrapper.setProps({})
		expect(wrapper.html()).toContain("<h1>500</h1>")
	})



	it("will trigger an event when the user click on the paginations links and include the page number", () => {
		window.events = new Vue();
		window.events.$on('pageChanged', data => {
			wrapper.vm.$emit('pageChanged', data);
		});
		wrapper.setProps({
			config: {
				paginationLength: 30,
				paginationLimit: 10,
			}
		})
		let link = wrapper.find(".page-link-ak")
		link.trigger('click')
		expect(wrapper.emitted('pageChanged')).toBeTruthy();
	})


})


// Default Feed
const feedData = [{
	id: "1",
	name: "Neil Clemons",
	description: "non leo. Vivamus nibh dolor, nonummy ac, feugiat non, lobortis",
	date: "2019-03-13T09:43:05-07:00",
	amount: "462.91"
}, {
	id: "2",
	name: "James Melton",
	description: "non leo. Vivamus nibh dolor, nonummy ac, feugiat non, lobortis",
	date: "2019-02-13T09:43:05-07:00",
	amount: "23"
}]


expect.extend({
	toContainObject(received, argument) {

		const pass = this.equals(received,
			expect.arrayContaining([
				expect.objectContaining(argument)
			])
		)

		if (pass) {
			return {
				message: () => (`expected ${this.utils.printReceived(received)} not to contain object ${this.utils.printExpected(argument)}`),
				pass: true
			}
		} else {
			return {
				message: () => (`expected ${this.utils.printReceived(received)} to contain object ${this.utils.printExpected(argument)}`),
				pass: false
			}
		}
	}
})