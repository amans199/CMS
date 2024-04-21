namespace CMSReact.Server.Models;
public class Prescription
{
    public int Id { get; set; }
    public int AppointmentId { get; set; }
    public string Medication { get; set; }
    public string Dosage { get; set; }
    public string Instructions { get; set; }
    public Appointment Appointment { get; set; } // Navigation property
}