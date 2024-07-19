import "./css/header.css"
import {
  Tooltip, Tag, Input, Button, useToast, useDisclosure, Modal, ModalOverlay,
  ModalContent, ModalBody, Select,} from '@chakra-ui/react'
import icon from "../../assets/img/icon.png"
import { appWindow } from '@tauri-apps/api/window'
import {useContext, useEffect, useState} from "react";
import {invoke} from "@tauri-apps/api";
import {lcuSummonerInfo,NoticeTypes,HeaderTypes} from "../../interface/SummonerInfo";
import {AlterToSumId} from "./index";
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import RNotification from "./RNotification";
import {open} from "@tauri-apps/api/shell";


const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& button': {
        fontFamily: "DingTalk"
      },
    },
  }),
)

export default function ({page,handleChange,localSumId,sumId,matchMode,handleSelect}:HeaderTypes) {
  const classes = useStyles()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const alterToSumId = useContext(AlterToSumId)
  const [inputValue, setInputValue] = useState('')
  const [isDisable , setIsDisable] = useState(false)
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
    setIsDisable(false)
    if (inputValue === ''){
      toast({
        description: "当前召唤师昵称为空",
        status: 'error',
        duration: 2000,
        containerStyle:{fontSize:'14px',minWidth:'0px',paddingBottom:'4px'}
      })
      return
    }

    const sumInfo:lcuSummonerInfo = await invoke('get_other_sum_by_name',{name:encodeURIComponent(inputValue)})

    if (sumInfo?.httpStatus===404 ||sumInfo?.httpStatus===422){
      toast({
        description: "当前召唤师不存在 [ 跨区服务器需要加上编号 ] xxx#12138",
        status: 'error',
        duration: 4000,
        containerStyle:{fontSize:'14px',minWidth:'0px',paddingBottom:'4px'}
      })
      setInputValue('')
      return
    }
    alterToSumId(sumInfo.summonerId)
    setInputValue('')
  }

  const handleKeyPress = (event:any) => {
    if (event.key === 'Enter') {
      searchSum()
    }
  }

  // 监听 input 的 onChange 事件
  const handleInputChange = (event:any) =>  {
    event.target.value === '' ? setIsDisable(false) : setIsDisable(true)
    setInputValue(event.target.value)
  }

  const handleMatchSelect =(event:any) => {
    handleChange(null,1)
    handleSelect(event.target.value)
  }


  const noticeEle = localSumId !== sumId
      ? <Button size={'sm'} onClick={() => {alterToSumId(localSumId)}}
                colorScheme='twitter' className='headerButton' style={{marginLeft:'9px'}}>查看自己</Button>
      : <Tag variant='NError' style={{height:'32px',marginLeft:'13px'}}
             className='cursor-pointer' onClick={onOpen}>{notice?.is_show ? '新的通知':'更多功能'}</Tag>


  return (
    <div className='relative'>
      <div data-tauri-drag-region className='dragDiv'></div>
      <div className="flex justify-between">
        <div className="flex h-10  items-center justify-between" style={{width:'252px'}}>
          <div className='flex justify-between items-center' style={{width:'250px',height:'40px'}}>
            <img className='w-10' srcSet={icon}/>
            <p className="text-3xl font-bold text-zinc-600">Record</p>
            <div className='webSiteDiv'onClick={() => {open('https://lolfrank.cn')}}>lolfrank.cn</div>
          </div>
        </div>
        {/*搜索*/}
        <div className='inputDiv'>
          <Input size={'sm'} width={'172px'} value={inputValue} onChange={handleInputChange} onKeyDown={handleKeyPress}
                 style={{borderRadius:'0.375rem',fontSize:'13px'}} placeholder='仅支持查询 当前大区玩家' />
          <Button size={'sm'} onClick={searchSum}
                  colorScheme='telegram' className='headerButton'>搜索</Button>
          <Select value={matchMode} isDisabled={isDisable}  onChange={handleMatchSelect}
                  variant='outline' size='sm' width='100px'>
            <option value='0'>全部模式</option>
            <option value='420'>单双排位</option>
            <option value='440'>灵活排位</option>
            <option value='450'>极地乱斗</option>
            <option value='430'>匹配模式</option>
          </Select>
          {noticeEle}

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
    </div>
  )
}

