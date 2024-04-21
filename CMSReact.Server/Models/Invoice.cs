using System.ComponentModel.DataAnnotations.Schema;

namespace CMSReact.Server.Models;

public class Invoice
{
    public int Id { get; set; }
    public DateTime InvoiceDate { get; set; } = DateTime.UtcNow; // Default to current UTC time
    public string InvoiceNumber { get; set; } // Unique identifier for the invoice
    public string PatientName { get; set; }
    public string DoctorName { get; set; }
    public string ServiceDescription { get; set; } // Brief description of service provided
    public decimal TotalAmount { get; set; }
    public ICollection<InvoiceItem> InvoiceItems { get; set; }
    public int AppointmentId { get; set; } // Foreign key for Appointment

    [ForeignKey("AppointmentId")]
    public Appointment Appointment { get; set; }
}