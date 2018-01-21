using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace AngularTourOfHeroes.Controllers
{
    public class ValuesController : ApiController
    {
        private ModelHeroes db = new ModelHeroes();

        // GET: api/HeroEntities
        public List<HeroEntity> Get()
        {
            return db.HeroEntities.Select(d => d).ToList();
        }

        // GET: api/HeroEntities/5
        [ResponseType(typeof(HeroEntity))]
        public IHttpActionResult Get(int id)
        {
            HeroEntity heroEntity = db.HeroEntities.Find(id);
            if (heroEntity == null)
            {
                return NotFound();
            }

            return Ok(heroEntity);
        }

        // PUT: api/HeroEntities/5
        [ResponseType(typeof(void)), HttpPut]
        public IHttpActionResult Put(int id, HeroEntity heroEntity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != heroEntity.Id)
            {
                return BadRequest();
            }

            db.Entry(heroEntity).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HeroEntityExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/HeroEntities
        [ResponseType(typeof(HeroEntity))]
        public IHttpActionResult Post(HeroEntity heroEntity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.HeroEntities.Add(heroEntity);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = heroEntity.Id }, heroEntity);
        }

        // DELETE: api/HeroEntities/5
        [ResponseType(typeof(HeroEntity))]
        public IHttpActionResult Delete(int id)
        {
            HeroEntity heroEntity = db.HeroEntities.Find(id);
            if (heroEntity == null)
            {
                return NotFound();
            }

            db.HeroEntities.Remove(heroEntity);
            db.SaveChanges();

            return Ok(heroEntity);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool HeroEntityExists(int id)
        {
            return db.HeroEntities.Count(e => e.Id == id) > 0;
        }
    }
}
