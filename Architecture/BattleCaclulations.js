function attack(attacker, defender) {
    // The actual damage dealt
    var damage = 0;
    
    // Waited average of attacker's weapon skills
    var attackerDamageRating = attacker.skills[attacker.equipment.weapon.main.type];
    attackerDamageRating += attacker.skills[attacker.equipment.weapon.off.type] / 2;
    
    // Waited average of defender's armor skills
    var defenderArmorRating = defender.skills[defender.equipment.armor.body.type];
    defenderArmorRating += defender.skills[defender.equipment.armor.head.type] / 4;
    defenderArmorRating += defender.skills[defender.equipment.armor.legs.type] / 4;
    defenderArmorRating += defender.skills[defender.equipment.armor.hands.type] / 8;
    defenderArmorRating += defender.skills[defender.equipment.armor.feet.type] / 8;
    defenderArmorRating = Math.floor(defenderArmorRating);
    
    var randomDamageFactor =  Math.ceil(attacker.str * attacker.att * luckFactor(attacker.luc));
    damage = attacker.str * attacker.att * Math.ceil(log(5, attackerDamageRating + 1)) + randomDamageFactor;    
    
    var randomDefenseFactor = Math.ceil(defender.vit * defender.def * luckFactor(defender.luc));
    var defense = defender.def * Math.floor(log(5, defenderArmorRating + 1)) + randomDefenseFactor;
    
    if (defense >= damage) {
        log.write(attacker.name + "'s weapon is no match for " + defender.name + "'s armor.");
        return 0;
    }
    
    damage -= armorFactor;
    
    damage = Math.floor(damage / defender.vit);
    
    if (defense >= damage) {
        log.write(defender.name + " is invulnerable to " + attacker.name + "'s attack.");
        return 0;
    }
    
    if (isCriticalHit(attacker, defender)) {
        log.write(attacker.name + " strikes a critical blow against " + defender.name + "!");
        damage = Math.ceil(damage * 1.75);
    }
    
    var fractionDamageDone = damage / defender.attribtues.maxHP;
    
    log.write(attacker.name + " hits " + defender.name + " for " + fractionDamageDone + "% damage.");
    return damage;
}

function log(base, arg) {
    return (Math.log(arg) / Math.log(base));
}

function randomBetween(a, b) {
    return Math.ceil(Math.random() * (b - a) + a);
}

function luckFactor(luc) {
    return randomBetween(log(258, attacker.luc + 1), 1);
}