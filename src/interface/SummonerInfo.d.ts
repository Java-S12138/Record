export interface lcuSummonerInfo {
  accountId: number;
  displayName: string;
  internalName: string;
  nameChangeFlag: boolean;
  percentCompleteForNextLevel: number;
  privacy: string;
  profileIconId: number;
  puuid: string;
  rerollPoints: IRerollPoint;
  summonerId: number;
  summonerLevel: number;
  unnamed: boolean;
  xpSinceLastLevel: number;
  xpUntilNextLevel: number;
  httpStatus?:number
}

interface SumReslut {
  name: string;
  imgUrl: string;
  lv: number;
  xpSL: number;
  xpNL: number;
  puuid: string;
  currentId: number;
}
interface ExcelChamp {
  champImgUrl: string,
  champLevel: string,
  championPoints: string,
  champLabel:string
}

export interface SumInfoRes {
  sumInfo:SumReslut,
  rankPoint:string[],
  excelChamp:ExcelChamp[]
}
