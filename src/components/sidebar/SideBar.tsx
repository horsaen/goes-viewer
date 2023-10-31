import Link from 'next/link'
import fs from 'fs'
import styles from './SideBar.module.css'

var mainDir: any = process.env.NEXT_PUBLIC_LIVE_OUTPUT
var optionalDir: any = process.env.NEXT_PUBLIC_OTHER_DIRS
// var files = fs.readdirSync(optionalDir || '')

export default function SideBar(props) {
    var opt = JSON.parse(optionalDir)
    return (
        <div className={styles.sidebar}>
            <p>{"Active: " + props.active}</p>
            <div className={styles.folderList}>
                {/* well it works :DDDDD */}
                {/* {files.slice(0).reverse().map((file, i) =>
                    <Link key={i} href={file}>
                        <span>{file}</span>
                    </Link>
                )} */}
                {mainDir ? 
                    <Link href={'/data' + mainDir} className={styles.list}>
                        <span>live_output</span>
                        <span>{mainDir}</span>
                    </Link>
                : null }
                {opt.map((dir, i) =>(
                    <Link key={i} href={"data/" + dir.dir} className={styles.list}>
                        <span>{dir.type}</span>
                        <span>{dir.dir}</span>
                    </Link>
                ))}
            </div>
        </div>
    )
}