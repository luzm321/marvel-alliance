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
    public class DeckController : ControllerBase
    {
        private readonly IDeckRepository _deckRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public DeckController(IDeckRepository deckRepository, IUserProfileRepository userProfileRepository)
        {
            _deckRepository = deckRepository;
            _userProfileRepository = userProfileRepository;
        }

        //https://localhost:5001/api/deck
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_deckRepository.GetAll());
        }

        //https://localhost:5001/api/deck/myDecks
        [HttpGet("myDecks")]
        public IActionResult GetCurrentUserDecks()
        {
            string fireBaseId = GetCurrentUserFirebaseId();
            var currentUser = _userProfileRepository.GetByFirebaseUserId(fireBaseId);
            var userDecks = _deckRepository.GetDecksByCurrentUser(currentUser.Id);
            return Ok(userDecks);
        }

        // https://localhost:5001/api/deck
        [HttpPost]
        public IActionResult Post(Deck deck)
        {
            string fireBaseId = GetCurrentUserFirebaseId();
            var currentUser = _userProfileRepository.GetByFirebaseUserId(fireBaseId);
            deck.UserProfileId = currentUser.Id;
            _deckRepository.AddDeck(deck);
            return CreatedAtAction("Get", new { id = deck.Id }, deck);
        }

        // Retrieve FirebaseUserId (string)
        private string GetCurrentUserFirebaseId()
        {
            string firebaseUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return firebaseUserId;
        }
    }
}
