using CMSReact.Server.Context;
using CMSReact.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMSReact.Server.Services;


public class InvoiceService
{
    private readonly AppDbContext _dbContext;

    public InvoiceService(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<Invoice>> GetInvoicesAsync(int? appointmentId = null)
    {
        var query = _dbContext.Invoices.Include(i => i.Appointment) // Eager loading for Appointment
          .AsQueryable();

        if (appointmentId.HasValue)
        {
            query = query.Where(i => i.AppointmentId == appointmentId);
        }

        return await query.ToListAsync();
    }

    public async Task<Invoice> GetInvoiceByIdAsync(int id)
    {
        var invoice = await _dbContext.Invoices
          .Include(i => i.Appointment) // Eager loading for Appointment
          .Include(i => i.InvoiceItems) // Eager loading for InvoiceItems
          .FirstOrDefaultAsync(i => i.Id == id);

        if (invoice == null)
        {
            throw new BadHttpRequestException($"Invoice with ID {id} not found");
        }
        return invoice;
    }

    public async Task<IActionResult> CreateInvoiceAsync(Invoice newInvoice)
    {
        if (newInvoice.AppointmentId == null)
        {
            return new BadRequestObjectResult("Appointment ID is required");
        }

        // Validate other invoice properties (e.g., service description, total amount)

        _dbContext.Invoices.Add(newInvoice);
        await _dbContext.SaveChangesAsync();

        return new OkObjectResult(newInvoice);
    }

    public async Task<IActionResult> UpdateInvoiceAsync(int id, Invoice updatedInvoice)
    {
        var invoice = await _dbContext.Invoices.FindAsync(id);
        if (invoice == null)
        {
            return new NotFoundResult();
        }

        // Validate updated invoice properties

        invoice.InvoiceDate = updatedInvoice.InvoiceDate;
        invoice.ServiceDescription = updatedInvoice.ServiceDescription;
        invoice.TotalAmount = updatedInvoice.TotalAmount;

        // Update invoice items if needed (logic not shown here)

        _dbContext.Invoices.Update(invoice);
        await _dbContext.SaveChangesAsync();

        return new OkObjectResult(invoice);
    }

    public async Task<IActionResult> DeleteInvoiceAsync(int id)
    {
        var invoice = await _dbContext.Invoices
          .Include(i => i.InvoiceItems) // Eager loading for InvoiceItems
          .FirstOrDefaultAsync(i => i.Id == id);

        if (invoice == null)
        {
            return new NotFoundResult();
        }

        // Handle deletion of associated invoice items (logic not shown here)

        _dbContext.Invoices.Remove(invoice);
        await _dbContext.SaveChangesAsync();

        return new OkObjectResult("Invoice removed successfully");
    }

    public async Task<IActionResult> AddInvoiceItemAsync(int invoiceId, InvoiceItem newItem)
    {
        if (newItem == null)
        {
            return new BadRequestObjectResult("Invalid invoice item data");
        }

        newItem.InvoiceId = invoiceId;

        // Validate invoice item properties (e.g., description, unit price, quantity)

        _dbContext.InvoiceItems.Add(newItem);
        await _dbContext.SaveChangesAsync();

        return new OkObjectResult(newItem);
    }

    public async Task<IActionResult> UpdateInvoiceItemAsync(int invoiceId, int itemId, InvoiceItem updatedItem)
    {
        var invoiceItem = await _dbContext.InvoiceItems.FindAsync(itemId);
        if (invoiceItem == null)
        {
            return new NotFoundResult();
        }

        if (invoiceItem.InvoiceId != invoiceId)
        {
            return new BadRequestObjectResult("Invoice item does not belong to the specified invoice");
        }

        // Validate updated invoice item properties

        invoiceItem.Description = updatedItem.Description;
        invoiceItem.UnitPrice = updatedItem.UnitPrice;
        invoiceItem.Quantity = updatedItem.Quantity;
        invoiceItem.TotalPrice = invoiceItem.UnitPrice * invoiceItem.Quantity; // Recalculate total price

        _dbContext.InvoiceItems.Update(invoiceItem);
        await _dbContext.SaveChangesAsync();

        return new OkObjectResult(invoiceItem);
    }

    public async Task<IActionResult> DeleteInvoiceItemAsync(int invoiceId, int itemId)
    {
        var invoiceItem = await _dbContext.InvoiceItems.FindAsync(itemId);

        if (invoiceItem == null)
        {
            return new NotFoundResult();
        }

        if (invoiceItem.InvoiceId != invoiceId)
        {
            return new BadRequestObjectResult("Invoice item does not belong to the specified invoice");
        }

        _dbContext.InvoiceItems.Remove(invoiceItem);
        await _dbContext.SaveChangesAsync();

        return new OkObjectResult("Invoice item removed successfully");
    }
    public async Task<IEnumerable<InvoiceItem>> GetAllInvoiceItemsAsync()
    {
        return await _dbContext.InvoiceItems.ToListAsync();
    }
}