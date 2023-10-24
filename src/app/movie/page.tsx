import { ChevronArrow } from '@components/SVG'
import styles from './page.module.css'

export default function Movie() {
  return (
    <>
      <h1>Popular</h1>

      <div>
        <button>Géneros <ChevronArrow /></button>

        <ul>
          <li>
            <button></button>
          </li>
        </ul>
      </div>
    </>
  )
}
