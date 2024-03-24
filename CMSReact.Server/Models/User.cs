﻿using System.ComponentModel.DataAnnotations;

namespace CMSReact.Server.Models;
public class User
{
    public int Id { get; set; }

    [Required]
    public string Username { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    public string PasswordHash { get; set; }
}
