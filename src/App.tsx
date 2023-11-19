import './App.css'
import { Item } from './components/Item'
import { useItems } from './hooks/useItems'
import { useSEO } from './hooks/useSEO'

export type ItemId = `${string}-${string}-${string}-${string}-${string}`
export interface Item {
  id: ItemId
  timestamp: number
  text: string
}

function App() {
  const { items, addItem, removeItem } = useItems()

  useSEO({
    title: `[${items.length}] Prueba técnica de React`,
    description: 'Añadir y eliminar elementos de una lista'
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // e.target.value -> para escuchar el onChange de un INPUT

    const { elements } = event.currentTarget

    const input = elements.namedItem('item')
    const isInput = input instanceof HTMLInputElement // validando input
    if (!isInput || input == null) return

    addItem(input.value)

    input.value = ''
  }

  const createHandleRemoveItem = (id: ItemId) => () => {
    removeItem(id)
  }

  return (
    <main>
      <aside>
        <h1>Lista Dinámica</h1>
        <h2>Añade y elimina elementos</h2>

        <form onSubmit={handleSubmit} aria-label='Añadir elementos a la lista'>
          <label>

            <input
              name="item"
              required
              type="text"
              placeholder=" ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ?"
            />
          </label>
          <button id='addElm'>Añadir elemento a la lista</button>
        </form>
      </aside>

      <section>
        <h2>Lista de elementos</h2>
          {
            items.length === 0 ? (
              <p>
                <strong>No hay elementos en la lista.</strong>
              </p>
            ) : (
              <ul>
                {
                  items.map((item) => {
                    return (
                      <Item
                        {...item}
                        handleClick={createHandleRemoveItem(item.id)}
                        key={item.id} />
                    )
                  })
                }
              </ul>
            )
          }
      </section>
    </main>
  )
}

export default App
