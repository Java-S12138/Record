import {
  Table,
  Tbody,
  Tr,
  TableContainer,
} from '@chakra-ui/react'
import "../css/match.css"

export default function ({title,showTypeValue,switchFun}: {title:string[],showTypeValue:string,switchFun:Function}) {
  const winState = {
    isOne:Number(title[6])>Number(title[7]),
    score:(Math.abs(Number(title[6])-Number(title[7])).toFixed(1))
  }

  return (
    <div>
      <TableContainer>
        <Table variant='simple' size='sm' style={{marginTop:'-4px'}}>
          <Tbody className='detailHeader'>
            <Tr className='detaildTr'>
              <td>
                <div>对局日期</div>
                <div>{title[0]}</div>
              </td>
              <td>
                <div>对局类型</div>
                <div>{title[2]}</div>
              </td>
              <td>
                <div>开始时间</div>
                <div>{title[1]}</div>
              </td>
              <td>
                <div>数据显示</div>
                <div className='showType' onClick={() => {switchFun()}}>{showTypeValue}</div>
              </td>
              <td>
                <div>双方比分</div>
                <div style={{display:'flex',gap:'3px'}}>
                  <p style={{color:'#FF6666'}}>{title[4]}</p>:<p style={{color:'#66B3FF'}}>{title[5]}</p>
                </div>
              </td>
              <td>
                <div>对局时长</div>
                <div>{title[3]}分钟</div>
              </td>
              <td>
                <div>经济差距</div>
                <div style={winState.isOne?{color:'#FF6666'}:{color:'#66B3FF'}}>{winState.score}K</div>
              </td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  )
}
