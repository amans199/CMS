using CMSReact.Server.Context;
using CMSReact.Server.DTOs;
using CMSReact.Server.Migrations;
using CMSReact.Server.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Numerics;
using System.Threading;
using System.Threading.Tasks;

namespace CMSReact.Server.Services
{
    public class AppointmentService
    {
        private readonly AppDbContext _dbContext;
        private readonly UsersService _usersService;

        public AppointmentService(AppDbContext dbContext, UsersService usersService)
        {
            _dbContext = dbContext;
            _usersService = usersService;
        }

        public async Task<IEnumerable<Appointment>> GetAllAppointmentsAsync(int userId)
        {

            var user = await _dbContext.Users.FindAsync(userId);
            if (user  == null)
            {
                throw new KeyNotFoundException($"Not found");
            }


            //      var query = _dbContext.Appointments.Where(a => a.AppointmentUsers.Any(au =>
            //(user.IsAdmin || !au.IsDoctor) && au.UserId == userId));


            //      var appointments = await query.ToListAsync(); 

            //      if (appointments.Any() && (user.IsAdmin || !user.IsDoctor)) 
            //      {
            //          appointments = appointments.Select(async a =>
            //          {
            //              a.AppointmentUsers = await _dbContext.AppointmentUser
            //                .Where(au => au.AppointmentId == a.Id);
            //              a.AppointmentUsers.ForEach(au => au.User = await _dbContext.Users.FindAsync(au.UserId));
            //              return a;
            //          }).Select(t => t.Result).ToList();
            //      }

            //      return appointments;

            var query = _dbContext.Appointments.Include(a => a.AppointmentUsers).ThenInclude(au => au.User).Select(a => new Appointment
            {
                Id = a.Id,
                Date = a.Date,
                Time = a.Time,
                CreatedAt = a.CreatedAt,
                Reason = a.Reason,
                Comment = a.Comment,
                Status = a.Status,
                RejectionReason = a.RejectionReason,
                OriginalAppointmentId = a.OriginalAppointmentId,
                AppointmentUsers = a.AppointmentUsers.Select(au => new AppointmentUser
                {
                    IsDoctor = au.IsDoctor,
                    UserId = au.UserId,
                    User = au.User,
                }).ToList()
            });

            if (user.IsAdmin) // Check for admin
            {
                return await query.ToListAsync(); // Return all appointments for admin
            }
            else if (user.IsDoctor) // Check for doctor
            {
                return await query
                  .Where(a => a.AppointmentUsers.Any(au => au.IsDoctor && au.UserId == userId)) // Filter by doctor appointments
                  .ToListAsync();
            }
            else // Patient or other role (assuming no IsPatient property)
            {
                return await query
                  .Where(a => a.AppointmentUsers.Any(au => !au.IsDoctor && au.UserId == userId)) // Filter by patient appointments
                  .ToListAsync();
            }

            try
            {
                var appointments = await _dbContext.Appointments
                    .Include(a => a.AppointmentUsers)
                    .ThenInclude(au => au.User)
                    .Select(a => new Appointment 
                    {
                        Id = a.Id,
                        Date = a.Date,
                        Time = a.Time,
                        CreatedAt = a.CreatedAt,
                        Reason = a.Reason,
                        Comment = a.Comment,
                        Status = a.Status,
                        RejectionReason = a.RejectionReason,
                        OriginalAppointmentId = a.OriginalAppointmentId,
                        AppointmentUsers = a.AppointmentUsers.Select(au => new AppointmentUser 
                        {
                            IsDoctor = au.IsDoctor,
                            UserId = au.UserId, 
                            User = au.User,
                        }).ToList()
                    })
                    .ToListAsync();

                return appointments;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<Appointment> GetAppointmentByIdAsync(int id)
        {

            var appointment =  await _dbContext.Appointments.FirstOrDefaultAsync(a => a.Id == id);

            return appointment;
        }
        public async Task<IActionResult> CreateAppointmentAsync(AppointmentDto appointmentDto)
        {
            //try
            //{
                var doctor = await _usersService.GetUserByIdAsync(appointmentDto.DoctorId);
                var patient = await _usersService.GetUserByIdAsync(appointmentDto.PatientId);

                var appointment = new Appointment
                {
                    Date = appointmentDto.Date,
                    Time = appointmentDto.Time,
                    Reason = appointmentDto.Reason,
                    Status = "Pending",
                    //CreatedBy = appointmentDto.CreatedBy,
                    CreatedAt = DateTime.Now,
                    AppointmentUsers = new List<AppointmentUser>()
                };

                appointment.AppointmentUsers.Add(new AppointmentUser
                {
                    UserId = doctor.Id,
                    IsDoctor = true
                });

                appointment.AppointmentUsers.Add(new AppointmentUser
                {
                    UserId = patient.Id,
                    IsDoctor = false
                });

                _dbContext.Appointments.Add(appointment);
                await _dbContext.SaveChangesAsync();

                return new OkObjectResult(appointment);
            //}
            //catch (Exception ex)
            //{
            //    return new BadRequestObjectResult($"Failed to create appointment: {ex.Message}");
            //}
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

        //public async Task<IActionResult> GetAppointmentsByUsernameAsync(string username)
        //{
        //    var patient = await _dbContext.Users.FirstOrDefaultAsync(p => p.Username == username);

        //    if (patient == null)
        //    {
        //        return new BadRequestObjectResult("Patient with username not found");
        //    }

        //    var appointments = await _dbContext.Users
        //        .Where(p => p.Username == username)
        //        .Include(p => p.Appointments)
        //        .SelectMany(p => p.Appointments)
        //        .ToListAsync();

        //    return new OkObjectResult(appointments);
        //}

        public async Task<IActionResult> ApproveAppointmentAsync(int appointmentId)
        {
            var appointment = await _dbContext.Appointments.FindAsync(appointmentId);
            if (appointment == null)
            {
                throw new KeyNotFoundException($"Appointment with ID {appointmentId} not found.");
            }
            appointment.Status = "Approved";

            _dbContext.Entry(appointment).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();

            return new OkObjectResult(appointment);
        }
        public async Task<IActionResult> RejectAppointmentAsync(int appointmentId,string? rejectionReason)
        {
            var appointment = await _dbContext.Appointments.FindAsync(appointmentId);
            if (appointment == null)
            {
                throw new KeyNotFoundException($"Appointment with ID {appointmentId} not found.");
            }
            
            appointment.Status = "Rejected";
            
            if(rejectionReason!= null)
            {
                appointment.RejectionReason = rejectionReason;
            }

            _dbContext.Entry(appointment).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();

            return new OkObjectResult(appointment);
        }

        public async Task<IActionResult> MarkAppointmentFinishedAsync(int appointmentId)
        {
            var appointment = await _dbContext.Appointments.FindAsync(appointmentId);
            if (appointment == null)
            {
                throw new KeyNotFoundException($"Appointment with ID '{appointmentId}' not found.");
            }

            appointment.Status = "Completed";

            _dbContext.Entry(appointment).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();

            return new OkObjectResult(appointment);
        }

        //public async Task<IActionResult> CreateFollowUpAppointmentAsync(Appointment appointment)
        //{
        //    var originalAppointmentId = appointment.Id; // Modify based on your request object structure
        //    var originalAppointment = await _dbContext.Appointments.FindAsync(originalAppointmentId);

        //    if (originalAppointment == null)
        //    {
        //        throw new KeyNotFoundException($"Original appointment with ID '{originalAppointmentId}' not found.");
        //    }

        //    // Create a new appointment with follow-up details (consider copying relevant data)
        //    var followUpAppointment = new Appointment
        //    {
        //        Date = appointment.Date, 
        //        Time = appointment.Time, 
        //        Reason = appointment.Reason + " (Follow-Up)", 
        //        UserId = originalAppointment.UserId, 
        //        DoctorId = originalAppointment.DoctorId, 
        //        Status = "Pending", // Set initial status for follow-up
        //        OriginalAppointmentId = originalAppointmentId
        //    };


        //    _dbContext.Appointments.Add(followUpAppointment);
        //    await _dbContext.SaveChangesAsync();

        //    return new OkObjectResult(followUpAppointment);
        //}


    }
}


