import { Field, InputType } from "type-graphql";

@InputType()
export class StatusInput{
    @Field()
    id:number;

    taskTitle: string;
    
    @Field()
    taskStatus: boolean ;

    taskDate: string ;

    sortDate: string;
}