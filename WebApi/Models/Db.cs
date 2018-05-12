namespace WebApiMagister.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class Db : DbContext
    {
        public Db()
            : base("name=Db")
        {
        }

        public virtual DbSet<Department> Departments { get; set; }
        public virtual DbSet<Position> Positions { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<UserRole> UserRoles { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Department>()
                .Property(e => e.Name)
                .IsUnicode(true);

            modelBuilder.Entity<Position>()
                .Property(e => e.Name)
                .IsUnicode(true);

            modelBuilder.Entity<Role>()
                .Property(e => e.Name)
                .IsUnicode(true);
            
            modelBuilder.Entity<User>()
                .Property(e => e.FirstName)
                .IsUnicode(true);

            modelBuilder.Entity<User>()
                .Property(e => e.LastName)
                .IsUnicode(true);

            modelBuilder.Entity<User>()
                .Property(e => e.MiddleName)
                .IsUnicode(true);

            modelBuilder.Entity<User>()
                .HasMany(e => e.UserRoles)
                .WithRequired(e => e.User)
                .WillCascadeOnDelete(false);
        }
    }
}
