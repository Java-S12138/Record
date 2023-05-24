// 英文段位昵称转中文
export const englishToChinese = (tier:string) => {
  switch (tier) {
    case 'CHALLENGER' :return '王者';
    case 'GRANDMASTER' :return '宗师';
    case 'MASTER' :return '大师';
    case 'DIAMOND' :return '钻石';
    case 'PLATINUM' :return '铂金';
    case 'GOLD' :return '黄金';
    case 'SILVER' :return '白银';
    case 'BRONZE' :return '青铜';
    case 'IRON' :return '黑铁';
  }
}

// 处理段位数据
export const dealDivsion = (divsion:string) => {
  return divsion === 'NA'?'':divsion
}

// 根据游戏模式ID判断 游戏模式
export const queryGameType = (queueId:number) => {
  switch (queueId) {
    case 420 : return '单双排位';
    case 430 : return '匹配模式';
    case 440 : return '灵活排位';
    case 450 : return '极地乱斗';
  }
  return '其它模式'
}

// 通过召唤师id获取召唤师图片地址
export const getspellImgUrl = (spellId:number) => {
  switch (spellId) {
    case 4:return 'https://game.gtimg.cn/images/lol/act/img/spell/Summoner_flash.png';
    case 14:return 'https://game.gtimg.cn/images/lol/act/img/spell/SummonerIgnite.png';
    case 11:return 'https://game.gtimg.cn/images/lol/act/img/spell/Summoner_smite.png';
    case 6:return 'https://game.gtimg.cn/images/lol/act/img/spell/Summoner_haste.png';
    case 12:return 'https://game.gtimg.cn/images/lol/act/img/spell/Summoner_teleport.png';
    case 21:return 'https://game.gtimg.cn/images/lol/act/img/spell/SummonerBarrier.png';
    case 3:return 'https://game.gtimg.cn/images/lol/act/img/spell/Summoner_exhaust.png';
    case 1:return 'https://game.gtimg.cn/images/lol/act/img/spell/Summoner_boost.png';
    case 7:return 'https://game.gtimg.cn/images/lol/act/img/spell/Summoner_heal.png';
    case 32:return 'https://game.gtimg.cn/images/lol/act/img/spell/Summoner_Mark.png'
  }
  return 'https://game.gtimg.cn/images/lol/act/img/spell/SummonerMana.png'
}

// 通过物品id获取图片地址
export const getItemImgUrl = (item:number) => {

  if (item == 0){
    return new URL("/src/assets/img/image.png", import.meta.url).href
  }else {
    return `https://game.gtimg.cn/images/lol/act/img/item/${item}.png`
  }
}

export const iconDict:{ [key: string]: string } = {
  'assists':'助攻最多, 从不K头',
  'firstBlood':'第一滴血, 这局我Carry',
  'fiveKills':'五杀! Superexcellent',
  'fourKills':'四杀! Excellent',
  'god':'超神! So Easy',
  'goldEarned':'获得最多金币 So Rich',
  'kills':'击杀最多 是在下无敌啦',
  'mvp':'MVP',
  'svp':'SVP',
  'threeKills':'三杀! Good Job',
  'totalDamageDealtToChampions':'输出最高伤害 人称小代',
  'totalDamageTaken':'承伤最多的坦克爸爸',
  'totalMinionsKilled':'补刀最多 随便玩玩啦',
  'turretKills':'拆塔最多',
  'visionScore':'视野得分最高'
}
