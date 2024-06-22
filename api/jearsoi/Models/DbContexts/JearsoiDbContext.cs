using jearsoi.Models.Db;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace jearsoi.Models.DbContexts
{
    public class JearsoiDbContext : IdentityDbContext<AppUser>
    {
        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductDiscount> ProductDiscounts { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
        public DbSet<CouponType> CouponTypes { get; set; }
        public DbSet<Coupon> Coupons { get; set; }


        public JearsoiDbContext(DbContextOptions<JearsoiDbContext> options) : base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Category>()
                .HasIndex(c => c.Name)
                .IsUnique();

            builder.Entity<Product>()
                .HasIndex(p => p.Name)
                .IsUnique();

            builder.Entity<Category>()
                .HasMany(c => c.Products)
                .WithOne(p => p.Category)
                .HasForeignKey(p => p.CategoryId);

            builder.Entity<Product>()
                .HasMany(p => p.ProductDiscounts)
                .WithOne(pd => pd.Product)
                .HasForeignKey(pd => pd.ProductId);

            builder.Entity<Order>()
                .HasMany(o => o.OrderDetails)
                .WithOne(od => od.Order)
                .HasForeignKey(od => od.OrderId);

            builder.Entity<OrderDetail>()
                .HasOne(od => od.Product)
                .WithMany(od => od.OrderDetails)
                .HasForeignKey(od => od.ProductId);

            builder.Entity<OrderDetail>()
                .HasOne(od => od.Order)
                .WithMany(o => o.OrderDetails)
                .HasForeignKey(od => od.OrderId);

            builder.Entity<CouponType>()
                .HasMany(cpT => cpT.Coupons)
                .WithOne(cp => cp.CouponType)
                .HasForeignKey(cp => cp.CpTypeId);

            builder.Entity<AppUser>()
                .HasMany(u => u.Orders)
                .WithOne(o => o.User)
                .HasForeignKey(o => o.UserId)
                .OnDelete(DeleteBehavior.SetNull);

            builder.Entity<AppUser>()
                .HasMany(u => u.Coupons)
                .WithOne(o => o.User)
                .HasForeignKey(o => o.UserId)
                .OnDelete(DeleteBehavior.SetNull);

        }
    }
}
