using CMSReact.Server.Context;
using CMSReact.Server.DTOs;
//using CMSReact.Server.Migrations;
using CMSReact.Server.Models;
using Microsoft.AspNetCore.Identity; // Assuming Identity for user management
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace CMSReact.Server.Services
{
    public class AuthService
    {
        //private readonly UserManager<User> _userManager;
        private readonly AppDbContext _dbContext;

        public AuthService( AppDbContext dbContext)
        {
            //_userManager = userManager;
            _dbContext = dbContext;
        }

        public async Task<IActionResult> RegisterUserAsync(RegisterDto userDto)
        {

            var doesUserExists = await _dbContext.Users.FirstOrDefaultAsync(u => (u.Email == userDto.Email || u.Username == userDto.Username));

            if (doesUserExists != null)
            {
                return new BadRequestObjectResult("User already exists.");
            }


            var user = new User
            {
                Username = userDto.Username,
                Email = userDto.Email,
                PasswordHash = userDto.Password,
                IsDoctor = userDto.IsDoctor,
                CreatedAt = DateTime.UtcNow
            };

            if(userDto.SpecialityId != null)
            {
                user.SpecialityId = (int)userDto.SpecialityId;
            }
            

            _dbContext.Users.Add(user);
            
            await _dbContext.SaveChangesAsync();

            return new OkObjectResult(user); 
        }

        public async Task<IActionResult> LoginAsync(string email, string password)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
            {
                return new BadRequestObjectResult("User not found.");
            }

            //var passwordValid = await _userManager.CheckPasswordAsync(user, password);

            //if (!passwordValid)
            //{
            //    return new BadRequestObjectResult("Incorrect Email or Password");
            //}

            return new OkObjectResult(user); 
        }
    }
}
