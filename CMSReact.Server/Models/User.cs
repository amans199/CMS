using System.ComponentModel.DataAnnotations;

namespace CMSReact.Server.Models;
public class User
{
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; }

    [Required]
    public string Username { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    public string PasswordHash { get; set; }

    [Required]
    public string Type { get; set; }

    [Required]
    public string FullName { get; set; }

    [Required]
    public string Gender { get; set; }

    [Required]
    public string Phone{ get; set; } = string.Empty;

    [Required]
    public string Address { get; set; }

    [Required]
    public DateOnly DateOfBirth { get; set; }
}
