import recordImg from "../../assets/img/record.png"
import {Tag,Button} from "@chakra-ui/react"
import { open } from '@tauri-apps/api/shell'
import {NoticeTypes} from "../../interface/SummonerInfo";

export default function ({notice}:{notice:NoticeTypes}) {

  return (
    <div className='flex-col flex'>
      <div className='flex px-1.5 justify-between'>
        <Tag size={'lg'}>{notice?.content}</Tag>
        <Button onClick={() => {open('https://lolfrank.cn')}}
          size={'sm'} colorScheme='red' style={{fontWeight:'400',height:'30px',
          backgroundColor:'#ff6666',color:'#fff'}}>了解更多功能</Button>
      </div>
      <div style={{width:'720px',height:'490px'}}>
        <img src={recordImg}/>
      </div>
    </div>
  )
}
