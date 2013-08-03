var characterNum = 0;

exports.Character = function (name, attributes, bio)
{
  var character = {};
  
  character.name = name;
  
  character.maxAttributes = attributes.clone();
  character.currentAttributes = attributes.clone();
  
  character.bio = bio;
  
  character.id = characterNum++;
  
  return character;
}

exports.Attributes = function (hp, mp, str, vit, intl, wis, dex, agi, wit, cre, spi, luc)
{
  var att = {};
  
  att.hp = hp;
  att.mp = mp;
  
  // Strength: physical damage.
  att.str = str;
  // Vitality: physical defense, and hp bonus.
  att.vit = vit;
  // Intelligence: destructive magic potency.
  att.intl = intl;
  // Faith: destructive magic resistence.
  att.wis = wis;
  // Dexterity: physical accuracy
  att.dex = dex;
  // Agility: physical evasion.
  att.agi = agi;
  // Creativity: healing magic potency (bestowing).
  att.cre = cre;
  // Spirituality: healing magic effectiveness (receiving), and mp bonus.
  att.spi = spi;
  // Luck: provides a weight to random events.
  att.luc = luc;
  
  att.clone = function () {
    return Attributes(this.hp, this.mp, this.str, this.vit, this.intl, this.wis, 
      this.dex, this.agi, this.wit, this.cre, this.spi, this.luc);
  }
}

/**
 * Stores biographical information of character such as class ('order'), and other in-game 
 * biographical details (such as nationality, factions, etc).
 * 
 * @param {Object} order The role or 'class'.
 * @return {Object}      The Bio object.
 */
exports.Bio = function (order) 
{
  var bio = {};
  
  bio.order = order;
  
  return bio;
}


/**
 * Orders shape the way in which characters develop.
 * @param {String} name        The name of this order.
 * @param {String} description A brief description of this order.
 * @param {Object} attribute   Quantity by how much the character's 
 *                             attribute will change upon leveling.
 * @return {Object} The Order object.
 */
exports.Order = function (name, description, attribute) 
{
  var order = {};
  
  order.name = name;
  order.description = description;
  order.attribute = attribute;
  
  return order;
}

/*
 * Orders:
 *
 * (Distribute 7 points among the attributes, where each point is worth
 *  5 hp/mp, or 1 of any other attribute.)
 */
 
/** Sample Order */
exports.GenericKnight = function () {

  var name = "Generic Knight";
  
  var description = "A generic fighter specializing in medium to heavy weaponry."
  
  var attributes = {
    hp  : 5,
    mp  : 0,
    str : 2,
    vit : 1,
    intl: 0,
    wis : 0,
    dex : 1,
    agi : 1,
    cre : 0,
    spi : 1,
    luc : 0;
  };
  
  return Order(name, description, attributes);
}