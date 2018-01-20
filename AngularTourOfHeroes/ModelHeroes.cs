namespace AngularTourOfHeroes
{
    using System;
    using System.Data.Entity;
    using System.Linq;

    public class ModelHeroes : DbContext
    {
        // Your context has been configured to use a 'ModelHeroes' connection string from your application's 
        // configuration file (App.config or Web.config). By default, this connection string targets the 
        // 'AngularTourOfHeroes.ModelHeroes' database on your LocalDb instance. 
        // 
        // If you wish to target a different database and/or database provider, modify the 'ModelHeroes' 
        // connection string in the application configuration file.
        public ModelHeroes()
            : base("name=ModelHeroes")
        {
        }

        // Add a DbSet for each entity type that you want to include in your model. For more information 
        // on configuring and using a Code First model, see http://go.microsoft.com/fwlink/?LinkId=390109.

        public virtual DbSet<HeroEntity> HeroEntities { get; set; }
    }

    public class HeroEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}