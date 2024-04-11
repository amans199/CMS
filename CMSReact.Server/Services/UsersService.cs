using CMSReact.Server.Context;
using CMSReact.Server.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CMSReact.Server.Services
{
    public class UsersService
    {
        private readonly AppDbContext _dbContext;

        public UsersService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            var users = await _dbContext.Users.ToListAsync();
            //return users.Select(SanitizeUser);
            return users;
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            var user = await _dbContext.Users.FindAsync(id);
            if (user == null)
            {
                throw new KeyNotFoundException($"User with ID {id} not found");
            }
            //return SanitizeUser(user);
            return user;
        }

        public async Task<User> GetUserByUsernameAsync(string username)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Username == username);
            if (user == null)
            {
                throw new KeyNotFoundException($"User with username '{username}' not found");
            }
            //return SanitizeUser(user);
            return user;
        }


        public async Task<int> CreateUserAsync(User newUser)
        {
            // Check if username or email already exists
            bool userExists = await _dbContext.Users.AnyAsync(u => u.Username == newUser.Username || u.Email == newUser.Email);
            if (userExists)
            {
                throw new InvalidOperationException("Username or email already exists");
            }

            // Hash the password (implement your password hashing logic here)
            newUser.PasswordHash = HashPassword(newUser.PasswordHash);

            _dbContext.Users.Add(newUser);
            await _dbContext.SaveChangesAsync();
            return newUser.Id;
        }

        private string HashPassword(string password)
        {
            // Implement password hashing logic (e.g., using BCrypt, Argon2, etc.)
            // Example: return BCrypt.HashPassword(password);
            return password; // Placeholder for simplicity (not recommended in production)
        }

        private User SanitizeUser(User user)
        {

            return user;
            //return new User
            //{
            //    Id = user.Id,
            //    Username = user.Username,
            //    Email = user.Email,
            //    CreatedAt = user.CreatedAt,
            //    Type = user.Type,
            //    // Exclude sensitive fields from being exposed (e.g., password hash)
            //};
        }
    }
}
