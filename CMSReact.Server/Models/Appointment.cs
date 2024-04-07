using System.ComponentModel.DataAnnotations;

namespace CMSReact.Server.Models
{
    public class Appointment
    {
        public int Id { get; set; }

        [Required]
        public string userName { get; set; }

        [Required]
        public string Date { get; set; }

        [Required]
        public string Time { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        public string Comment { get; set; } = string.Empty;

    }
}
