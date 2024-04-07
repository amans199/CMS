using CMSReact.Server.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace CMSReact.Server.Context;
public class AppDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Appointment> Appointments{ get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {

    }

    //protected override void OnModelCreating(ModelBuilder modelBuilder)
    //{
    //    // Configure the relationship between Appointment and User
    //    modelBuilder.Entity<Appointment>()
    //        .HasOne(a => a.User)
    //        .WithMany(u => u.Appointments)
    //        .HasForeignKey(a => a.UserId)
    //        .OnDelete(DeleteBehavior.Restrict); // Specify the desired delete behavior

    //    base.OnModelCreating(modelBuilder);
    //}
}

