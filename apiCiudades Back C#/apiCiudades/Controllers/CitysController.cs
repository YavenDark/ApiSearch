using apiCiudades.Context;
using apiCiudades.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace apiCiudades.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CitysController : ControllerBase
    {
        private readonly AppDbContext context;

        public CitysController(AppDbContext context)
        {
            this.context = context;
        }


        // GET: api/<ValuesController>
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                return Ok(context.citys_bd.ToList()); //
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        // GET api/<ValuesController>/5
        [HttpGet("{id}", Name = "GetCity")]
        public ActionResult Get(int id)
        {
            try
            {
                var city = context.citys_bd.FirstOrDefault(g => g.id == id);
                return Ok(city);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        // POST api/<ValuesController>
        [HttpPost]
        public ActionResult Post([FromBody]Citys_Bd city)
        {
            try
            {
                context.citys_bd.Add(city);
                context.SaveChanges();
                return CreatedAtRoute("GetCity", new {id = city.id }, city);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody]Citys_Bd city)
        {
            try
            {
                if(city.id == id)
                {
                    context.Entry(city).State = EntityState.Modified;
                    context.SaveChanges();
                    return CreatedAtRoute("GetCity", new { id = city.id }, city);

                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                var city = context.citys_bd.FirstOrDefault(g => g.id == id);
                if (city != null)
                {
                    context.citys_bd.Remove(city);
                    context.SaveChanges();
                    return Ok(id);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
    }
}
