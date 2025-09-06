using HotChocolate;
using HotChocolate.Subscriptions;
using TodoApp.Backend.Models;

namespace TodoApp.Backend.GraphQL.Subscriptions;

//[ExtendObjectType("Subscription")]
public class TaskSubscriptions
{
    [Subscribe]
    public System.Threading.Tasks.Task<Models.Task> OnTaskCreated([EventMessage] Models.Task task) => System.Threading.Tasks.Task.FromResult(task);

    [Subscribe]
    public System.Threading.Tasks.Task<Models.Task> OnTaskUpdated([EventMessage] Models.Task task) => System.Threading.Tasks.Task.FromResult(task);
}

