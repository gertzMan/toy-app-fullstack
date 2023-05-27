import { useSearchParams } from 'react-router-dom'
import { labelService } from '../services/label.service'
import { useState, useRef, useEffect } from 'react'
import { PieChart } from '../cmps/pie-chart'
import { toyService } from '../services/toy.service'

export function Dashboard() {
  const [labels, setLabels] = useState([])
  const [map, setMap] = useState({})
  //   const labelMap = useRef({})
  //   console.log(labelMap)

  //   useEffect(() => {
  //     labelService
  //       .query()
  //       .then(labels => {
  //         setLabels(labels)
  //       })
  //       .then(toyService.getLabelMap().then(res => (labelMap.current = res)))
  //   }, [])

  //   useEffect(() => {
  //     toyService.getLabelMap().then(map => setMap(map))
  //   })

  return (
    <section className="dashboard">
      <h1>DashBoard</h1>

      {/* <PieChart labels={labels} /> */}
    </section>
  )
}
