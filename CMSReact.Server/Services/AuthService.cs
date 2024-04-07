using CMSReact.Server.Context;
using CMSReact.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace CMSReact.Server.Services;
public class AuthService
{
    private readonly AppDbContext _dbContext;

    public AuthService(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IActionResult> RegisterUserAsync(User user)
    {
        // Check if username or email already exists
        bool userExists = await _dbContext.Users.AnyAsync(u => u.Username == user.Username || u.Email == user.Email);
        if (userExists)
        {
            // User with the same username or email already exists
            return new BadRequestObjectResult("Username or email already exists.");
        }


        // Hash the password
        user.PasswordHash = HashPassword(user.PasswordHash);

        // Set CreatedAt to current date and time
        user.CreatedAt = DateTime.UtcNow;

        _dbContext.Users.Add(user);
        await _dbContext.SaveChangesAsync();

        // Remove password hash before returning the user
        var sanitizedUser = SanitizeUser(user);

        return new OkObjectResult(sanitizedUser);
    }

    public async Task<IActionResult> LoginAsync(string email, string password)
    {
        var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == email);

        if (user == null)
            return new BadRequestObjectResult("User not found.");

        if (!VerifyPassword(password, user.PasswordHash))
        {
            return new BadRequestObjectResult("Incorrect Email or Password");
        }

        // Remove password hash before returning the user
        var sanitizedUser = SanitizeUser(user);

        return new OkObjectResult(sanitizedUser);
    }

    private User SanitizeUser(User user)
    {
        // Clone the user object and remove the password hash
        return new User
        {
            Id = user.Id,
            Username = user.Username,
            Email = user.Email,
            CreatedAt= user.CreatedAt,
        };
    }

    private string HashPassword(string password)
    {
        // Implement password hashing logic (e.g., using BCrypt, Argon2, etc.)
        // Example: return BCrypt.HashPassword(password);
        return password; // Placeholder for simplicity
    }

    private bool VerifyPassword(string password, string hashedPassword)
    {
        // Implement password verification logic
        // Example: return BCrypt.Verify(password, hashedPassword);
        return password == hashedPassword; // Placeholder for simplicity
    }
}
