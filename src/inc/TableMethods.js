const methods = {
	init() {
		//Check if the date is activated if so trigger date Format
		if (this.dateActivation) {
			this.setDateFilter();
		}

		//Check if the columns has been provided if not set the Columns automatically based on the feed keys
		if (this.columnsSet.length === 0) {
			this.setColumns();
		}
		//Default Sorting
		this.sort(this.columnsSet[0].name, this.order);
	},
	/**
	 * Check if the user Deactive Bulk Actions
	 * @returns Boolean
	 */
	bulkActions() {
		if (this.config.bulkActions !== undefined && this.validateKey()) {
			return this.config.bulkActions;
		}
		return true;
	},
	/**
	 * Filter The list based on data, search if not set return the list
	 * @returns array
	 */
	filteredList() {
		//check if the date filter is triggered if so return the filtered date
		if (this.selectedDate !== null) {
			return this.filterfeedByDate(this.selectedDate);
		}
		//Check if the search is triggered and call search method
		if (this.searchKeyword !== "") {
			return this.search();
		}

		//Return default object
		return this.dataSet.slice(this.start, this.end);
	},
	/**
	 * Watch if all items is checked and update the checkboxes data accordingly
	 * @returns void
	 */
	checkAllItems() {
		this.allItemsCheckd = !this.allItemsCheckd;
		if (this.allItemsCheckd) {
			this.filteredList().forEach(element => {
				this.checkboxesData.push(element[this.uniqueKey]);
			});
		} else {
			this.checkboxesData = [];
		}
		return this.allItemsCheckd;
	},
	/**
	 * Check if the unique key exist in the feed or not if not disable the actions
	 * @returns boolean
	 */
	validateKey() {
		let keys =
			this.dataSet[0] !== undefined ? Object.keys(this.dataSet[0]) : [];

		return keys.includes(this.uniqueKey);
	},
	/**
	 * Trigger sort method
	 * @returns object
	 */
	sort(field, order = true) {
		return this.dataSet.sort(this.sortFields(field, order));
	},
	/**
	 * Sort Object by order desc or asc
	 * @returns object
	 */
	sortFields(field, order) {
		if (order) {
			return function (a, b) {
				if (a[field] > b[field]) return -1;
				if (a[field] < b[field]) return 1;
				return 0;
			};
		}
		return function (a, b) {
			if (a[field] < b[field]) return -1;
			if (a[field] > b[field]) return 1;
			return 0;
		};
	},
	/**
	 * Trigger Limitchanged events and update the end and start proprty
	 * @param {Int} value 
	 */
	limitUpdated(value) {
		events.$emit('LimitChanged', value)
		this.start = 0;
		this.end = parseInt(value);
	},

	next(page) {
		if (this.config.paginationLength !== undefined) {
			this.page = page;
			return events.$emit("pageChanged", page);
		}
		this.page = page;
		this.start = (page - 1) * this.limitVal;
		this.end = this.limitVal * page;
	},
	/**
	 * Check what search type developer defined
	 * @returns String
	 */
	search() {
		if (
			this.config.searchType !== undefined &&
			this.config.searchType === "remote"
		) {
			return this.remoteSearch();
		}

		return this.searchResults();
	},
	/**
	 * Trigger remotesearch Event and provide the searchkeywords
	 * @returns null
	 */
	remoteSearch() {
		events.$emit("remoteSearchTriggered", this.searchKeyword);
		return this.dataSet;
	},
	/**
	 * Filter the Data based on the entered search keryword
	 * @returns object
	 */
	searchResults() {
		let data;
		return this.dataSet.filter(obj => {
			for (const key in obj) {
				data = typeof obj[key] === "string" ? obj[key] : obj[key].toString();
				if (data.toLowerCase().includes(this.searchKeyword.toLowerCase())) {
					return true;
				}
			}
			return false;
		});
	},

	/**
	 * set columns if they are not provided by the user
	 * @returns object
	 */
	setColumns() {
		this.extractKeys().forEach(key => {
			let setActive = key.toLowerCase() === "id" ? false : true;
			this.columnsSet.push({
				name: key.toLowerCase(),
				active: setActive,
				isEditable: false
			});
		});
	},

	/**
	 * Extract Columns Key
	 * @returns array
	 */
	extractKeys() {
		let keys = [];

		for (let index = 0; index < this.feed.length; index++) {
			Object.keys(this.feed[index]).forEach(element => {
				if (!keys.includes(element)) {
					keys.push(element);
				}
			});
		}
		return keys;
	},
	/**
	 * Set The date Array based on the feed
	 * @returns void
	 */
	setDateFilter() {
		this.dataSet.forEach(element => {
			const date = this.$options.filters.monthYear(element.date);
			if (!this.dates.includes(date)) {
				this.dates.push(date);
			}
		});
	},
	/**
	 * Filter feed by givin date
	 * @returns obj
	 */
	filterfeedByDate(value) {
		return this.dataSet.filter(
			obj => this.$options.filters.monthYear(obj.date) === value
		);
	},
	/**
	 * broadcast Item Changed so other component can update the db accordinly
	 * @returns voud
	 */
	itemChanged(event) {
		const data = {
			uniqueKey: this.uniqueKey,
			key: event.target.dataset.index,
			field: event.target.headers,
			value: event.target.innerText
		};
		events.$emit("itemChanged", data);
	},
	/**
	 * Capitalize The First Letter Of A String
	 * @returns string
	 */
	capFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	},
	/**
	 * Prepare the values with the index for all edited fields
	 * Trigger Event so the the responsbile Compoenent will take the required action
	 * @returns
	 */
	bulkActionUpdate() {
		const val = [];
		val.uniqueKey = this.checkboxesData;
		val.values = {};
		for (let index = 0; index < this.editeItemsFields.length; index++) {
			val.values[this.editeItemsFields[index].name] = this.editeItemsFields[
				index
			].value;
		}
		this.activateBulkEdit = false;

		events.$emit("bulkUpdateActionHasBeenTaken", val);
	},
	/**
	 * Trigger Bulk Delete Event and pass the items indexes
	 * the responsbile Compoenent will take the required action
	 * @returns Void
	 */
	bulkActionDelete() {
		events.$emit("bulkDeletedeActionHasBeenTaken", this.checkboxesData);
		this.checkboxesData = [];
	},

	/**
	 * Trigger User Select Action
	 * @returns Void
	 */
	triggerAction(action) {
		if (action === "Edite") {
			if (this.checkboxesData.length === 0) {
				flashMsg(
					"First please select the items you want to update",
					"danger"
				);
				return;
			}

			this.activateBulkEdit = true;
		}

		if (action === "Delete") {
			if (this.checkboxesData.length === 0) {
				flashMsg(
					"First please select the items you want to delete",
					"danger"
				);
				return;
			}
			if (confirm("Are you sure?")) {
				this.bulkActionDelete();
			}
		}
	},

}

export default methods;