import { Field, InputType } from "type-graphql";

@InputType()
export class EditInput{
    @Field()
    id:number;

    @Field()
    taskTitle: string;
    
    taskStatus: boolean ;

    @Field()
    taskDate: string ;

    @Field()
    sortDate: string;
}