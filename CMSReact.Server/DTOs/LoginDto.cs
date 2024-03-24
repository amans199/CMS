using System.ComponentModel.DataAnnotations;

namespace CMSReact.Server.DTOs;
public class LoginDto
{
    [Required]
    public string Email { get; set; }

    [Required]
    [MinLength(6)]
    public string Password { get; set; }
}
