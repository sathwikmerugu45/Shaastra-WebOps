import { IsNotEmpty } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql"
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@ObjectType()
@Entity()
export class Task extends BaseEntity{
    @Field(()=>ID)
    @PrimaryGeneratedColumn()
    id: number ;

    @Field()
    @Column()
    @IsNotEmpty()
    taskTitle: string;
    
    @Field()
    @Column({ default: false })
    @IsNotEmpty()
    taskStatus: boolean ;

    @Field()
    @Column()
    @IsNotEmpty()
    taskDate: string ;

    @Field()
    @Column()
    @IsNotEmpty()
    sortDate: string;
}