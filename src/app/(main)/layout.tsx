import styles from './layout.module.css'

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({
  children
}: MainLayoutProps) {
  return (
    <>
      {children}
      <div className={styles.pageClearance}></div>
    </>
  )
}
