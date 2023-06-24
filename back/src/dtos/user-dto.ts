import User from "@/models/User"


export default class UserDto {
    email: string
    id: number

    constructor(model: User) {
        this.email = model.email
        this.id = model.id
    }
}