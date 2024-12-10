using System;
using System.Security.Claims; 
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Models;


namespace Auth;

public interface IAuthService
{
    public Task SetAuthAsync(HttpContext httpContext, User user);
    public Task ClearAuthAsync(HttpContext httpContext);
    public Task<ClaimsPrincipal> GetPrincipalsAsync(HttpContext httpContext);
}