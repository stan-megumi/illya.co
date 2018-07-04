function BattleSkillSolver(){
    
}

BattleSkillSolver.prototype.solve=function(caster,targets,skill,order) {
    var damage=genRandomInt(0,1000);
    var ordervalue=genRandomInt(0,100);
    log(targets.attr.Hp);
    targets.attr.Hp-=damage;
    log(targets.attr.Hp);
    order.clearOneTurnOfOrder(ordervalue);
    log("{0} cast spell {1} on {2}: damage {3} ordervalue {4}".format(caster.desc.name,
								      skill,
								      targets.desc.name,
								      damage,
								      ordervalue));
    return true;
}    


