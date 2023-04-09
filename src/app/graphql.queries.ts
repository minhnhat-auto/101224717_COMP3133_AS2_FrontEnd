import { gql } from 'apollo-angular'

const REGISTER_USER = gql`mutation ($registerInput: RegisterInput) {
    registerUser(registerInput: $registerInput) {
      id
      username
      email
      password
      token
    }
  }
`

const LOGIN_USER = gql`query ($loginInput: LoginInput) {
  loginUser(loginInput: $loginInput) {
    id
    username
    email
    password
    token
  }
}
`

const GET_ALL_EMPLOYEE = gql`query GetAllEmployee {
  getAllEmployee {
    id
    first_name
    last_name
    email
    gender
    salary
  }
}
`

const ADD_EMPLOYEE = gql`
mutation ($addEmployeeInput: AddEmployeeInput) {
  addEmployee(addEmployeeInput: $addEmployeeInput) {
    id
    first_name
    last_name
    email
    gender
    salary
  }
}
`
const GET_EMPLOYEE_BY_ID = gql`
query GetEmployeeByID($getEmployeeByIdId: ID!) {
  getEmployeeByID(id: $getEmployeeByIdId) {
    id
    first_name
    last_name
    email
    gender
    salary
  }
}
`

const DELETE_EMPLOYEE = gql`
mutation ($deleteEmployeeId: String!) {
  deleteEmployee(id: $deleteEmployeeId) {
    id
    first_name
    last_name
    email
    gender
    salary
  }
}
`

const UPDATE = gql`
mutation UpdateEmployee($updateEmployeeId: String!, $firstName: String!, $lastName: String!, $email: String!, $gender: String!, $salary: Float!) {
  updateEmployee(id: $updateEmployeeId, first_name: $firstName, last_name: $lastName, email: $email, gender: $gender, salary: $salary) {
    id
    first_name
    last_name
    email
    gender
    salary
  }
}
`

export { REGISTER_USER, LOGIN_USER, GET_ALL_EMPLOYEE, ADD_EMPLOYEE, GET_EMPLOYEE_BY_ID,  DELETE_EMPLOYEE, UPDATE}