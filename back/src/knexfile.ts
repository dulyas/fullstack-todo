import config from "@/config";
import moment from 'moment'


// types.setTypeParser(types.builtins.DATE, val => moment(val).format('YYYY-MM-DD'));
// types.setTypeParser(types.builtins.TIME, val => moment(val).format('HH:mm:ss'));
// types.setTypeParser(types.builtins.TIMETZ, val => moment(val).format('HH:mm:ss'));
// types.setTypeParser(types.builtins.TIMESTAMP, val => moment(val).format('YYYY-MM-DD HH:mm:ss'));
// types.setTypeParser(types.builtins.TIMESTAMPTZ, val => moment(val).format('YYYY-MM-DD HH:mm:ss'));
import path from 'path'

export default {
	development: {
		client: 'sqlite3',
		connection: {
			filename: path.resolve(__dirname, './db/todos.db3')
		},
		migrations: {
			directory: path.resolve(__dirname, "./migrations"),
			extension: "ts",
		  },
		pool: {
			min: 2,
			max: 10,
		},

	},
	
};
