import { gql } from "@apollo/client";

export const EDIT_TASK=gql`
  mutation($editData: EditInput!){
  editTask(editData: $editData) {
    id
    taskDate
    taskStatus
    taskTitle
  }
}`

export const ADD_TASK=gql`
mutation($addData: AddInput!){
  addTask(addData: $addData) {
    id
    taskDate
    taskStatus
    taskTitle
  }
}`

export const DELETE_TASK=gql`
mutation($deleteData: Float!){
  deleteTask(deleteData: $deleteData)
}`

export const STATUS_CHANGE=gql`
mutation($statusChange: StatusInput!){
  changeStatus(statusChange: $statusChange) {
    id
    taskDate
    taskStatus
    taskTitle
  }
}
`