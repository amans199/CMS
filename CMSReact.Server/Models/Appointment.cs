using System.ComponentModel.DataAnnotations;

namespace CMSReact.Server.Models
{
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

        [Required]
        public int DoctorId {  get; set; }


        public int UserId { get; set; }
        //public User User { get; set; }
    }
}
