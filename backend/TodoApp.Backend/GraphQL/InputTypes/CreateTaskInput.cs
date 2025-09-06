using HotChocolate;

namespace TodoApp.Backend.GraphQL.InputTypes;

public record CreateTaskInput(
    [GraphQLDescription("The title of the task")]
    string Title,
    
    [GraphQLDescription("Optional description of the task")]
    string? Description = null
);

