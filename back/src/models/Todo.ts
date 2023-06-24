import { Model } from "objection";

export default class Todo extends Model {
    id!: number
    user_id!: number
    title!: string
    done!: 1 | 0
    

    static get tableName() {
        return 'todos'
    }

	

    // static get relationMappings() {
	// 	return {
	// 		attached_projects: {
	// 			relation: Model.HasManyRelation,
	// 			modelClass: UserProject,
	// 			join: {
	// 				from: "user.id",
	// 				to: "user_project.user_id",
	// 			},
	// 		},

	// 	};
	// }
}