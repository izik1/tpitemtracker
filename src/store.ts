import { settings } from "./settings"
import { baseItems } from "./items"

const store = {
    settings: settings,
    items: baseItems,
    openedChecks: <Set<string>>new Set()
}

export default store
