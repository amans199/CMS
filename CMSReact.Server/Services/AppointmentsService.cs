using CMSReact.Server.Context;
using CMSReact.Server.Migrations;
using CMSReact.Server.Models;
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
            return await _dbContext.Appointments.FindAsync(id);
        }

        public async Task<int> CreateAppointmentAsync(Appointment appointment)
        {
            appointment.CreatedAt = DateTime.UtcNow;
            _dbContext.Appointments.Add(appointment);
            await _dbContext.SaveChangesAsync();
            return appointment.Id;
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
    }
}
