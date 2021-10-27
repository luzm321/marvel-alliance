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

        public CardController(ICardRepository cardRepository)
        {
            _cardRepository = cardRepository;
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


    }
}
