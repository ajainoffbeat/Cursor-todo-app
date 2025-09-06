using HotChocolate;
using TodoApp.Backend.Models;

namespace TodoApp.Backend.GraphQL.InputTypes;

public record UpdateTaskStatusInput(
    [GraphQLDescription("The ID of the task to update")]
    int Id,
    
    [GraphQLDescription("The new status of the task")]
    Models.TaskStatus Status
);

