import { Service } from 'typedi';

@Service()
class TaskService {
    async findAll(ctx: any) {
        return ctx.prisma.task.findMany({
            include: {
                project: true,
                comments: true,
                documents: true,
                users: true,
            },
        });
    }

    async save(
        ctx: any,
        subject: string,
        status: string,
        dueDate: string,
        initialSpentTime: number,
        additionalSpentTime: number[],
        advancement: number,
        projectId: string,
        userId: string
    ) {
        const taskToDb = await ctx.prisma.task.create({
            data: {
                subject,
                status,
                dueDate,
                initialSpentTime,
                additionalSpentTime,
                advancement,
                project: {
                    connect: { id: projectId },
                },
                users: {
                    connect: [{ id: userId }],
                },
            },
            include: {
                project: true,
                comments: true,
                documents: true,
                users: true,
            },
        });
        return taskToDb;
    }

    async updateOne(
        ctx: any,
        id: string,
        subject?: string,
        status?: string,
        dueDate?: string,
        additionalSpentTime?: number[],
        advancement?: number,
        projectId?: string,
        userId?: string
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
                project: {
                    connect: { id: projectId },
                },
                users: userId
                    ? {
                          connect: [{ id: userId }],
                      }
                    : {},
            },
            include: {
                project: true,
                comments: true,
                documents: true,
                users: true,
            },
        });

        return taskUpdated;
    }

    async deleteOne(ctx: any, id: string) {
        const currentTask = ctx.prisma.task.delete({
            where: {
                id,
            },
            include: {
                project: true,
                comments: true,
                documents: true,
                users: true,
            },
        });
        return currentTask;
    }
}

export default TaskService;
