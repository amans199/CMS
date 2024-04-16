using CMSReact.Server.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Appointment
{
    public int Id { get; set; }

    [Required]
    public string Date { get; set; }

    [Required]
    public string Time { get; set; }

    [Required]
    public DateTime CreatedAt { get; set; }

    [Required]
    public string Reason { get; set; } = string.Empty;

    public string Comment { get; set; } = string.Empty;

   

    public string Status { get; set; } = "Pending"; // Pending - Rejected - Approved

    public string? RejectionReason { get; set; } = String.Empty;

    //[Required]
    //public int CreatedBy { get; set; }

    public int? OriginalAppointmentId { get; set; }


    public ICollection<AppointmentUser> AppointmentUsers { get; set; } = new List<AppointmentUser>();

}
