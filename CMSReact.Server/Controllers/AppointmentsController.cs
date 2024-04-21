using CMSReact.Server.Context;
using CMSReact.Server.DTOs;
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

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<Appointment>>> GetAllAppointments(int userId)
        {
            var appointments = await _appointmentService.GetAllAppointmentsAsync(userId);
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
        public async Task<ActionResult<int>> CreateAppointment(AppointmentDto appointment)
        {
            var createdAppointment = await _appointmentService.CreateAppointmentAsync(appointment);
            return Ok(createdAppointment); // Return the created appointment ID
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

        [HttpPost("delete/{id}")]
        public async Task<IActionResult> DeleteAppointment(int id)
        {
            await _appointmentService.DeleteAppointmentAsync(id);
            return NoContent();
        }

        //[HttpGet("user/{username}")]
        //public async Task<ActionResult<IEnumerable<Appointment>>> GetAppointmentsByUsername(string username)
        //{
        //    var appointments = await _appointmentService.GetAppointmentsByUsernameAsync(username);
        //    return Ok(appointments);
        //}

        [HttpPost("follow-up")]
        public async Task<ActionResult<Appointment>> CreateFollowUpAppointment(AppointmentDto appointmentDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdAppointment = await _appointmentService.CreateFollowUpAppointmentAsync(appointmentDto);
            return Ok(createdAppointment);
        }

        [HttpPost("approve/{id}")]
        public async Task<IActionResult> ApproveAppointment(int id)
        {
            var response = await _appointmentService.ApproveAppointmentAsync(id);
            return Ok(response);
        }

        [HttpPost("reject/{id}")]
        public async Task<IActionResult> RejectAppointment(int id,  string rejectionReason)
        {
            await _appointmentService.RejectAppointmentAsync(id, rejectionReason);
            return Ok("Appointment has been rejected");
        }

        // Consider adding endpoint to retrieve appointments for a specific doctor (if applicable)
        // Implement authorization checks in controllers to restrict access based on user roles
    }
}
