namespace WebApp.Installers.Abstract
{
    public interface IEndpointsModule
    {
        void RegisterEndpoints(IEndpointRouteBuilder app);
    }
}
