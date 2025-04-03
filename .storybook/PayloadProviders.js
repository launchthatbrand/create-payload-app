import { DrawerDepthProvider } from '@payloadcms/ui/elements/Drawer'
import { ModalProvider } from '@faceless-ui/modal'
import React from 'react'
import { TranslationProvider } from '@payloadcms/ui/providers/Translation'

/**
 * This component wraps stories with all the necessary providers from PayloadCMS UI
 * This helps components that depend on these providers to work correctly in Storybook
 */
export const PayloadProviders = ({ children }) => {
  return (
    <ModalProvider transTime={0}>
      <TranslationProvider i18n={{ t: (key) => key }}>
        <DrawerDepthProvider>{children}</DrawerDepthProvider>
      </TranslationProvider>
    </ModalProvider>
  )
}

/**
 * Decorator for Storybook to wrap a story with all PayloadCMS UI providers
 */
export const withPayloadProviders = (Story) => {
  return (
    <PayloadProviders>
      <Story />
    </PayloadProviders>
  )
}

export default PayloadProviders
