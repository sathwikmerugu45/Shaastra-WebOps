import { AddInput } from "../taskinputs/AddInput";
import { Task } from "../entity/Task";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { EditInput } from "../taskinputs/EditInput";
import { StatusInput } from "../taskinputs/StatusInput";

@Resolver()
export class TaskResolver {

  @Query(() => [Task])
  async getTasks(): Promise<Task[]> {
    const tasks = await Task.find({order:{sortDate:'ASC'}});
    return tasks;
  }
  
  @Mutation(() => Task)
  async addTask(
    @Arg("addData") {taskTitle, taskStatus , taskDate, sortDate}: AddInput
  ): Promise<Task> {
    const task = await Task.create({
      taskTitle: taskTitle,
      taskStatus: taskStatus,
      taskDate: taskDate,
      sortDate: sortDate,
    }).save();

    return task;
  }

  @Mutation(() => Task)
  async editTask(
    @Arg("editData") {id, taskTitle , taskDate}: EditInput,
  ): Promise<Task | null> {
    const task = await Task.findOne({where:{id}});

    if (!task) {
      throw new Error("Task not found");
    }

    task.taskTitle = taskTitle;
    task.taskDate = taskDate;
    task.sortDate= taskDate.slice(6,10)+"-"+taskDate.slice(3,5)+"-"+taskDate.slice(0,2);

    await task.save();
    
    return task;
  }

  @Mutation(() => Boolean)
  async deleteTask(
    @Arg("deleteData") id: number
  ): Promise<boolean> {
    const {affected} = await Task.delete(id);
    return affected===1;
  }

  @Mutation(()=>Task)
  async changeStatus(
    @Arg("statusChange") {id, taskStatus}:StatusInput
  ):Promise<Task>{
    const task = await Task.findOne({where:{id}});

    if (!task) {
      throw new Error("Task not found");
    }
    
    task.taskStatus=taskStatus
    await task.save();

    return task;
  }
   
}