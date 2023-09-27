using Microsoft.AspNetCore.Mvc;
using WebApp.Core.Queries.GetConfiguration;
using WebApp.Installers.Abstract;

namespace WebApp.Api.Configuration
{
    public class ConfigurationEndpoints : IEndpointsModule
    {
        public void RegisterEndpoints(IEndpointRouteBuilder app)
        {
            app.MapGet("api/configuration/load", GetConfiguration).WithName("GetConfiguration");
        }

        [ProducesResponseType(200, Type = typeof(GetConfigurationResponse))]
        public IResult GetConfiguration()
        {
            return Results.Ok(new GetConfigurationResponse
            {
                ApplicationUrl = "http://www.webapp.pl",
            });
        }
    }
}
