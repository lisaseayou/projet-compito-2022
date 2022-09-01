/* eslint-disable import/no-cycle */
import { ObjectType, Field, ID, GraphQLISODateTime } from 'type-graphql';
import Comment from './Comment.model';
import Notification from './Notification.model';
import Project from './Project.model';
import Task from './Task.model';

@ObjectType()
class User {
    @Field(() => ID, { description: 'Id of the user' })
    id: string;

    @Field(() => String, { description: 'Name of the user' })
    name: string;

    @Field(() => String, { description: 'Email of the user' })
    email: string;

    @Field(() => [String], { description: 'Roles of the user' })
    roles: string[];

    @Field(() => String, { description: 'Password of the user' })
    password: string;

    @Field(() => GraphQLISODateTime, {
        description: "The user's registration date",
    })
    createdAt: Date;

    @Field(() => GraphQLISODateTime, {
        description: 'Date of last modification of user informations',
    })
    updatedAt: Date;

    @Field(() => String, {
        nullable: true,
        description: 'Web site of the user',
    })
    url?: string;

    @Field(() => String, {
        nullable: true,
        description: 'Twitter username of the user',
    })
    twitter?: string;

    @Field(() => String, {
        nullable: true,
        description: 'Linkedin username of the user',
    })
    linkedin?: string;

    @Field(() => String, {
        nullable: true,
        description: 'Github username of the user',
    })
    github?: string;

    @Field(() => String, {
        nullable: true,
        description: 'description of the user',
    })
    description?: string;

    @Field(() => [Notification], {
        nullable: true,
        description: 'List of comments related to the user',
    })
    notifications?: Notification[];

    @Field(() => [Comment], {
        nullable: true,
        description: 'List of comments related to the user',
    })
    comments?: Comment[];

    @Field(() => [Project], {
        nullable: true,
        description: 'List of Projects related to the user',
    })
    projects?: Project[];

    @Field(() => [Task], {
        nullable: true,
        description: 'List of tasks related to the user',
    })
    tasks?: Task[];
}

export default User;
