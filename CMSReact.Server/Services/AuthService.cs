using CMSReact.Server.Context;
using CMSReact.Server.Models;
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

    public async Task<bool> RegisterUserAsync(User user)
    {
        // Check if username or email already exists
        if (await _dbContext.Users.AnyAsync(u => u.Username == user.Username || u.Email == user.Email))
            return false;

        // Hash the password
        user.PasswordHash = HashPassword(user.PasswordHash);

        _dbContext.Users.Add(user);
        await _dbContext.SaveChangesAsync();
        return true;
    }

    public async Task<User> LoginAsync(string username, string password)
    {
        var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Username == username);

        if (user == null || !VerifyPassword(password, user.PasswordHash))
            return null;

        return user;
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
