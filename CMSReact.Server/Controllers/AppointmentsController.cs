using CMSReact.Server.Context;
using CMSReact.Server.Models;
using CMSReact.Server.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CMSReact.Server.Controllers
{
    [ApiController]
    [Route("api/appointments")]
    public class AppointmentController : ControllerBase
    {
        private readonly AppointmentService _appointmentService;

        public AppointmentController(AppointmentService appointmentService)
        {
            _appointmentService = appointmentService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Appointment>>> GetAllAppointments()
        {
            var appointments = await _appointmentService.GetAllAppointmentsAsync();
            return Ok(appointments);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Appointment>> GetAppointmentById(int id)
        {
            var appointment = await _appointmentService.GetAppointmentByIdAsync(id);
            if (appointment == null)
            {
                return NotFound();
            }
            return Ok(appointment);
        }

        [HttpPost]
        public async Task<ActionResult<int>> CreateAppointment(Appointment appointment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var id = await _appointmentService.CreateAppointmentAsync(appointment);
            return Ok(id);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAppointment(int id, Appointment appointment)
        {
            if (id != appointment.Id)
            {
                return BadRequest("Invalid appointment ID");
            }

            await _appointmentService.UpdateAppointmentAsync(appointment);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAppointment(int id)
        {
            await _appointmentService.DeleteAppointmentAsync(id);
            return NoContent();
        }

        [HttpGet("user/{username}")]
        public async Task<ActionResult<IEnumerable<Appointment>>> GetAppointmentsByUsername(string username)
        {
            var appointments = await _appointmentService.GetAppointmentsByUsernameAsync(username);
            return Ok(appointments);
        }

        // Consider adding endpoint to retrieve appointments for a specific doctor (if applicable)
        //[HttpGet("doctor/{doctorId}")]
        //public async Task<ActionResult<IEnumerable<Appointment>>> GetAppointmentsByDoctorId(int doctorId)
        //{
        //var appointments = await _dbContext.Appointments  // Assuming direct access to DbContext in controller (not recommended)
        //    .Include(a => a.Patient)  // Eager loading of Patient navigation property
        //    .Include(a => a.Doctor)  // Eager loading of Doctor navigation property
        //    .Where(a => a.DoctorId == doctorId)
        //    .ToListAsync();

        //if (!appointments.Any())
        //{
        //    return NotFound("No appointments found for this doctor.");
        //}

        //return Ok(appointments);
        //}
    }
}
