import Link from 'next/link'
import fs from 'fs'
import styles from './SideBar.module.css'

var mainDir: any = process.env.NEXT_PUBLIC_LIVE_OUTPUT
var optionalDir: string | undefined = process.env.NEXT_PUBLIC_OTHER_DIRS
// var files = fs.readdirSync(optionalDir || '')

var opt
if (optionalDir == undefined) {
  opt = false
} else {
  opt = JSON.parse(optionalDir)
}

export default function SideBar(props) {
  return (
  <div className={styles.sidebar}>
    <p>{"Active: " + props.active}</p>
    <div className={styles.folderList}>
      {mainDir ? 
        <Link href={'/data' + mainDir} className={styles.list}>
          <span>live_output</span>
          <span>{mainDir}</span>
        </Link>
      : null }
      {opt ?
        <>
        {opt.map((dir, i) =>(
          <Link key={i} href={"data/" + dir.dir} className={styles.list}>
            <span>{dir.type}</span>
            <span>{dir.dir}</span>
          </Link>
        ))}
        </>
      : null}
    </div>
  </div>
  )
}