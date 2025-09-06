using HotChocolate;
using HotChocolate.Subscriptions;
using Microsoft.EntityFrameworkCore;
using TodoApp.Backend.Data;
using TodoApp.Backend.GraphQL.InputTypes;
using TodoApp.Backend.Models;

namespace TodoApp.Backend.GraphQL.Mutations;

//[ExtendObjectType("Mutation")]
public class TaskMutations
{
    public async Task<Models.Task> CreateTaskAsync(
        CreateTaskInput input,
        [Service] TodoDbContext context,
        [Service] ITopicEventSender eventSender,
        CancellationToken cancellationToken)
    {
        var task = new Models.Task
        {
            Title = input.Title,
            Description = input.Description,
            Status = Models.TaskStatus.Pending,
            CreatedAt = DateTime.UtcNow
        };

        context.Tasks.Add(task);
        await context.SaveChangesAsync(cancellationToken);

        await eventSender.SendAsync("TaskCreated", task, cancellationToken);

        return task;
    }

    public async Task<Models.Task?> UpdateTaskStatusAsync(
        UpdateTaskStatusInput input,
        [Service] TodoDbContext context,
        [Service] ITopicEventSender eventSender,
        CancellationToken cancellationToken)
    {
        var task = await context.Tasks
            .FirstOrDefaultAsync(t => t.Id == input.Id, cancellationToken);

        if (task == null)
            return null;

        task.Status = input.Status;
        task.UpdatedAt = DateTime.UtcNow;

        await context.SaveChangesAsync(cancellationToken);

        await eventSender.SendAsync("TaskUpdated", task, cancellationToken);

        return task;
    }
}

