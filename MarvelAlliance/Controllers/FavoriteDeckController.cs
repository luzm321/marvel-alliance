using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MarvelAlliance.Repositories;
using MarvelAlliance.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace MarvelAlliance.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class FavoriteDeckController : ControllerBase
    {
        private readonly IFavoriteDeckRepository _faveDeckRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public FavoriteDeckController(IFavoriteDeckRepository faveDeckRepository, IUserProfileRepository userProfileRepository)
        {
            _faveDeckRepository = faveDeckRepository;
            _userProfileRepository = userProfileRepository;
        }


    }
}
