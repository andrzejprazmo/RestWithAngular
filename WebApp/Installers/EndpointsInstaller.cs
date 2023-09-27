using Microsoft.AspNetCore.Rewrite;
using System.Reflection;
using WebApp.Installers.Abstract;

namespace WebApp.Installers
{
    public static class EndpointsInstaller
    {
        public static IServiceCollection AddCustomEndpoints(this IServiceCollection services)
        {
            var rules = Assembly.GetExecutingAssembly().GetTypes()
             .Where(t => !t.IsAbstract && t.IsClass && typeof(IEndpointsModule).IsAssignableFrom(t));

            foreach (var rule in rules)
            {
                services.Add(new ServiceDescriptor(typeof(IEndpointsModule), rule, ServiceLifetime.Singleton));
            }
            return services;
        }

        public static void UseCustomEndpoints(this WebApplication app)
        {
            var endpoints = app.Services.GetServices<IEndpointsModule>();
            foreach (var endpoint in endpoints)
            {
                if (endpoint != null)
                {
                    endpoint.RegisterEndpoints(app);
                }
            }
        }
    }
}
