import "./styles.css";
import React from "react";
import {Match} from "./view/match";
import {tagTheme} from "./utils/theme";
import {invoke} from "@tauri-apps/api";
import ReactDOM from "react-dom/client";
import {appWindow} from "@tauri-apps/api/window";
import { ChakraProvider,extendTheme } from '@chakra-ui/react'


invoke('is_lcu_success').then((isTrue) => {
  if (isTrue){
    const theme = extendTheme({
      components: {
        Tag: tagTheme
      }
    })

    ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
      <ChakraProvider theme={theme}>
        <Match />
      </ChakraProvider>
    )
  }else {
    ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
      <div className='p-3 bg-white h-full boxShadow' style={{height:'650px'}}>
        <div className='flex gap-5 flex-col items-center h-full justify-center'>
          <h1>┗|｀O′|┛ 啊嗷~~  数据获取异常~~~</h1>
          <h2>请在英雄联盟客户端启动后 打开此软件
            <span className='cursor-pointer text-red-500'
                  onClick={() => appWindow.close()}> [ 关闭软件 ] </span> </h2>
          <h2>如果英雄联盟已经运行, 请关注官网 lolfrank.cn 是否存在软件更新 当前版本 0.0.1</h2>
        </div>
      </div>
    )
  }
})


