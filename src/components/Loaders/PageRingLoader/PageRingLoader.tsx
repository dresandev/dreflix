import { ScrollToTop } from "~/components/ScrollToTop"
import { RingLoader } from "~/components/Loaders/RingLoader"
import styles from "./PageRingLoader.module.css"

export const PageRingLoader = () => {
  return (
    <>
      <ScrollToTop />
      <div className={styles.container}>
        <RingLoader />
      </div>
    </>
  )
}
