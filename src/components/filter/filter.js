import {useContext, useEffect, useState} from 'react'
import './filter.css'
import { SettingsContext } from "../../Context/Settings";

export default function DisplayFilter({ listFilter, itemsPerPage }) {

    const settings = useContext(SettingsContext)

    const options = ['Difficulty', 'Newest', 'Oldest']
    const itemsOnScreen = [3, 6, 10]
    const [filter, setFilter] = useState(null)

    const filterChange = (e) => {
        setFilter(e.target.value)
    }

    const changeItemsPerPage = (val) => {
        itemsPerPage(val)
    }

    useEffect(() => {
        listFilter(filter)
    }, [filter])

    return (
        <>
            <h4 className="filter">Filter by...</h4>
            <div className="bp4-html-select filter">
                <select onChange={(e) => filterChange(e)}>
                    <option>Choose an item...</option>
                    {options.map(item => {
                        return (
                            <option key={item} value={item}>{item}</option>
                        )
                    })}
                </select>
                <span className="bp4-icon bp4-icon-double-caret-vertical"></span>
            </div>


            <h4 className="filter">Items per screen</h4>
            <div className="bp4-html-select filter">
                <select onChange={(e) => changeItemsPerPage(e.target.value)}>
                    <option>Choose an item...</option>
                    {itemsOnScreen.map(item => {
                        return (
                            <option key={item} value={item}>{item}</option>
                        )
                    })}
                </select>
                <span className="bp4-icon bp4-icon-double-caret-vertical"></span>
            </div>
        </>
    )
}