import { createContext, useState } from "react";

export const SettingsContext = createContext()

export default function SettingsProvider({children}) {

    const [completed, setCompleted] = useState(false)
    const [itemsPerScreen, setItemsPerScreen] = useState(3)
    const [sortField, setSortField] = useState('')

    const settings = {
        completed,
        itemsPerScreen,
        sortField
    }

    return (
        <SettingsContext.Provider value={settings}>
            {children}
        </SettingsContext.Provider>
    )
}