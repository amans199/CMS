using CMSReact.Server.Models;

public class AppointmentUser
{
    public int Id { get; set; } // Primary key for the associative entity

    public int AppointmentId { get; set; }
    public Appointment Appointment { get; set; }

    public int UserId { get; set; }
    public User User { get; set; }

    public bool IsDoctor { get; set; } // Flag to indicate if the user is the doctor or patient
}
