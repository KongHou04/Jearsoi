using AutoMapper;
using jearsoi.Models.Db;
using jearsoi.Models.DTOs;

namespace jearsoi.Helpers
{
    public class MapperProfile : Profile
    {
        private string _baseImagePath;

        public MapperProfile(string baseImagePath)
        {
            _baseImagePath = baseImagePath;
            CreateMap<Category, CategoryDTO>()
                .ForMember(dest => dest.Products, opt => opt.MapFrom(src => src.Products));
            CreateMap<CategoryDTO, Category>();

            CreateMap<Product, ProductDTO>();
            CreateMap<ProductDTO, Product>();

            CreateMap<Order, OrderDTO>()
                .ForMember(dest => dest.OrderDetails, opt => opt.MapFrom(src => src.OrderDetails));
            CreateMap<OrderDTO, Order>()
                .ForMember(dest => dest.OrderDetails, opt => opt.MapFrom(src => src.OrderDetails));

            CreateMap<OrderDetail, OrderDetailDTO>();
            CreateMap<OrderDetailDTO, OrderDetail>();

            CreateMap<AppUser, AppUserDTO>();
        }
    }
}
