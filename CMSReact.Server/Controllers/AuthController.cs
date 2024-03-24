using CMSReact.Server.DTOs;
using CMSReact.Server.Models;
using CMSReact.Server.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace CMSReact.Server.Controllers;

    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto model)
        {
            var user = new User { Username = model.Username, Email = model.Email, PasswordHash = model.Password };
            var success = await _authService.RegisterUserAsync(user);
            if (!success)
                return BadRequest("Username or email already exists.");

            return Ok("User registered successfully.");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto model)
        {
            var user = await _authService.LoginAsync(model.Email, model.Password);
            if (user == null)
                return Unauthorized("Invalid username or password.");

            // Implement JWT token generation and return token to client
            return Ok("Login successful.");
        }
    }
