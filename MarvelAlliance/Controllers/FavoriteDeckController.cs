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

        //https://localhost:5001/api/favoriteDeck
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_faveDeckRepository.GetAll());
        }

        //https://localhost:5001/api/favoriteDeck/id
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            try
            {
                var faveDeck = _faveDeckRepository.GetFaveDeckById(id);
                return Ok(faveDeck);
            }
            catch
            {
                return NotFound();
            }
        }

        // https://localhost:5001/api/favoriteDeck
        [HttpPost]
        public IActionResult Post(FavoriteDeck faveDeck)
        {
            string fireBaseId = GetCurrentUserFirebaseId();
            var currentUser = _userProfileRepository.GetByFirebaseUserId(fireBaseId);
            faveDeck.UserProfileId = currentUser.Id;
            _faveDeckRepository.AddFaveDeck(faveDeck);
            return CreatedAtAction("Get", new { id = faveDeck.Id }, faveDeck);
        }

        // https://localhost:5001/api/favoriteDeck/id
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _faveDeckRepository.DeleteFaveDeck(id);

                return NoContent();
            }
            catch
            {
                return BadRequest();
            }
        }

        // Retrieve FirebaseUserId (string)
        private string GetCurrentUserFirebaseId()
        {
            string firebaseUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return firebaseUserId;
        }
    }
}
