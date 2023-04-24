import {Image, Tag,} from "@chakra-ui/react";

export default function () {
  return (
    <div className="p-3 bg-white h-full w-full boxShadow">
      <div className="flex gap-x-4">
        <Image borderRadius='full' boxSize='60px' src='https://wegame.gtimg.com/g.26-r.c2d3c/helper/lol/assis/images/resources/usericon/5430.png'/>
        <div className="flex flex-col grow gap-y-3">
            <Tag
              size={'md'}
              colorScheme='twitter'
              borderRadius='full'
              variant='solid'
              style={{height:'28px',justifyContent:'center',
                color: '#2080f0',background:'rgba(32, 128, 240, 0.12)'}}
            >
              18岁游走型中单
            </Tag>
          <div style={{height:'24px'}}>321</div>
        </div>
      </div>
    </div>
  )
}
