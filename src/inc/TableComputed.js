const computed = {
	columnsSet: {
		get: function () {
			//check if columns is defined
			if (this.config.columns === undefined) {
				return this.columnsArray;
			}
			return this.config.columns;
		},
		set: function (newValue) {
			this.columnsArray = newValue;
		}
	},
	/**
	 * define the unique key for the data
	 * @return string
	 */
	uniqueKey() {
		if (this.config.uniqueKey !== undefined) {
			return this.config.uniqueKey;
		}
		return "id";
	},

	/**
	 * Set the data
	 * @returns  object
	 */
	dataSet() {
		return this.feed;
	},

	/**
	 * check the feed validation
	 * @returns boolean
	 */
	feedValid() {
		if (this.dataSet.length !== 0) {
			this.init();
			return true;
		}
		return false;
	},
	/**
	 * Activate or Deactivate Add new Item functionallity based on the user config
	 * Default True
	 * @returns Boolean
	 */
	activateAddNew() {
		if (this.config.addNewItem !== undefined) {
			return this.config.addNewItem;
		}
		return true;
	},
	/**
	 * Define the new item fields
	 * if defined by the user return his config otherwise retrun the object based on the manin column
	 * @return Object
	 */
	newItemFields() {
		if (this.config.newItemFields !== undefined) {
			return this.config.newItemFields;
		}
		const data = [];
		let type;
		this.extractKeys().forEach(element => {
			if (element === "date") {
				type = "date";
			} else if (element === "number") {
				type = "number";
			} else {
				type = "text";
			}
			const field = {
				name: this.capFirstLetter(element),
				type: type,
				required: true,
				value: ""
			};
			data.push(field);
		});
		return data;
	},
	/**
	 * Define the Bulk Edit fields
	 * if defined by the user return his config otherwise retrun the object based on the main column
	 * @return Object
	 */
	editeItemsFields() {
		if (this.config.editeItemsFields !== undefined) {
			return this.config.editeItemsFields;
		}
		const data = [];
		let type;
		this.extractKeys().forEach(element => {
			if (element === "date") {
				type = "date";
			} else if (element === "number") {
				type = "number";
			} else {
				type = "text";
			}
			const field = {
				name: this.capFirstLetter(element),
				type: type,
				required: true,
				value: ""
			};
			data.push(field);
		});
		return data;
	},

	/**Set Action based on the user Configuration */
	bullkActionsList() {
		if (this.config.actions !== undefined) {
			this.actions = this.config.actions;
		}
		const actionsArray = [];
		for (const key in this.actions) {
			if (this.actions[key]) {
				actionsArray.push(this.capFirstLetter(key));
			}
		}
		return actionsArray;
	},
	/**
	 * Check if the per Page is defined by the user if so return otherwise return the default
	 * @return array
	 */
	limits() {
		if (this.config.perPage !== undefined) {
			return this.config.perPage;
		}
		return [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
	},

	/**
	 * check if the the perPage is definded by the user and return the first item as deafult otherwise return the 10
	 * @returns int
	 */
	limit: {
		get: function () {
			if (this.config.perPage !== undefined) {
				this.end = this.config.perPage[0];
				return (this.limitVal = this.config.perPage[0]);
			}
			return (this.limitVal = 10);
		},
		set: function (value) {
			this.limitVal = value;
		}
	},
	/**
	 * Pass the Date  Format provide by the user if exist otherwise return the default
	 * @return string
	 */
	dateFormat() {
		if (
			this.config.date !== undefined &&
			typeof this.config.date.format === "string"
		) {
			return this.config.date.format;
		}
		return "MMMM Do YYYY, h:mm:ss a";
	},
	/**
	 * check if the user toggle the date activation if not return default true
	 * @return boolean
	 */
	dateActivation() {
		if (this.config.date !== undefined) {
			return this.config.date.active;
		}
		return true;
	},
	/**
	 * Filter the Unactivated Column
	 * @return object
	 */
	filteredColumn() {
		return this.columnsSet.filter(obj => obj.active);
	},

	title() {
		if (this.config.title !== undefined) {
			return this.config.title;
		}
		return null;
	},
	notItem() {
		return this.filteredList() == 0;
	},
	/**
	 * Define the pagination lenght
	 * @returns Integer
	 */
	paginationLength() {
		if (this.config.paginationLength !== undefined) {
			return this.config.paginationLength;
		}
		return this.feed.length;
	},
	paginationLimit() {
		if (this.config.paginationLimit !== undefined) {
			return this.config.paginationLimit;
		}
		return this.limitVal;
	}
}

export default computed;