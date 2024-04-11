using CMSReact.Server.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace CMSReact.Server.Context
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<Speciality> Specialities { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<Appointment>()
            //  .HasOne(b => b.User) // One Appointment has One User
            //  .WithMany(a => a.Appointments) // One User has Many Appointments
            //  .HasForeignKey(b => b.UserId); // Foreign Key configuration
        }
    }
}
