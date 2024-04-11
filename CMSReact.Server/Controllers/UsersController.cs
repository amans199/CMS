using CMSReact.Server.Models;
using CMSReact.Server.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CMSReact.Server.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UsersController : ControllerBase
    {
        private readonly UsersService _usersService;

        public UsersController(UsersService usersService)
        {
            _usersService = usersService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            try
            {
                var users = await _usersService.GetUsersAsync();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("approve/{id}")]
        public async Task<IActionResult> ApproveUserById(int id)
        {
            var user = await _usersService.ApproveUserByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return new OkObjectResult(user);
        }

        [HttpPost("reject/{id}")]
        public async Task<IActionResult> RejectUserById(int id)
        {
            var user = await _usersService.RejectUserByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return new OkObjectResult(user);
        }

        [HttpPost("delete/{id}")]
        public async Task<ActionResult> DeleteUserById(int id)
        {
            if (id == null)
            {
                return NotFound();
            }
            await _usersService.DeleteUserAsync(id);
            return Ok("User Deleted Successfully");
        }


        [HttpPost("add")]
        public async Task<IActionResult> CreateUser(User user)
        {
            if (user == null)
            {
                return NotFound();
            }

            var response = await _usersService.CreateUserAsync(user);

            return new OkObjectResult("User Created Successfully");
        }


        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateUserById(User user)
        {
            if (user == null)
            {
                return NotFound();
            }

            var response = await _usersService.UpdateUserAsync(user);

            return response;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUserById(int id)
        {
            var user = await _usersService.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }
    }
}
