using CMSReact.Server.Context;
using CMSReact.Server.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CMSReact.Server.Services
{
    public class AppointmentService
    {
        private readonly AppDbContext _dbContext;

        public AppointmentService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Appointment>> GetAllAppointmentsAsync()
        {
            return await _dbContext.Appointments.ToListAsync();
        }

        public async Task<Appointment> GetAppointmentByIdAsync(int id)
        {
            return await _dbContext.Appointments.FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task<IActionResult> CreateAppointmentAsync(Appointment appointment)
        {
            try
            {
                var doctor = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == appointment.DoctorId);
                var patient = await _dbContext.Users.FirstOrDefaultAsync(d => d.Id == appointment.UserId);

                if (patient == null)
                {
                    throw new KeyNotFoundException($"User with ID '{appointment.UserId}' not found.");
                }

                if (doctor == null)
                {
                    throw new KeyNotFoundException($"Doctor with ID '{appointment.DoctorId}' not found.");
                }

                appointment.UserId = patient.Id;
                appointment.DoctorId = doctor.Id;

                _dbContext.Appointments.Add(appointment);
                await _dbContext.SaveChangesAsync();

                return new OkObjectResult(appointment);
            }
            catch (KeyNotFoundException ex)
            {
                throw new Exception($"Failed to create appointment: {ex.Message}", ex);
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to create appointment.", ex);
            }
        }

        public async Task UpdateAppointmentAsync(Appointment appointment)
        {
            _dbContext.Entry(appointment).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteAppointmentAsync(int id)
        {
            var appointment = await _dbContext.Appointments.FindAsync(id);
            if (appointment != null)
            {
                _dbContext.Appointments.Remove(appointment);
                await _dbContext.SaveChangesAsync();
            }
        }

        public async Task<IActionResult> GetAppointmentsByUsernameAsync(string username)
        {
            var patient = await _dbContext.Users.FirstOrDefaultAsync(p => p.Username == username);

            if (patient == null)
            {
                return new BadRequestObjectResult("Patient with username not found");
            }

            var appointments = await _dbContext.Users
                .Where(p => p.Username == username)
                .Include(p => p.Appointments)
                .SelectMany(p => p.Appointments)
                .ToListAsync();

            return new OkObjectResult(appointments);
        }
    }
}
