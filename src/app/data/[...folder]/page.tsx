import fs from 'fs'
import Link from 'next/link'
import styles from './Folder.module.css'

import { PiWarning } from 'react-icons/pi'
// import products
import GoesHrit from '@/components/products/goes/hrit/product'

var isBase: boolean

function FolderList(props){
  var file: string
  var normal: boolean = true
  var yyddmm = props.name.split('_')[0]
  var time = props.name.split('_')[1]
  if(time){
    time = time.replace('-', ':')
  }
  var name = props.name
  switch(true){
    case name.includes('goes_hrit'):
      file = 'GOES HRIT'
      break;
    case name.includes('goes_grb'):
      file = 'GOES GRB'
      break;
    case name.includes('goesr_cda'):
      file = 'GOES-R CDA'
      break;
    case name.includes('noaa_apt'):
      file = 'NOAA APT'
      break;
    case name.includes('noaa_dsb'):
      file = 'NOAA DSB'
      break;
    case name.includes('noaa_hrpt'):
      file = 'NOAA HRPT'
      break;
    case name.includes('metop_ahrpt'):
      file = 'METOP aHRPT'
      break;
    case name.includes('meteor_hrpt'):
      file = 'METEOR HRPT'
      break;
    default:
      file = name
      normal = false
      break;
  }
  return (
    <div className={styles.folderCard}>
    <Link href={'/data' + props.link + '/' + props.name}>
      {normal ?
      <div className={styles.folderText}>
        <span>{file}</span>
        <span>{yyddmm + ' ' + time}</span>
      </div>
      :
      <div className={styles.folderText}>
        <span>{file}</span>
        <span><PiWarning /> Unable to get folder information</span>
      </div>
      }
    </Link>
    </div>
  )
}

function BaseFolder(props){
  var files = props.files
  return (
    <div className={styles.folderList}>
      {files.map((file, index) => (
        <FolderList key={index} name={file} link={props.dir} />
      ))}
    </div>
  )
}

function NonBaseFolder(props){
  var dir = props.dir
  var files = props.files
  var type: string
  
  switch(true){
    case dir.includes('goes_hrit'):
      return (
        <GoesHrit dir={dir} />
      )
    // case dir.includes('noaa_hrpt'):
    //   var avhrrChannels = [
    //     '1.png',
    //     '2.png',
    //     '3a.png',
    //     '3b.png',
    //     '4.png',
    //     '4_projected',
    //     '5.png'
    //   ]
    //   // 1 - visible
    //   // 2 - near infrared
    //   // 3a - thermal infrared (3.55 - 3.93 um)
    //   // 3b - thermal infrared (10.3 - 11.3 um)
    //   // 4 - thermal infrared (11.5 - 12.5 um)
    //   // 4_projected - projected

    //   var amsu, avhrr, mhs, sem
    //   fs.existsSync(dir + '/AMSU') ? amsu = true : amsu = false
    //   fs.existsSync(dir + '/AVHRR') ? avhrr = true : avhrr = false
    //   fs.existsSync(dir + '/HIRS') ? mhs = true : mhs = false
    //   fs.existsSync(dir + '/MHS') ? mhs = true : mhs = false
    //   fs.existsSync(dir + '/SEM') ? sem = true : sem = false
    //   return (
    //     <>
    //     <div className={styles.folderList}>
    //       <div className={styles.folder}>
    //         {avhrr && avhrrChannels.map((channel, index) => {
    //           var avhrrDir = fs.readdirSync(dir + '/AVHRR')
    //           var avhrrFilter = avhrrDir.filter(file => file.includes(channel))
    //           return (
    //             <ApiImage key={index} type={'AVHRR'} root={'/AVHRR/'} dir={dir} file={avhrrFilter} channel={channel} />
    //           )
    //         })}
    //       </div>
    //     </div>
    //     </>
    //   )
  }
}


export default function Folder({params}) {
  var dir = '/' + params.folder.join('/').replace('%20', ' ').toString()
  var files = fs.readdirSync(dir || '').reverse()
  // check if dir is part of the base listing
  if (dir === process.env.NEXT_PUBLIC_LIVE_OUTPUT){isBase = true} else {isBase = false}
  return (
    <div className={styles.page}>
      {isBase ?
        <BaseFolder files={files} dir={dir} />
      :
        <NonBaseFolder files={files} dir={dir} />
      }
    </div>
  )
}