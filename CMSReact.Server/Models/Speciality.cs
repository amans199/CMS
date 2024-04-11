// Specialty.cs
using System.ComponentModel.DataAnnotations;

namespace CMSReact.Server.Models
{
    public class Speciality
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
    }
}
