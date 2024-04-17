using System.ComponentModel.DataAnnotations;

namespace CMSReact.Server.DTOs
{
    public class UserDto
    {

        public int Id { get; set; }

        public string FullName { get; set; } = string.Empty;

        public string Gender { get; set; } = string.Empty;

        public string Phone { get; set; } = string.Empty;

        public string Address { get; set; } = string.Empty;

        public string DateOfBirth { get; set; } = string.Empty;

        public string ProfilePicture { get; set; } = string.Empty;

    }
}
