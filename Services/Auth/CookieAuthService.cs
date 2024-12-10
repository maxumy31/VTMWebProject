using System;
using System.Security.Claims; 
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authentication.Cookies;
using Models;

namespace Auth;

public class CookieAuthService : IAuthService
{
    private const string CookieName = "AuthCookie";

    public async Task SetAuthAsync(HttpContext httpContext, User user)
    {

        var claims = new List<Claim>
        {
            new Claim("id", user.ID.ToString()),
        };

        var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
        var principal = new ClaimsPrincipal(identity);

        await httpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal, new AuthenticationProperties
        {
            IsPersistent = true, 
            ExpiresUtc = DateTime.UtcNow.AddHours(1), 
            AllowRefresh = true, 
        });

    }

    public async Task<ClaimsPrincipal> GetPrincipalsAsync(HttpContext httpContext)
    {
        var result = await httpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        return result?.Principal;
    }

    public async Task ClearAuthAsync(HttpContext httpContext)
    {
        await httpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
    }

}