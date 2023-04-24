import icon from "../../assets/img/icon.png"
import {CloseSquareOutlined,MinusSquareOutlined} from "@ricons/antd"
import {Icon} from "@chakra-ui/react"
import { appWindow } from '@tauri-apps/api/window'

export default function () {
  return (
    <div data-tauri-drag-region  className="flex">
      <div className="flex h-10 w-10 items-center">
        <img srcSet={icon}/>
        <p className="ml-3 text-3xl font-bold text-zinc-600">Record</p>
        <Icon className="ml-12 cursor-pointer" onClick={() => appWindow.minimize()}
              boxSize={5} as={MinusSquareOutlined} color='rgb(39,39,42)'/>
        <Icon className="ml-3 cursor-pointer" onClick={() => appWindow.close()}
              boxSize={5} as={CloseSquareOutlined} color='rgb(39,39,42)'/>
      </div>
    </div>
  )
}
