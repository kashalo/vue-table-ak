import moment from "moment";
const filters = {
	formatDate(date) {
		if (typeof date === "string") {
			throw "Date Must be an object ";
		}
		return moment(date[0]).format(date[1]);
	},
	monthYear(date) {
		return moment(date).format("MMMM (YYYY)");
	}
};

export default filters;