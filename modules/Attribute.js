

exports.Attribute() {
    
    /*
     * "Hit Points"
     */
    this.hp  = 0;
    /*
     * "Magic points"
     */
    this.mp  = 0;
    /*
     * "Stamina"
     * Determines how many actions can be performed during combat.
     */
    this.sta = 0;
    
    /*
     * "Agility"
     * Determines character movement speed and combat activation time.
     */
    this.agi = 0,
    /*
     * "Charisma"
     * Determines character +/- enmity and NPC relationships.
     */
    this.cha = 0,
    /*
     * "Endurance"
     * Determines the rate at which stamina is depleted.
     */
    this.end = 0,
    /*
     * "Fortitude"
     * Determines the character's resistance to enemy magic and environmental effects.
     */
    this.for = 0, // Feels wrong using `for` here, but whaddya gonna do?
    /*
     * "Logic"
     * Determines the effectiveness of your magic.
     */
    this.log = 0,
    /*
     * Determines all random factors.
     */
    this.luc = 0,
    /*
     * "Precision"
     * Determines the accuracy of the character's physical attacks.
     */
    this.pre = 0,
    /*
     * "Reflex"
     * Determines the character'a rate of evading/countering enemy attacks,
     * both physical and magical, and the effectiveness of maneuvers.
     */
    this.ref = 0,
    /*
     * "Robustness"
     * Determines the character's resistance to physical damage from enemy 
     * attacks and the environment.
     */
    this.rob = 0,
    /*
     * "Strength"
     * Determines the effectiveness of the character's physical attacks and
     * carrying capacity.
     */
    this.str = 0,
    /*
     * "Vitality"
     * Determines the rate at which HP and MP are replenished.
     */
    this.vit = 0,
    /*
     * "Wisdom"
     * Determines the MP cost of spells.
     */
    this.wis = 0,
}