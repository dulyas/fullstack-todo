import { Todo } from "@/models"
import User from "@/models/User"


export default class UserDto {
    email: string
    id: number
    todos?: Todo[]

    constructor(model: User) {
        this.email = model.email
        this.id = model.id
        if (model.todos) this.todos = model.todos
    }
}