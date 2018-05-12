using System.Data;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using WebApiMagister.Models;
using EntityGraphOperations;

namespace WebApiMagister.Controllers
{
    public class UsersController : ApiController
    {
        private Db db = new Db();

        // GET: api/Users
        public IQueryable<User> GetUsers()
        {
            return db.Users;
        }

        // GET: api/Users/5
        [ResponseType(typeof(User))]
        public IHttpActionResult GetUser(int id)
        {
            User user = db.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpGet, Route("api/users/search")]
        public IQueryable<User> GetUser(string FirstName, int? PositionId, int? DepartmentId)
        {
            IQueryable<User> users = db.Users;

            if (!string.IsNullOrEmpty(FirstName))
            {
                users = users.Where(m => m.FirstName.Contains(FirstName));
            }

            if (PositionId != null)
            {
                users = users.Where(m => m.PositionId == PositionId);
            }

            if (DepartmentId != null)
            {
                users = users.Where(m => m.DepartmentId == DepartmentId);
            }

            return users;
        }

        // PUT: api/Users/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutUser(int id, [FromBody]User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != user.Id)
            {
                return BadRequest();
            }

            if (user.PositionId != null)
            {
                user.Position = db.Positions.Find(user.PositionId);
            }
            if(user.DepartmentId != null)
            {
                user.Department = db.Departments.Find(user.DepartmentId);
            }
            
            db.InsertOrUpdateGraph(user)
                .After(entity =>
                {
                    entity.HasCollection(p => p.UserRoles).DeleteMissingEntities();
                });

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        // POST: api/Users
        [ResponseType(typeof(User))]
        public IHttpActionResult PostUser(User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            db.Users.Add(user);
            
            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (UserExists(user.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = user.Id }, user);
        }

        // DELETE: api/Users/5
        [ResponseType(typeof(User))]
        public IHttpActionResult DeleteUser(int id)
        {
            User user = db.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            db.Users.Remove(user);
            db.SaveChanges();

            return Ok(user);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserExists(int id)
        {
            return db.Users.Count(e => e.Id == id) > 0;
        }
    }
}