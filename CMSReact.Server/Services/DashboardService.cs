using CMSReact.Server.Context;
using CMSReact.Server.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Globalization;
using System.Net.NetworkInformation;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace CMSReact.Server.Services
{
    public class DashboardService
    {
        private readonly AppDbContext _dbContext;

        public DashboardService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IActionResult> GetDashboardDataAsync()
        {
            var allUsers = _dbContext.Users.AsQueryable();

            var allDoctors = allUsers.Where(u => u.IsDoctor);
            var allPatients = allUsers.Where(u => !u.IsDoctor);
            var allApproved = allUsers.Where(u => u.Status.ToLower() == "approved");
            var allRejected = allUsers.Where(u => u.Status.ToLower() == "rejected");
            var allPending= allUsers.Where(u => u.Status.ToLower() == "pending");

            var allSpecialities= _dbContext.Specialities.AsQueryable();

            var allAppointments= _dbContext.Appointments.AsQueryable();

            var totalAmountInInvoices = await _dbContext.Invoices.SumAsync(i => (double)i.TotalAmount);

            // Get invoice data for charts
            var invoiceData = await _dbContext.Invoices.ToListAsync();
            var invoiceTotalPerMonth = invoiceData
                .GroupBy(i => new { i.InvoiceDate.Year, i.InvoiceDate.Month })
                .Select(g => new
                {
                    YearMonth = g.Key,
                    TotalAmount = g.Sum(i => i.TotalAmount),
                    InvoiceCount = g.Count()
                })
                .OrderBy(x => x.YearMonth.Year)
                .ThenBy(x => x.YearMonth.Month)
                .ToList();

            var monthLabels = DateTimeFormatInfo.CurrentInfo.AbbreviatedMonthNames.Take(12).ToArray();
            var totalAmountData = new decimal[12];
            var invoiceCountData = new int[12];

            foreach (var data in invoiceTotalPerMonth)
            {
                totalAmountData[data.YearMonth.Month - 1] = data.TotalAmount;
                invoiceCountData[data.YearMonth.Month - 1] = data.InvoiceCount;
            }


            // Create an object to hold the dashboard data
            var dashboardData = new
            {
                UserCounts = new Dictionary<string, int>
                {
                    { "TotalUsers", allUsers.ToList().Count },
                    { "Doctors", allDoctors.Count() },
                    { "Patients", allPatients.Count() },
                    { "Approved", allApproved.Count() },
                    { "Rejected", allRejected.Count() },
                    { "Pending", allPending.Count() }
                },
                Specialities = allSpecialities.Select(s => new { s.Id, s.Name }).ToList(),
                TotalAmountInInvoices = totalAmountInInvoices,
                Appointments= allAppointments,
                InvoiceCharts = new
                {
                    TotalAmountChart = new
                    {
                        chart = new
                        {
                            labels = monthLabels,
                            datasets = new { label = "Sales", data = totalAmountData }
                        },
                        items = new List<object> // Add other relevant items here if needed
                        {
                            new
                            {
                                icon = new { color = "primary", component = "library_books" },
                                label = "users",
                                progress = new { content = "36K", percentage = 60 }
                            },
                            new
                            {
                                icon = new { color = "info", component = "touch_app" },
                                label = "clicks",
                                progress = new { content = "2M", percentage = 90 }
                            },
                            new
                            {
                                icon = new { color = "warning", component = "payment" },
                                label = "sales",
                                progress = new { content = "$435", percentage = 30 }
                            },
                            new
                            {
                                icon = new { color = "error", component = "extension" },
                                label = "items",
                                progress = new { content = "43", percentage = 50 }
                            }
                        }
                    },
                    InvoiceCountChart = new
                    {
                        labels = monthLabels,
                        datasets = new[]
                        {
                            new
                            {
                                label = "Invoices",
                                color = "info",
                                data = invoiceCountData
                            }
                        }
                    }
                }
            };

            return new OkObjectResult(dashboardData);
        }



    }
}
