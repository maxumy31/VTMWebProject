namespace JWT;

class JWTService {

    private string _secretKey = "blood";
    private string tokenIssuer = "vtm";
    private string tokenAudience = "vtmUser";

    public string GenerateToken(string username){
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, username),
            new Claim(ClaimTypes.NameIdentifier, 123/*Я должен Id пользователя прочитать наверное*/)
        };
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(
            issuer: tokenIssuer,
            audience: tokenAudience,
            claims: claims,
            expires: DateTime.Now.AddHours(24),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public ClaimsPrincipal ValidateToken(string token){

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey));
        var tokenHandler = new JwtSecurityTokenHandler();
        try
        {
            var principal = tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidIssuer = tokenIssuer,
                ValidAudience = tokenAudience,
                IssuerSigningKey = key
            }, out var validatedToken);

            return principal;
        }
        catch (Exception)
        {
            return null;
        }
    }




}