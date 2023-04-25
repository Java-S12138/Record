// @ts-ignore
import { tagAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tagAnatomy.keys)

const NSuccess = definePartsStyle({
  container: {
    bg: 'rgba(31, 202, 188, 0.12)',
    color:'#1FCABC'
  },
})
const NInfo = definePartsStyle({
  container: {
    bg: 'rgba(32, 128, 240, 0.12)',
    color:'#2080f0'
  },
})

export const tagTheme = defineMultiStyleConfig({
    variants: {
      NInfo: NInfo,
      NSuccess:NSuccess
    },
  })
