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
    public class CardController : ControllerBase
    {
        private readonly ICardRepository _cardRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public CardController(ICardRepository cardRepository, IUserProfileRepository userProfileRepository)
        {
            _cardRepository = cardRepository;
            _userProfileRepository = userProfileRepository;
        }

        //https://localhost:5001/api/card/deckId
        [HttpGet("{deckId}")]
        public IActionResult GetAllCardsByDeckId(int deckId)
        {
            try
            {
                var cards = _cardRepository.GetCardsByDeckId(deckId);
                return Ok(cards);
            }
            catch
            {
                return NotFound();
            }
        }

        //https://localhost:5001/api/card/searchCards?criterion={searchTerm}
        // URL's route contains searchCards and query string has values for criterion key. Search corresponds to the the argument
        // passed to the [HttpGet("searchCards")] attribute, and criterion corresponds to the method's parameter.
        // DeckId is passed to method from the client-side/front-end.
        [HttpGet("searchCards")]
        public IActionResult SearchCards(string criterion, int deckId)
        {
            return Ok(_cardRepository.SearchCards(criterion, deckId));
        }

        //https://localhost:5001/api/card/getCard/id
        [HttpGet("getCard/{id}")]
        public IActionResult GetById(int id)
        {
            try
            {
                var card = _cardRepository.GetCardById(id);
                return Ok(card);
            }
            catch
            {
                return NotFound();
            }
        }

        // https://localhost:5001/api/card
        [HttpPost]
        public IActionResult Post(Card card)
        {
            card.Health = 200;
            _cardRepository.AddCard(card);
            return CreatedAtAction("Post", new { id = card.Id }, card);
        }

        // https://localhost:5001/api/card/id
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _cardRepository.DeleteCard(id);

                return NoContent();
            }
            catch
            {
                return BadRequest();
            }
        }

        // https://localhost:5001/api/card
        [HttpPatch]
        public IActionResult Patch(Card card)
        {
            try
            {
                _cardRepository.PatchCard(card);

                return Ok(card);
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
