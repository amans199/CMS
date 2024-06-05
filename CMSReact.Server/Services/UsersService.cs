using CMSReact.Server.Context;
using CMSReact.Server.DTOs;
using CMSReact.Server.Models;
using Microsoft.AspNetCore.Mvc;
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

        public async Task<IEnumerable<User>> GetUsersAsync(string? username = null, bool? isDoctor = null, string? status = null, int? specialtyId= null)
        {
            var query = _dbContext.Users.AsQueryable();

            if (!string.IsNullOrEmpty(username))
            {
                query = query.Where(u => u.Username.ToLower().Contains(username.ToLower()));
            }

            if (!string.IsNullOrEmpty(status))
            {
                query = query.Where(u => u.Status.ToLower() == status.ToLower());
            }

            if (isDoctor.HasValue)
            {
                query = query.Where(u => u.IsDoctor == isDoctor);
            }

            if (specialtyId != null)
            {
                query = query.Where(u => u.SpecialityId == specialtyId);
            }

            return await query.ToListAsync();
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            var user = await _dbContext.Users.FindAsync(id);
            if (user == null)
            {
                throw new BadHttpRequestException($"User with ID {id} not found");
            }
            return user;
        }

        public async Task<IActionResult> ApproveUserByIdAsync(int id)
        {
            var user = await _dbContext.Users.FindAsync(id);
            if (user == null)
            {
                return new BadRequestObjectResult($"User with ID {id} not found");
            }

            if (user.IsAdmin)
            {
                return new BadRequestObjectResult($"Not allowed to approve this user");
            }

            user.Status = "Approved";

            _dbContext.Entry(user).State= EntityState.Modified;

            await _dbContext.SaveChangesAsync();

            return new OkObjectResult( user);
        }


        public async Task<IActionResult> RejectUserByIdAsync(int id)
        {
            var user = await _dbContext.Users.FindAsync(id);
            if (user == null)
            {
                return new BadRequestObjectResult($"User with ID {id} not found");
            }

            if (user.IsAdmin)
            {
                return new BadRequestObjectResult($"Not allowed to reject this user");
            }


            user.Status = "Rejected";

            _dbContext.Entry(user).State = EntityState.Modified;

            await _dbContext.SaveChangesAsync();

            return new OkObjectResult( user);
        }


        public async Task<IActionResult> UpdateUserAsync(int id, UserDto user)
        {
            var userExists = await _dbContext.Users.FindAsync(id);
            if (userExists == null)
            {
                return new BadRequestObjectResult($"User with ID {id} not found");
            }

            if (user.FullName != null) // Update specific properties if received
            {
                userExists.FullName = user.FullName;
            }

            if (user.DateOfBirth != null)
            {
                userExists.DateOfBirth = user.DateOfBirth;
            }


            if (user.ProfilePicture != null)
            {
                userExists.ProfilePicture = user.ProfilePicture;
            }


            if (user.Gender != null)
            {
                userExists.Gender = user.Gender;
            }

            if (user.Phone != null)
            {
                userExists.Phone = user.Phone;
            }

            if (user.Address != null)
            {
                userExists.Address = user.Address;
            }


            if (user.AvailableTimeFrom != null)
            {
                userExists.AvailableTimeFrom = user.AvailableTimeFrom;
            }


            if (user.AvailableTimeNote != null)
            {
                userExists.AvailableTimeNote = user.AvailableTimeNote;
            }


            if (user.AvailableTimeTo != null)
            {
                userExists.AvailableTimeTo = user.AvailableTimeTo;
            }


            if (user.AvailableWeekDays != null)
            {
                userExists.AvailableWeekDays = user.AvailableWeekDays;
            }

            _dbContext.Users.Update(userExists); // Update method might be preferred here

            //_dbContext.Entry(user).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();

            return new OkObjectResult(userExists);
        }

        public async Task<IActionResult> DeleteUserAsync(int id)
        {
            var user = await _dbContext.Users.FindAsync(id);
            if (user == null)
            {
                return new BadRequestObjectResult($"User with ID {id} not found");
            }

            if (user.IsAdmin)
            {
                return new BadRequestObjectResult($"Not allowed to delete this user");
            }

            _dbContext.Users.Remove(user);
            await _dbContext.SaveChangesAsync();

            return new OkObjectResult("User removed correctly");
        }

        public async Task<IActionResult> GetUserByUsernameAsync(string username)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Username == username);
            if (user == null)
            {
                return new BadRequestObjectResult($"User with username '{username}' not found");
            }
            //return SanitizeUser(user);
            return new OkObjectResult( user);
        }


        public async Task<IActionResult> CreateUserAsync(User newUser)
        {
            // Check if username or email already exists
            bool userExists = await _dbContext.Users.AnyAsync(u => u.Username == newUser.Username || u.Email == newUser.Email);
            if (userExists)
            {
                return new BadRequestObjectResult("Username or email already exists");
            }

            if (newUser.IsAdmin)
            {
                return new BadRequestObjectResult($"Not allowed to create this kind of user");
            }

            newUser.PasswordHash = HashPassword(newUser.PasswordHash);
            newUser.CreatedAt = DateTime.UtcNow;

            _dbContext.Users.Add(newUser);
            await _dbContext.SaveChangesAsync();
            return new OkObjectResult(newUser);
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
