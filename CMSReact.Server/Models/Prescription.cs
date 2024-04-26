using System.ComponentModel.DataAnnotations.Schema;

namespace CMSReact.Server.Models;
public class Prescription
{
    public int Id { get; set; }
    public string Medication { get; set; }
    public string Instructions { get; set; }
    public int AppointmentId { get; set; }
}