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
            return users.Select(SanitizeUser);
        }

        private User SanitizeUser(User user)
        {
            return new User
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
                CreatedAt = user.CreatedAt,
                Type = user.Type,
            };
        }
    }
}
