using CMSReact.Server.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace CMSReact.Server.Context;
public class AppDbContext : DbContext
{
    public DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("Server=localhost;Database=CMSReactDB;Trusted_Connection=True;");
    }
}

