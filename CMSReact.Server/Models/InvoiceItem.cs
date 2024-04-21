namespace CMSReact.Server.Models;

public class InvoiceItem
{
    public int Id { get; set; }
    public int InvoiceId { get; set; } // Foreign key for Invoice
    public string Description { get; set; } // Detailed description of the item
    public decimal UnitPrice { get; set; }
    public int Quantity { get; set; }
    public decimal TotalPrice { get; set; } // Calculated: UnitPrice * Quantity
    public Invoice Invoice { get; set; } // Navigation property
}