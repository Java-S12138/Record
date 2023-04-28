import {
  Table,
  Tbody,
  Tr,
  TableContainer,
} from '@chakra-ui/react'
import "../css/match.css"

export default function () {
  return (
    <div>
      <TableContainer>
        <Table variant='simple' size='sm' style={{marginTop:'-4px'}}>
          <Tbody className='detailHeader'>
            <Tr className='detaildTr'>
              <td>
                <div>对局日期</div>
                <div>3/22</div>
              </td>
              <td>
                <div>对局类型</div>
                <div>匹配模式</div>
              </td>
              <td>
                <div>开始时间</div>
                <div>22:06</div>
              </td>
              <td>
                <div>数据显示</div>
                <div className='showType'>输出伤害</div>
              </td>
              <td>
                <div>双方比分</div>
                <div>17 : 23</div>
              </td>
              <td>
                <div>对局时长</div>
                <div>20分钟</div>
              </td>
              <td>
                <div>经济差距</div>
                <div>16.3K</div>
              </td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  )
}
