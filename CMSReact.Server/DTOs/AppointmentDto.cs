namespace CMSReact.Server.DTOs;
public class AppointmentDto
{
    public string Date { get; set; }
    public string Time { get; set; }
    public string Reason { get; set; }
    public int CreatedBy { get; set; }
    public int DoctorId { get; set; }
    public int PatientId { get; set; }
}
