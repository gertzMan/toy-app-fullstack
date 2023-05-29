import { ToyPreview } from './toy-preview.jsx'

export function ToyList({ toys, onRemoveToy }) {
  if (!toys?.length) return <h1>loading...</h1>
  return (
    <ul className="toy-list">
      {toys.map(toy => (
        <li className="toy-preview" key={toy._id}>
          <ToyPreview toy={toy} />

          <div>
            <button
              className="btn-round"
              onClick={() => {
                onRemoveToy(toy._id)
              }}
            >
              remove
            </button>

          </div>
        </li>
      ))}
    </ul>
  )
}
