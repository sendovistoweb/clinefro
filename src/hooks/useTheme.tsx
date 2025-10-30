import { useEffect } from "react"
import { useLayoutSettings } from "./useLayoutSettings"

export function useTheme() {
  const { layoutSettings } = useLayoutSettings()

  useEffect(() => {
    if (layoutSettings) {
      const root = document.documentElement

      // Apply custom colors to CSS variables
      if (layoutSettings.primary_color) {
        root.style.setProperty('--primary', layoutSettings.primary_color)
      }
      if (layoutSettings.secondary_color) {
        root.style.setProperty('--secondary', layoutSettings.secondary_color)
      }
      if (layoutSettings.accent_color) {
        root.style.setProperty('--accent', layoutSettings.accent_color)
      }
      if (layoutSettings.background_color) {
        root.style.setProperty('--background', layoutSettings.background_color)
      }
      if (layoutSettings.card_color) {
        root.style.setProperty('--card', layoutSettings.card_color)
      }
    }
  }, [layoutSettings])

  return layoutSettings
}