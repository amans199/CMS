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
        
        var registrationResult = await _authService.RegisterUserAsync(user);

        if (registrationResult is BadRequestObjectResult)
        {
            return registrationResult; // Return BadRequestObjectResult with error message
        }
        else if (registrationResult is OkObjectResult)
        {
            return registrationResult; // Return OkObjectResult with user object
        }
        else
        {
            return StatusCode(500, "Internal Server Error"); // Handle unexpected result
        }
    }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto model)
        {
            var loginResult = await _authService.LoginAsync(model.Email, model.Password);


        if (loginResult is BadRequestObjectResult)
        {
            return loginResult; // Return BadRequestObjectResult with error message
        }
        else if (loginResult is OkObjectResult)
        {
            return loginResult; // Return OkObjectResult with user object
        }
        else
        {
            return StatusCode(500, "Internal Server Error"); // Handle unexpected result
        }
    }
    }
