import { Resolver, Query, Ctx, Mutation, Args } from 'type-graphql';
import Task from '../models/Task.model';
import AddTaskType from '../input/tasks/AddTask.input';
import DeleteTaskType from '../input/Delete.input';
import UpdateTaskType from '../input/tasks/UpdateTask.input';

@Resolver(Task)
class TaskResolver {
    @Query(() => [Task, Query])
    async allTasks(@Ctx() ctx: { prisma: any }) {
        return ctx.prisma.task.findMany();
    }

    @Mutation(() => Task)
    async addTask(
        @Args()
        {
            subject,
            status,
            dueDate,
            initialSpentTime,
            additionalSpentTime,
            advancement,
            createdAt,
            updatedAt,
        }: AddTaskType,
        @Ctx() ctx: { prisma: any }
    ) {
        const taskToDb = await ctx.prisma.task.create({
            data: {
                subject,
                status,
                dueDate,
                initialSpentTime,
                additionalSpentTime,
                advancement,
                createdAt,
                updatedAt,
            },
        });
        return taskToDb;
    }

    @Mutation(() => Task)
    async deleteTask(
        @Args()
        { id }: DeleteTaskType,
        @Ctx() ctx: { prisma: any }
    ) {
        const currentTask = ctx.prisma.task.delete({
            where: {
                id,
            },
        });
        return currentTask;
    }

    @Mutation(() => Task)
    async updateTask(
        @Args()
        {
            id,
            subject,
            status,
            dueDate,
            additionalSpentTime,
            advancement,
            updatedAt,
        }: UpdateTaskType,
        @Ctx() ctx: { prisma: any }
    ) {
        const taskToUpdate = ctx.prisma.task.findUnique({
            where: { id },
        });

        const taskUpdated = ctx.prisma.task.update({
            where: { id },
            data: {
                subject: taskToUpdate.subject ?? subject,
                status: taskToUpdate.status ?? status,
                dueDate: taskToUpdate.dueDate ?? dueDate,
                additionalSpentTime:
                    taskToUpdate.additionalSpentTime ?? additionalSpentTime,
                advancement: taskToUpdate.advancement ?? advancement,
                updatedAt,
            },
        });

        return taskUpdated;
    }
}

export default TaskResolver;
