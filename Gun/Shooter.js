import randomNum from "./randomNum"
class Shooter{
    isDead;
    rate;
    name;
    constructor(rate,name){
        this.name=name;
        this.rate=rate;
        this.isDead=false;
    }
    shoot(other){
        var num=randomNum(1,100);
        if(num<rate){
            other.isDead=ture;
        }
    }
}
module.exports=shooter;