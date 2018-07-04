function BattleAI(){
    this.methods={
	0: {name: "human", func: this.human},
	1: {name: "autoAttack", func: this.aa},
	2: {name: "random", func: this.random},	
    };
    this.result={
	skill: undefined,
	targets: [],
    }
}

BattleAI.prototype.getSkillIndex=function(caster,targets,skills,method) {
    this.methods[method].func(caster,targets);
    return result;
}


BattleAI.prototype.human=function(caster,targets,skills) {
    this.result.skill=undefined;
    this.result.targets=[];
    return result;
}

BattleAI.prototype.aa=function(caster,targets,skills) {
    this.result.skill=skills[skills.length-1];
    this.result.targets=targets[0];
}

BattleAI.prototype.random=function(caster,targets,skills) {
    this.result.skill=skills[genRandomInt(0,skill.length-1)];
    this.result.targets=targets[genRandomInt(0,targets.length-1)];
}





