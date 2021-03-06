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

        //https://localhost:5001/api/deck/searchDecks?criterion={searchTerm}
        // URL's route contains searchDecks and query string has values for criterion key. Search corresponds to the the argument
        // passed to the [HttpGet("searchDecks")] attribute, and criterion corresponds to the method's parameter.
        // UserProfileId is passed to method from the client-side/front-end.
        [HttpGet("searchDecks")]
        public IActionResult SearchDecks(string criterion, int userProfileId )
        {
            return Ok(_deckRepository.SearchDecks(criterion, userProfileId));
        }

        //https://localhost:5001/api/deck/id
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            try
            {
                var deck = _deckRepository.GetDeckById(id);
                return Ok(deck);
            }
            catch
            {
                return NotFound();
            }
        }

        // https://localhost:5001/api/deck
        [HttpPost]
        public IActionResult Post(Deck deck)
        {
            string fireBaseId = GetCurrentUserFirebaseId();
            var currentUser = _userProfileRepository.GetByFirebaseUserId(fireBaseId);
            deck.UserProfileId = currentUser.Id;
            _deckRepository.AddDeck(deck);
            return CreatedAtAction("Post", new { id = deck.Id }, deck);
        }

        // https://localhost:5001/api/deck
        [HttpPut]
        public IActionResult Update(Deck deck)
        {
            try
            {
                _deckRepository.UpdateDeck(deck);

                return Ok(deck);
            }
            catch
            {
                return BadRequest();
            }
        }

        // https://localhost:5001/api/deck/id
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _deckRepository.DeleteDeck(id);

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
