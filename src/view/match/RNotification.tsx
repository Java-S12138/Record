import recordImg from "../../assets/img/record.png"
import {Tag, Button} from "@chakra-ui/react"
import {open} from '@tauri-apps/api/shell'
import {NoticeTypes} from "../../interface/SummonerInfo";

export default function ({notice}: { notice: NoticeTypes }) {
  const content = notice?.is_show ? notice?.content : '当前暂无通知信息 温馨提示: 此软件可在网上免费下载 请勿花钱购买'

  const buttonEle = notice?.is_button
    ?
    <Button onClick={() => {open(notice?.url)}}
            size={'sm'} colorScheme='twitter' style={{fontWeight:'400',height:'30px'}}>
      {notice?.button_content}</Button>
    :
    <div></div>

  return (
    <div className='flex-col flex'>
      <div className='flex px-1.5 justify-between'>
        <div className='flex gap-5'>
          <Tag variant={notice?.variant} size={'lg'}>{content}</Tag>
          {buttonEle}
        </div>
        <Button onClick={() => {open('https://lolfrank.cn')}}
          size={'sm'} colorScheme='red' style={{fontWeight:'400',height:'30px',
          backgroundColor:'rgba(255, 102, 102, 0.12)',color:'#ff6666'}}>了解更多功能</Button>
      </div>
      <div style={{width: '720px', height: '490px'}}>
        <img src={recordImg}/>
      </div>
    </div>
  )
}
