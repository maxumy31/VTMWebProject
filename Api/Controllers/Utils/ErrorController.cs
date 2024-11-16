using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.Utils;
[ApiController]
public class ErrorController:ControllerBase
{
    [Route("/error")]
    [HttpGet]
    public IActionResult Error()
    {
        return Problem();
    }
}