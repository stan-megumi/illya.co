function BattleSkillSolver(){
    
}

BattleSkillSolver.prototype.solve=function(caster,targets,skill,order) {
    var result={
	damage: undefined,
	supportTurnMax: undefined,
	supportSubstitute: undefined,
    };
    var damage=genRandomInt(-500,200);
    var ordervalue=genRandomInt(0,100);
    targets.attr.Hp+=damage;
    var joinResult=order.clearOneTurnOfOrder(ordervalue);
    
    log("{0} cast spell {1} on {2}: damage {3} ordervalue {4}".format(caster.desc.name,
								      skill,
								      targets.desc.name,
								      damage,
								      ordervalue));
    result.damage=damage;
    if (joinResult[0].length>0) {
	result.supportTurnMax=joinResult[0][0];
	result.supportSubstitute=joinResult[1][0];
    }
    return result;
}    


