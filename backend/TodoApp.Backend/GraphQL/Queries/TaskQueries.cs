using HotChocolate;
using Microsoft.EntityFrameworkCore;
using TodoApp.Backend.Data;
using TodoApp.Backend.Models;

namespace TodoApp.Backend.GraphQL.Queries;

//[ExtendObjectType("Query")]
public class TaskQueries
{
    public async Task<IEnumerable<Models.Task>> GetAllTasksAsync(
        [Service] TodoDbContext context,
        CancellationToken cancellationToken)
    {
        return await context.Tasks
            .OrderByDescending(t => t.CreatedAt)
            .ToListAsync(cancellationToken);
    }

    public async Task<Models.Task?> GetTaskByIdAsync(
        int id,
        [Service] TodoDbContext context,
        CancellationToken cancellationToken)
    {
        return await context.Tasks
            .FirstOrDefaultAsync(t => t.Id == id, cancellationToken);
    }
}

