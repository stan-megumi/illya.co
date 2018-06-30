function BattleCharacter(customDB, characterDB, skillDB, skillContentDB,ii) {
    this.desc={
	name: customDB.name,
	icon: "img/custom/IMG_"+customDB.id+".JPG",
	m_Name: characterDB.m_Name,
	m_CharaID: characterDB.m_CharaID, 
	m_Class: characterDB.m_Class, 
	m_Element: characterDB.m_Element, 
	m_CharaSkillID: characterDB.m_CharaSkillID, 
	m_ClassSkillIDs: characterDB.m_ClassSkillIDs,
	m_Rare: characterDB.m_Rare,
	Hp:   characterDB.m_InitHp, 
	Atk:  characterDB.m_InitAtk, 
	Mgc:  characterDB.m_InitMgc, 
	Def:  characterDB.m_InitDef, 
	MDef: characterDB.m_InitMDef, 
	Spd:  characterDB.m_InitSpd, 
	Luck: characterDB.m_InitLuck, 
	Index: ii
    };
    this.attr={ // attributes
	Hp:   characterDB.m_InitHp, 
	Atk:  characterDB.m_InitAtk, 
	Mgc:  characterDB.m_InitMgc, 
	Def:  characterDB.m_InitDef, 
	MDef: characterDB.m_InitMDef, 
	Spd:  characterDB.m_InitSpd, 
	Luck: characterDB.m_InitLuck, 
    };
    this.skill={
	m_Datas:        [],
	m_ID:           [],
	m_SkillName:    [],
	m_SkillDetail:  [],
	m_SkillType:    [],
	count:           0
    };

    var len=skillDB.length;
    var i;
    for (i=0;i<len;i++) {
	this.skill.m_Datas.push(skillContentDB[i].m_Datas);
	this.skill.m_ID.push(skillDB[i].m_ID);
	this.skill.m_SkillName.push(skillDB[i].m_SkillName);
	this.skill.m_SkillDetail.push(skillDB[i].m_SkillDetail);
	this.skill.m_SkillType.push(skillDB[i].m_SkillType);
	this.skill.count++;
    }
}

//BattleCharacter.prototype.resetSideOfJoin = function(){

