import "./css/header.css"
import { Tooltip,Input,Button,useToast } from '@chakra-ui/react'
import icon from "../../assets/img/icon.png"
import { appWindow } from '@tauri-apps/api/window'
import {useContext, useRef, useState} from "react";
import {invoke} from "@tauri-apps/api";
import {lcuSummonerInfo} from "../../interface/SummonerInfo";
import {AlterToSumId} from "./index";
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& button': {
        fontFamily: "DingTalk"
      },
    },
  }),
)

export default function ({page,handleChange,localSumId,sumId}:
{page:number,handleChange:any,localSumId:number,sumId:number}) {
  const classes = useStyles()
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

  const backEle = localSumId !== sumId
    ? <div><Button size={'sm'} onClick={() => {alterToSumId(localSumId)}}
                   colorScheme='blue' className='headerButton'>查看自己</Button></div>
    : <div></div>


  return (
    <div data-tauri-drag-region  className="flex justify-between">
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
        {backEle}
        <Input size={'sm'} width={'185px'} ref={inputRef} onKeyDown={handleKeyPress}
               style={{borderRadius:'0.375rem'}} placeholder='仅支持查询 当前大区玩家' />
        <Button size={'sm'} onClick={searchSum}
                colorScheme='blue' className='headerButton'>Enter</Button>
        <div className={classes.root}>
          <Pagination count={20} page={page} shape="rounded" onChange={handleChange} />
        </div>

      </div>
    </div>
  )
}
