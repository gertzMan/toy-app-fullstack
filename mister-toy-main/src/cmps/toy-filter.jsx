
import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
import { LabelSelector } from "./label-select.jsx"




export function ToyFilter({ onSetFilter, filterBy, labels }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)



    onSetFilter = useRef(utilService.debounce(onSetFilter))

    const elInputRef = useRef(null)

    useEffect(() => {
        elInputRef.current.focus()
    }, [])

    useEffect(() => {
        // update father cmp that filters change every type
        onSetFilter.current(filterByToEdit)
        // eslint-disable-next-line
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [field]: value }))
    }

    function onSubmitFilter(ev) {
        // update father cmp that filters change on submit
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    function onLabelChange(selectedLabels) {
        setFilterByToEdit((prevFilter) => ({
            ...prevFilter,
            labels: selectedLabels,
        }))
    }


    return <section className="toy-filter">
        <h2>Toys Filter</h2>
        <form onSubmit={onSubmitFilter}>
            <label htmlFor="name">Name:</label>
            <input type="text"
                id="name"
                name="name"
                placeholder="By name"
                value={filterByToEdit.name}
                onChange={handleChange}
                ref={elInputRef}
            />

            <label htmlFor="maxPrice">Max price:</label>
            <input type="number"
                id="maxPrice"
                name="maxPrice"
                placeholder="By max price"
                value={filterByToEdit.maxPrice}
                onChange={handleChange}
            />
            <LabelSelector labels={labels} onLabelChange={onLabelChange} />

            <button hidden>Filter</button>
        </form>

    </section>
}