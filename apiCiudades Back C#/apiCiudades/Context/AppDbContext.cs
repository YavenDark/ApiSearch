using apiCiudades.Models;
using Microsoft.EntityFrameworkCore;

namespace apiCiudades.Context
{
    public class AppDbContext :DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
        public DbSet<Citys_Bd> citys_bd { get; set; }
    }
}
