using CMSReact.Server.Context;
using CMSReact.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMSReact.Server.Services;

public class PrescriptionService
{
    private readonly AppDbContext _dbContext;

    public PrescriptionService(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<Prescription>> GetPrescriptionsAsync(int? appointmentId = null)
    {
        var query = _dbContext.Prescriptions.AsQueryable();

        if (appointmentId.HasValue)
        {
            query = query.Where(p => p.AppointmentId == appointmentId);
        }

        return await query.ToListAsync();
    }

    public async Task<Prescription> GetPrescriptionByIdAsync(int id)
    {
        var prescription = await _dbContext.Prescriptions.FindAsync(id);
        if (prescription == null)
        {
            throw new BadHttpRequestException($"Prescription with ID {id} not found");
        }
        return prescription;
    }

    public async Task<IActionResult> CreatePrescriptionAsync(Prescription newPrescription)
    {
        if (newPrescription.AppointmentId == null)
        {
            return new BadRequestObjectResult("Appointment ID is required");
        }

        _dbContext.Prescriptions.Add(newPrescription);
        await _dbContext.SaveChangesAsync();

        return new OkObjectResult(newPrescription);
    }

    public async Task<IActionResult> UpdatePrescriptionAsync(int id, Prescription updatedPrescription)
    {
        var prescription = await _dbContext.Prescriptions.FindAsync(id);
        if (prescription == null)
        {
            return new BadRequestObjectResult($"Prescription with ID {id} not found");
        }

        prescription.Medication = updatedPrescription.Medication;
        prescription.Dosage = updatedPrescription.Dosage;
        prescription.Instructions = updatedPrescription.Instructions;

        _dbContext.Prescriptions.Update(prescription);
        await _dbContext.SaveChangesAsync();

        return new OkObjectResult(prescription);
    }

    public async Task<IActionResult> DeletePrescriptionAsync(int id)
    {
        var prescription = await _dbContext.Prescriptions.FindAsync(id);
        if (prescription == null)
        {
            return new BadRequestObjectResult($"Prescription with ID {id} not found");
        }

        _dbContext.Prescriptions.Remove(prescription);
        await _dbContext.SaveChangesAsync();

        return new OkObjectResult("Prescription removed successfully");
    }
}
