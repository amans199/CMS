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

    public string PasswordHash { get; set; }

    public string FullName { get; set; } = string.Empty;

    public string Gender { get; set; } = string.Empty;

    public string Phone{ get; set; } = string.Empty;

    public string Address { get; set; } = string.Empty;

    public string DateOfBirth { get; set; } = string.Empty;

    public string ProfilePicture { get; set; } = string.Empty;    


    public bool IsAdmin { get; set; } = false;  // Default user is not admin
    public bool IsDoctor { get; set; } = false;  // Default user is not doctor
    public string Status { get; set; } = "Pending";   // Pending - Rejected - Approved

    public int SpecialityId { get; set; }

    public ICollection<AppointmentUser> AppointmentUsers { get; set; } = new List<AppointmentUser>();
}
