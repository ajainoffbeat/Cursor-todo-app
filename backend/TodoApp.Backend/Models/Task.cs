using System.ComponentModel.DataAnnotations;

namespace TodoApp.Backend.Models;

public class Task
{
    public int Id { get; set; }
    
    [Required]
    [StringLength(200)]
    public string Title { get; set; } = string.Empty;
    
    [StringLength(1000)]
    public string? Description { get; set; }
    
    public TaskStatus Status { get; set; } = TaskStatus.Pending;
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public DateTime? UpdatedAt { get; set; }
}

public enum TaskStatus
{
    [GraphQLName("Pending")]
    Pending,

    [GraphQLName("Completed")]
    Completed
}

