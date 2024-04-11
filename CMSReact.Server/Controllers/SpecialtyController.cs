using CMSReact.Server.Models;
using CMSReact.Server.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CMSReact.Server.Controllers
{
    [ApiController]
    [Route("api/specialties")]
    public class SpecialtyController : ControllerBase
    {
        private readonly SpecialityService _specialityService;

        public SpecialtyController(SpecialityService specialtyService)
        {
            _specialityService = specialtyService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Speciality>>> GetAllSpecialties()
        {
            var specialties = await _specialityService.GetAllSpecialitiesAsync();
            return Ok(specialties);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Speciality>> GetSpecialityById(int id)
        {
            var specialty = await _specialityService.GetSpecialityByIdAsync(id);
            if (specialty == null)
            {
                return NotFound();
            }
            return Ok(specialty);
        }

        [HttpPost]
        public async Task<ActionResult<int>> CreateSpeciality(Speciality speciality)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var id = await _specialityService.CreateSpecialityAsync(speciality);
            return Ok(id);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSpeciality(int id, Speciality speciality)
        {
            if (id != speciality.Id)
            {
                return BadRequest("Invalid specialty ID");
            }

            await _specialityService.UpdateSpecialityAsync(speciality);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSpeciality(int id)
        {
            await _specialityService.DeleteSpecialityAsync(id);
            return NoContent();
        }
    }
}
