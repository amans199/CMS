using CMSReact.Server.Models;
using CMSReact.Server.Services;
using Microsoft.AspNetCore.Mvc;
using CMSReact.Server.DTOs; 
using CMSReact.Server.Models;
using CMSReact.Server.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace CMSReact.Server.Controllers;

[ApiController]
[Route("api/prescriptions/{appointmentId}")]
public class PrescriptionsController : ControllerBase
{
    private readonly PrescriptionService _prescriptionService;

    public PrescriptionsController(PrescriptionService prescriptionService)
    {
        _prescriptionService = prescriptionService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Prescription>>> GetPrescriptionsByAppointmentId(int appointmentId)
    {
        try
        {
            var prescriptions = await _prescriptionService.GetPrescriptionsAsync(appointmentId);
            return Ok(prescriptions);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Prescription>> GetPrescriptionById(int appointmentId, int id)
    {
        try
        {
            var prescription = await _prescriptionService.GetPrescriptionByIdAsync(id);
            return Ok(prescription);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpPost]
    public async Task<IActionResult> CreatePrescription(int appointmentId, [FromBody] Prescription newPrescription) // Use FromBody for request body data
    {
        if (newPrescription == null)
        {
            return BadRequest("Invalid prescription data");
        }

        newPrescription.AppointmentId = appointmentId; // Ensure appointment ID is set

        var response = await _prescriptionService.CreatePrescriptionAsync(newPrescription);
        return response;
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdatePrescription(int appointmentId, int id, [FromBody] Prescription updatedPrescription) // Use FromBody for request body data
    {
        if (updatedPrescription == null)
        {
            return BadRequest("Invalid prescription data");
        }

        updatedPrescription.Id = id; // Set ID for update

        var response = await _prescriptionService.UpdatePrescriptionAsync(id, updatedPrescription);
        return response;
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePrescription(int appointmentId, int id)
    {
        var response = await _prescriptionService.DeletePrescriptionAsync(id);
        return response;
    }
}

