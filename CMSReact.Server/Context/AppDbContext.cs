using CMSReact.Server.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Reflection.Metadata;
using System.Text.RegularExpressions;

namespace CMSReact.Server.Context
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<Speciality> Specialities { get; set; }
        public DbSet<AppointmentUser> AppointmentUsers { get; set; }
        public DbSet<Prescription> Prescriptions { get; set; }
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var adminUser = new User
            {
                Id=1,
                FullName = "Admin User",
                Username = "admin",
                Email = "admin@gmail.com",
                PasswordHash = "admin123",
                IsAdmin = true,
                Status="Approved"
            };

            modelBuilder.Entity<User>().HasData(adminUser);
        }
    }
}
