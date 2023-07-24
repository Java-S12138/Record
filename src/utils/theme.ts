// @ts-ignore
import { tagAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

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
    bg: 'rgba(102,179,255, 0.12)',
    color:'#66B3FF'
  },
})
const NError = definePartsStyle({
  container: {
    bg: 'rgba(255, 102, 102, 0.12)',
    color:'#ff6666'
  },
})
const NWarning = definePartsStyle({
  container: {
    bg: 'rgba(240, 160, 32, 0.12)',
    color:'#f0a020'
  },
})

export const tagTheme = defineMultiStyleConfig({
    variants: {
      NInfo: NInfo,
      NSuccess:NSuccess,
      NError:NError,
      NWarning:NWarning
    },
  })
