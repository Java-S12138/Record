import "./css/header.css"
import { Tooltip } from '@chakra-ui/react'
import icon from "../../assets/img/icon.png"
import { appWindow } from '@tauri-apps/api/window'

export default function () {
  return (
    <div data-tauri-drag-region  className="flex">
      <div className="flex h-10  items-center">
        <img className='w-10' srcSet={icon}/>
        <p className="ml-3 text-3xl font-bold text-zinc-600">Record</p>
        <div className="rounded-full flex roundMDiv roundFont" onClick={() => appWindow.minimize()}>-</div>
        <Tooltip label='下次见' placement='left' bg='#ff6666'>
          <div className="rounded-full flex roundCDiv roundFont" onClick={() => appWindow.close()}>x</div>
        </Tooltip>
      </div>
    </div>
  )
}
