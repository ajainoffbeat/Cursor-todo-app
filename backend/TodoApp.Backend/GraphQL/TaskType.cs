using HotChocolate;
using HotChocolate.Types;
using TodoApp.Backend.Models;

namespace TodoApp.Backend.GraphQL;

public class TaskType : ObjectType<Models.Task>
{
    protected override void Configure(IObjectTypeDescriptor<Models.Task> descriptor)
    {
        descriptor
            .Field(t => t.Id)
            .Type<NonNullType<IntType>>();

        descriptor
            .Field(t => t.Title)
            .Type<NonNullType<StringType>>();

        descriptor
            .Field(t => t.Description)
            .Type<StringType>();

        descriptor
            .Field(t => t.Status)
            .Type<NonNullType<EnumType<Models.TaskStatus>>>();

        descriptor
            .Field(t => t.CreatedAt)
            .Type<NonNullType<DateTimeType>>();

        descriptor
            .Field(t => t.UpdatedAt)
            .Type<DateTimeType>();
    }
}

