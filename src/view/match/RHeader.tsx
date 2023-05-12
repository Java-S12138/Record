import "./css/header.css"
import {
  Tooltip,
  Tag,
  Input,
  Button,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody
} from '@chakra-ui/react'
import icon from "../../assets/img/icon.png"
import { appWindow } from '@tauri-apps/api/window'
import {useContext, useRef, useEffect, useState} from "react";
import {invoke} from "@tauri-apps/api";
import {lcuSummonerInfo,NoticeTypes} from "../../interface/SummonerInfo";
import {AlterToSumId} from "./index";
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import RNotification from "./RNotification";


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
  const { isOpen, onOpen, onClose } = useDisclosure()
  const alterToSumId = useContext(AlterToSumId)
  const inputRef = useRef<HTMLInputElement>(null)
  const [notice,setNotice] = useState({} as NoticeTypes)
  const toast = useToast()

  useEffect(() => {
    const fetchNotice = async () => {
      const notice:NoticeTypes = await invoke("get_notice")
      setNotice(notice)
    }
    fetchNotice()
  }, [])

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
      <div className="flex h-10  items-center justify-between" style={{width:'252px'}}>
        <div className='flex'>
          <img className='w-10' srcSet={icon}/>
          <p className="ml-3 text-3xl font-bold text-zinc-600">Record</p>
        </div>
        <Tag variant='NError' className='cursor-pointer' onClick={onOpen}>更多功能</Tag>
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
        <div className='flex gap-3'>
          <div className="rounded-full flex roundMDiv roundFont" onClick={() => appWindow.minimize()}>-</div>
          <div className="rounded-full flex roundODiv roundFont" onClick={onOpen}>o</div>
          <Tooltip label='下次见~' placement='left' bg='#ff6666'>
            <div className="rounded-full flex roundCDiv roundFont" onClick={() => appWindow.close()}>x</div>
          </Tooltip>
        </div>
      </div>


      <Modal isOpen={isOpen} onClose={onClose} size={'3xl'} autoFocus={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <RNotification notice={notice}/>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}
