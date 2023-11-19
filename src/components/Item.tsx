export function Item (
    { text, handleClick }:
    { text: string, handleClick: () => void
  }) {
    return (
      <li>
        <button onClick={handleClick}>
          x
        </button>
        {text}
      </li>
    )
  }