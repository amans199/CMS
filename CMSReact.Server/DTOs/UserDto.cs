﻿using System.ComponentModel.DataAnnotations;

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

        public List<string> AvailableWeekDays { get; set; } = new List<string>();

        public string AvailableTimeFrom { get; set; } = string.Empty;

        public string AvailableTimeTo { get; set; } = string.Empty;

        public string AvailableTimeNote { get; set; } = string.Empty;

    }
}
