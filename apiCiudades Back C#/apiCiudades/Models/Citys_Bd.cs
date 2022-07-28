using System.ComponentModel.DataAnnotations;

namespace apiCiudades.Models
{
    public class Citys_Bd
    {
        [Key]
        public int id { get; set; }
        public string city { get; set; }
        public string info { get; set; }


    }
}
