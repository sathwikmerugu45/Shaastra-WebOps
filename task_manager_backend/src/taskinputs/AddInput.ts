import { Field, InputType } from "type-graphql";

@InputType()
export class AddInput{
    id:number;

    @Field()
    taskTitle: string;
    
    taskStatus: boolean ;

    @Field()
    taskDate: string ;

    @Field()
    sortDate: string;
}