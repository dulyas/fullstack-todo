import { Model } from "objection";
import UserDto from "@/dtos/user-dto";
import Todo from "./Todo";

export type UserWithTokens = {
    refreshToken: string
    accessToken: string
    user: UserDto
}


export default class User extends Model {
    id!: number
    email!: string
    password!: string
	todos?: Todo[]

    static get tableName() {
        return 'users'
    }


	
    static get relationMappings() {
		return {
			todos: {
				relation: Model.HasManyRelation,
				modelClass: Todo,
				join: {
					from: "users.id",
					to: "todos.user_id",
				},
			},
		};
	}
}