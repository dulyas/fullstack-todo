import { join } from 'path'
import swaggerAutogen from 'swagger-autogen'




const doc = {

    info: {
      title: 'fullstacktodo',
      description: 'My fullstacktodo'
    },
    definitions: {
        User: {
            id: '1',
            email: 'tester@test.com'
        },
        Users: [{
            $ref: '#/definitions/User'             
        }],
        UserWithTokens: {
            user: {
            $ref: '#/definitions/User'
            },
            refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlckB0ZXN0LmNvbSIsImlkIjoxLCJpYXQiOjE2ODc2MjcyMDIsImV4cCI6MTY5MDIxOTIwMn0.kFZHqXCfnlOjhipw7UuVnTlgkXE21jk1U5oQ4bGgloE',
            accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlckB0ZXN0LmNvbSIsImlkIjoxLCJpYXQiOjE2ODc2MjcyMDIsImV4cCI6MTY5MDIxOTIwMn0.kFZHqXCfnlOjhipw7UuVnTlgkXE21jk1U5oQ4bGgloE'
        },

      Todo: {
        id: '1',
        title: 'test',
        done: false
      },
      Todos: [
        {
          $ref: '#/definitions/Todo'
        }
      ],
    },
    // host: 'localhost:1338',s
    // schemes: ['http'],

   }

// путь и название генерируемого файла
const outputFile = join(__dirname, 'output.json')
// массив путей к роутерам
const endpointsFiles = [join(__dirname, '../router/user'), join(__dirname, '../router/todo')]

swaggerAutogen()(outputFile, endpointsFiles, doc).then(res => {
  console.log(res)
})