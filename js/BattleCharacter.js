function BattleCharacter(index1,index2,ii) {

    // index1 custom index, index2 characterDB index, quest.characters index

    this.desc={
	name: "",
	icon: "",
	m_Name: "",
	m_CharaID: undefined,
	m_Class: undefined,
	m_Element: undefined,
	m_CharaSkillID: undefined, 
	m_ClassSkillIDs: undefined,
	m_Rare: undefined,
	Hp:   undefined,
	Atk:  undefined,
	Mgc:  undefined,
	Def:  undefined,
	MDef: undefined,
	Spd:  undefined,
	Luck: undefined,
	QuestIndex: ii,
	CustomIndex: index1,
	CharacterIndex: index2
    };

    this.attr={ // attributes
	Hp:   undefined,
	Atk:  undefined,
	Mgc:  undefined,
	Def:  undefined,
	MDef: undefined,
	Spd:  undefined,
	Luck: undefined,
    };

    this.skill={
	m_Datas:        [],
	m_ID:           [],
	m_SkillName:    [],
	m_SkillDetail:  [],
	m_SkillType:    [],
	count:           0
    };


    this.loadCharacter();
}

//BattleCharacter.prototype.resetSideOfJoin = function(){

BattleCharacter.prototype.loadCharacter=function(){

    var index1=this.desc.CustomIndex;
    var index2=this.desc.CharacterIndex;
    var ccDB=customDB[index1];
    var cDB=characterDB[index2];
    var desc=this.desc;
    var skill=this.skill;
    var attr=this.attr;

    desc.name=ccDB.name;
    desc.icon= "img/custom/IMG_"+ccDB.id+".JPG",
    desc.m_Name= cDB.m_Name;
    desc.m_CharaID= cDB.m_CharaID; 
    desc.m_Class= cDB.m_Class; 
    desc.m_Element= cDB.m_Element; 
    desc.m_CharaSkillID= cDB.m_CharaSkillID; 
    desc.m_ClassSkillIDs= cDB.m_ClassSkillIDs;
    desc.m_Rare= cDB.m_Rare;
    desc.Hp=   cDB.m_InitHp; 
    desc.Atk=  cDB.m_InitAtk; 
    desc.Mgc=  cDB.m_InitMgc; 
    desc.Def=  cDB.m_InitDef; 
    desc.MDef= cDB.m_InitMDef; 
    desc.Spd=  cDB.m_InitSpd; 
    desc.Luck= cDB.m_InitLuck; 
    attr.Hp=   cDB.m_InitHp; 
    attr.Atk=  cDB.m_InitAtk; 
    attr.Mgc=  cDB.m_InitMgc; 
    attr.Def=  cDB.m_InitDef; 
    attr.MDef= cDB.m_InitMDef; 
    attr.Spd=  cDB.m_InitSpd; 
    attr.Luck= cDB.m_InitLuck; 

    var characterSkillID=cDB.m_CharaSkillID;
    var classSkillID=cDB.m_ClassSkillIDs;
    var ele=cDB.m_Element;
    var i,j,k;
    var len=classSkillID.length;
    var sIndex=[];
    var scIndex=[];

    sIndex.push(indexOfDB(characterSkillID,skillDB));
    scIndex.push(indexOfDB(characterSkillID,skillContentDB));

    for (i=0;i<len;i++){
	j=classSkillID[i];
	k=indexOfDB(j,skillDB);
	sIndex.push(k);
	k=indexOfDB(j,skillContentDB);
	scIndex.push(k);
    }
    var sDB=[];
    var sCDB=[];

    for (i=0;i<len+1;i++){
	this.skill.m_Datas.push(skillContentDB[scIndex[i]].m_Datas);
	this.skill.m_ID.push(skillDB[sIndex[i]].m_ID);
	this.skill.m_SkillName.push(skillDB[sIndex[i]].m_SkillName);
	this.skill.m_SkillDetail.push(skillDB[sIndex[i]].m_SkillDetail);
	this.skill.m_SkillType.push(skillDB[sIndex[i]].m_SkillType);
	this.skill.count++;
    }

}


