
using CMSReact.Server.DTOs; // Assuming DTOs exist (optional)
using CMSReact.Server.Models;
using CMSReact.Server.Services;
using CMSReact.Server.Models;
using CMSReact.Server.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace CMSReact.Server.Controllers;

[ApiController]
[Route("api/invoices")]
public class InvoicesController : ControllerBase
{
    private readonly InvoiceService _invoiceService;

    public InvoicesController(InvoiceService invoiceService)
    {
        _invoiceService = invoiceService;
    }

    [HttpGet("appointment/{appointmentId}")]
    public async Task<ActionResult<IEnumerable<Invoice>>> GetInvoicesByAppointmentId(int appointmentId)
    {
        try
        {
            var invoices = await _invoiceService.GetInvoicesAsync(appointmentId);
            return Ok(invoices);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Invoice>> GetInvoiceById(int id)
    {
        try
        {
            var invoice = await _invoiceService.GetInvoiceByIdAsync(id);
            return Ok(invoice);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpPost("appointment/{appointmentId}")]
    public async Task<IActionResult> CreateInvoice(int appointmentId, [FromBody] Invoice newInvoice) // Use FromBody for request body data
    {
        if (newInvoice == null)
        {
            return BadRequest("Invalid invoice data");
        }

        newInvoice.AppointmentId = appointmentId; // Ensure appointment ID is set

        var response = await _invoiceService.CreateInvoiceAsync(newInvoice);
        return response;
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateInvoice(int id, [FromBody] Invoice updatedInvoice) // Use FromBody for request body data
    {
        if (updatedInvoice == null)
        {
            return BadRequest("Invalid invoice data");
        }

        updatedInvoice.Id = id; // Set ID for update

        var response = await _invoiceService.UpdateInvoiceAsync(id, updatedInvoice);
        return response;
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteInvoice(int id)
    {
        var response = await _invoiceService.DeleteInvoiceAsync(id);
        return response;
    }

    //[HttpGet("{invoiceId}/items")]
    //public async Task<ActionResult<IEnumerable<InvoiceItem>>> GetInvoiceItemsByInvoiceId(int appointmentId, int invoiceId)
    //{
    //    try
    //    {
    //        var invoiceItems = await _invoiceService.GetAllInvoiceItemsAsync()
    //            .Where(i => i.InvoiceId == invoiceId)
    //            .ToListAsync();
    //        return Ok(invoiceItems);
    //    }
    //    catch (Exception ex)
    //    {
    //        return StatusCode(500, $"Internal server error: {ex.Message}");
    //    }
    //}

    [HttpPost("items")]
    public async Task<IActionResult> AddInvoiceItem(int invoiceId, [FromBody] InvoiceItem newItem) // Use FromBody for request body data
    {
        if (newItem == null)
        {
            return BadRequest("Invalid invoice item data");
        }

        var response = await _invoiceService.AddInvoiceItemAsync(invoiceId, newItem);
        return response;
    }

    [HttpPut("items/{itemId}")]
    public async Task<IActionResult> UpdateInvoiceItem(int invoiceId, int itemId, [FromBody] InvoiceItem updatedItem) // Use FromBody for request body data
    {
        if (updatedItem == null)
        {
            return BadRequest("Invalid invoice item data");
        }

        updatedItem.Id = itemId; // Set ID for update

        var response = await _invoiceService.UpdateInvoiceItemAsync(invoiceId, itemId, updatedItem);
        return response;
    }

    [HttpDelete("items/{itemId}")]
    public async Task<IActionResult> DeleteInvoiceItem(int invoiceId, int itemId)
    {
        var response = await _invoiceService.DeleteInvoiceItemAsync(invoiceId, itemId);
        return response;
    }


    [HttpGet("items")]
    public async Task<ActionResult<IEnumerable<Invoice>>> GetInvoiceItems()
    {
        try
        {
            var invoiceItems = await _invoiceService.GetAllInvoiceItemsAsync();
            return Ok(invoiceItems);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}
