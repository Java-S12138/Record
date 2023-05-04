import "./css/header.css"
import { Tooltip,Input,Button,useToast } from '@chakra-ui/react'
import icon from "../../assets/img/icon.png"
import { appWindow } from '@tauri-apps/api/window'
import {useContext, useRef} from "react";
import {invoke} from "@tauri-apps/api";
import {lcuSummonerInfo} from "../../interface/SummonerInfo";
import {AlterToSumId} from "./index";

export default function () {
  const alterToSumId = useContext(AlterToSumId)
  const inputRef = useRef<HTMLInputElement>(null)
  const toast = useToast()

  const searchSum = async () => {
    if ( inputRef.current ===null){
      return
    }

    const name = inputRef.current.value
    if (name === ''){
      toast({
        description: "当前召唤师昵称为空",
        status: 'error',
        duration: 2000,
        containerStyle:{fontSize:'14px',minWidth:'0px',paddingBottom:'4px'}
      })
    }
    const sumInfo:lcuSummonerInfo = await invoke('get_other_sum_by_name',{name:name})
    if (sumInfo?.httpStatus===404){
      toast({
        description: "当前召唤师不存在",
        status: 'error',
        duration: 2000,
        containerStyle:{fontSize:'14px',minWidth:'0px',paddingBottom:'4px'}
      })
    }
    alterToSumId(sumInfo.summonerId)
    inputRef.current.value = ''
  }

  const handleKeyPress = (event:any) => {
    if (event.key === 'Enter') {
      searchSum()
    }
  }

  return (
    <div data-tauri-drag-region  className="flex">
      <div className="flex h-10  items-center">
        <img className='w-10' srcSet={icon}/>
        <p className="ml-3 text-3xl font-bold text-zinc-600">Record</p>
        <div className="rounded-full flex roundMDiv roundFont" onClick={() => appWindow.minimize()}>-</div>
        <div className="rounded-full flex roundODiv roundFont" onClick={() => appWindow.minimize()}>o</div>
        <Tooltip label='下次见' placement='left' bg='#ff6666'>
          <div className="rounded-full flex roundCDiv roundFont" onClick={() => appWindow.close()}>x</div>
        </Tooltip>
      </div>
      {/*搜索*/}
      <div className='inputDiv'>
        <Input size={'sm'} width={'185px'} ref={inputRef} onKeyDown={handleKeyPress}
               style={{borderRadius:'0.375rem'}} placeholder='仅支持查询 当前大区玩家' />
        <Button size={'sm'} onClick={searchSum}
                colorScheme='blue' style={{fontWeight:'400'}}>Enter</Button>
      </div>
    </div>
  )
}
