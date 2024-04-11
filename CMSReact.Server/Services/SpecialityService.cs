// SpecialtyService.cs
using CMSReact.Server.Context;
using CMSReact.Server.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CMSReact.Server.Services
{
    public class SpecialityService
    {
        private readonly AppDbContext _dbContext;

        public SpecialityService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Speciality>> GetAllSpecialitiesAsync()
        {
            return await _dbContext.Specialities.ToListAsync();
        }

        public async Task<Speciality> GetSpecialityByIdAsync(int id)
        {
            return await _dbContext.Specialities.FindAsync(id);
        }

        public async Task<int> CreateSpecialityAsync(Speciality speciality)
        {
            _dbContext.Specialities.Add(speciality);
            await _dbContext.SaveChangesAsync();
            return speciality.Id;
        }

        public async Task UpdateSpecialityAsync(Speciality speciality)
        {
            _dbContext.Entry(speciality).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteSpecialityAsync(int id)
        {
            var specialty = await _dbContext.Specialities.FindAsync(id);
            if (specialty != null)
            {
                _dbContext.Specialities.Remove(specialty);
                await _dbContext.SaveChangesAsync();
            }
        }
    }
}
