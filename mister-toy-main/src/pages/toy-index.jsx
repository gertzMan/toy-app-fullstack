import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { ToyList } from '../cmps/toy-list.jsx'
import { ToyFilter } from '../cmps/toy-filter.jsx'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy, setFilterBy } from '../store/toy.action.js'
import { labelService } from "../services/label.service.js"




export function ToyIndex() {

    const { toys, filterBy, isLoading } = useSelector((storeState) => storeState.toyModule)

    const [labels, setLabels] = useState([])

    useEffect(() => {
        labelService.query()
            .then(labels => {
                setLabels(labels)
            })
    }, [])

    useEffect(() => {
        loadToys(filterBy)
    }, [filterBy])

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }


    function onSetFilter(filterBy) {
        console.log('Filter By:', filterBy)
        setFilterBy(filterBy)
    }

    return <section className="toy-index">
        <main>
            <Link to={`/toy/edit`}>Add Toy</Link>

            <ToyFilter labels={labels} onSetFilter={onSetFilter} filterBy={filterBy} />
            {isLoading && <h4 className="loading-message">Loading...</h4>}
            <ToyList
                toys={toys}
                onRemoveToy={onRemoveToy}
            />
        </main>
    </section>
}