import { config } from "dotenv";
config();



export default {
	port: process.env.PORT || 1414,
	app: process.env.APP || 'APP',
	env: process.env.NODE_ENV || 'prod',
	secret: process.env.APP_SECRET || '12323wrwer',
	hostname: process.env.HOSTNAME || '312313',

	jwt: {
		acess_secret: process.env.JWT_ACCESS_SECRET || 'tretreter',
		refresh_sercet: process.env.JWT_REFRESH_SECRET || 'tretreter'
	}

};
