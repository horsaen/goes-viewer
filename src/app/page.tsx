import Image from 'next/image'
import styles from './page.module.css'
import Head from 'next/head'
import SideBar from '@/components/sidebar/SideBar'

export default function Home() {
  return (
    <>
      <div>
        <div className={styles.sidebar}>
          <SideBar active="dashboard" />
        </div>
      </div>
    </>
  )
}