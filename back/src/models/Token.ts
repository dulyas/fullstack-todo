import { Model } from "objection";


export default class Token extends Model {
    id!: number
    user_id!: string
    refreshToken!: string

    static get tableName() {
        return 'tokens'
    }

    // static get relationMappings() {
	// 	return {
	// 		teachers: {
	// 			relation: Model.ManyToManyRelation,
	// 			modelClass: Teacher,
	// 			join: {
	// 				from: 'lessons.id',
	// 				through: {
	// 				  from: 'lesson_teachers.lesson_id',
	// 				  to: 'lesson_teachers.teacher_id'
	// 				},
	// 				to: 'teachers.id'
	// 			  }
	// 		},
	// 		students: {
	// 			relation: Model.ManyToManyRelation,
	// 			modelClass: Student,
	// 			join: {
	// 				from: 'lessons.id',
	// 				through: {
	// 				  from: 'lesson_students.lesson_id',
	// 				  extra: ['visit'],
	// 				  to: 'lesson_students.student_id'
	// 				},
	// 				to: 'students.id'
	// 			  }
	// 		}
	// 	};
	// }
}