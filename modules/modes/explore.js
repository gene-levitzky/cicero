
function Explore(session) {

    this.session = session;

    this.keyListener = function(key) {

        switch(key) {
            
            // case 'w'
            case 87: 
                this.session.moveCharacter('north');
                break;
                
            // case 's'
            case 83:
                this.session.moveCharacter('south');
                break;
            
            // case 'a'
            case 65:
                this.session.moveCharacter('west');
                break;
                
            // case 'd'
            case 68:
                this.session.moveCharacter('east');
                break;
        }
    }
}

exports.Explore = Explore;