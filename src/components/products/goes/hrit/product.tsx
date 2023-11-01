import fs from 'fs'

import { PiWarning } from 'react-icons/pi'

import GoesImage from './image'

import styles from './Product.module.css'

// init directories
var dirG18 = '/IMAGES/GOES-18/Full Disk',
dirG18M1 = '/IMAGES/GOES-18/Mesoscale 1',
dirG18M2 = '/IMAGES/GOES-18/Mesoscale 2',
dirG16 = '/IMAGES/GOES-16/Full Disk',
dirG16M1 = '/IMAGES/GOES-16/Mesoscale 1',
dirG16M2 = '/IMAGES/GOES-16/Mesoscale 2',
dirH9 = '/IMAGES/Himawari-8/Full Disk'

// init goes virtual channels
const channels = [
  {"fsDesig": "_FC_", name: "FC Band", descriptor: "Full Color"},
  {"fsDesig": "_2_", name: "Band 2", descriptor: "Visual"},
  {"fsDesig": "_7_", name: "Band 7", descriptor: "Shortwave Infrared"},
  {"fsDesig": "_8_", name: "Band 8", descriptor: "Mid-Level Tropospheric Water Vapor"},
  {"fsDesig": "_9_", name: "Band 9", descriptor: "Upper-Level Tropospheric Water Vapor"},
  {"fsDesig": "_13_", name: "Band 13", descriptor: "Clean Longwave Infrared"},
  {"fsDesig": "_14_", name: "Band 14", descriptor: "Longwave Infrared"},
  {"fsDesig": "_15_", name: "Band 15", descriptor: "Dirty Longwave Infrared"},
  {"fsDesig": "_16_", name: "Band 16", descriptor: "CO2 Longwave Infrared"},
  {"fsDesig": "_20_", name: "Band 20", descriptor: "Shortwave Window"},
  {"fsDesig": "_21_", name: "Band 21", descriptor: "Mid-Level Tropospheric Water Vapor"},
  {"fsDesig": "_22_", name: "Band 22", descriptor: "Upper-Level Tropospheric Water Vapor"},
  {"fsDesig": "_24_", name: "Band 24", descriptor: "Clean Longwave Infrared"},
  {"fsDesig": "_25_", name: "Band 25", descriptor: "Longwave Infrared"},
  {"fsDesig": "_30_", name: "Band 30", descriptor: "Dirty Longwave Infrared"},
  {"fsDesig": "_32_", name: "Band 32", descriptor: "CO2 Longwave Infrared"},
  {"fsDesig": "_60_", name: "Band 60", descriptor: "Water Vapor"}
]
// init goes nws channels
const nwsChannels = [
  {"fsDesig": "CAR_latest", name: "CAR", descriptor: "Caribbean Surface Analysis"},
  {"fsDesig": "EPAC_latest", name: "EPAC", descriptor: "Eastern Pacific Surface Analysis"},
  {"fsDesig": "pac24_latest", name: "PAC24", descriptor: "24-Hour Atlantic Surface Analysis"},
  {"fsDesig": "pac48_latest", name: "PAC48", descriptor: "48-Hour Atlantic Surface Analysis"},
  {"fsDesig": "pac48per_latest", name: "PAC48PER", descriptor: "48-Hour Wave Period Forecast"},
  {"fsDesig": "pacsea_latest", name: "PACSEA", descriptor: "Sea State Analysis"},
  {"fsDesig": "pacsfc24_latest", name: "PACSFC24", descriptor: "24-Hour Pacific Surface Forecast"},
  {"fsDesig": "pacsfc48_latest", name: "PACSFC48", descriptor: "48-Hour Pacific Surface Forecast"},
  {"fsDesig": "pacsfc72_latest", name: "PACSFC72", descriptor: "72-Hour Pacific Surface Forecast"},
  {"fsDesig": "danger_atl_latest", name: "DANGER ATL", descriptor: "Atlantic Warnings"},
  {"fsDesig": "danger_pac_latest", name: "DANGER PAC", descriptor: "Pacific Warnings"}
]
// epac - east pacific surface analysis
// car - caribbean surface analysis
// pac24 - 24 hour wind/wave forecast
// pac48 - 48 hour wind/wave forecast
// pac48per - 48 hour wave period forecast
// pacsea - sea state analysis
// pacsfc24 - 24hr pacific surface forecast
// pacsfc48 - 48hr pacific surface forecast
// pacsfc72 - 72hr pacific surface forecast
// danger_atl - atlantic warnings
// danger_pac - east pacific warnings

export default function GoesHrit(props) {
  const dir = props.dir

  if (fs.existsSync(dir + '/Admin Messages')) {
    var adminMessageDir = fs.readdirSync(dir + '/Admin Messages') || ''
    var adminMessage = fs.readFileSync(dir + '/Admin Messages/' + adminMessageDir[0], 'utf8')
  } else {
    var adminMessage = 'No Admin Message'
  }

  var goes18 = fs.existsSync(dir + dirG18), 
  goes18Ms1 = fs.existsSync(dir + dirG18M1), 
  goes18Ms2 = fs.existsSync(dir + dirG18M2), 
  goes16 = fs.existsSync(dir + dirG16), 
  goes16Ms1 = fs.existsSync(dir + dirG16M1), 
  goes16Ms2 = fs.existsSync(dir + dirG16M2), 
  him9 = fs.existsSync(dir + dirH9), 
  nws = fs.existsSync(dir + '/IMAGES/NWS')

  return (
    <div>
      <span className={styles.title}>GOES HRIT</span>
      <div className={styles.adminMessage}>
        <span>Admin Message</span>
        <pre><PiWarning /> {adminMessage}</pre>
      </div>
      <div className={styles.folderList}>
        {goes18 || goes16 || him9 ?
        <div id="full disk" className={styles.folder}>
          <span className={styles.folderTitle}>Full Disk</span>
          <div className={styles.product}>
            {goes18 && channels.map((channel, index) => {
              var files = fs.readdirSync(dir + dirG18).filter(file => file.includes(channel.fsDesig) && !file.includes('.gif'))
              return (
                <GoesImage
                  key={index}
                  sat='G18'
                  name={channel.name}
                  channel={channel.fsDesig}
                  meso={false}
                  descriptor={channel.descriptor}
                  files={files}
                  gif={true}
                  dir={dir + dirG18}
                />
              )
            })}
            {goes16 && channels.map((channel, index) => {
              var files = fs.readdirSync(dir + dirG16).filter(file => file.includes(channel.fsDesig) && !file.includes('.gif'))
              return (
                <GoesImage
                  key={index}
                  sat='G16'
                  name={channel.name}
                  channel={channel.fsDesig}
                  meso={false}
                  descriptor={channel.descriptor}
                  files={files}
                  gif={true}
                  dir={dir + dirG16}
                />
              )
            })}
            {him9 && channels.map((channel, index) => {
              var files = fs.readdirSync(dir + dirH9).filter(file => file.includes(channel.fsDesig) && !file.includes('.gif'))
              return (
                <GoesImage
                  key={index}
                  sat='Himawari 9'
                  name={channel.name}
                  channel={channel.fsDesig}
                  meso={false}
                  descriptor={channel.descriptor}
                  files={files}
                  gif={true}
                  dir={dir + dirH9}
                />
              )
            })}
          </div>
        </div>
        : null}
        {goes18Ms1 || goes18Ms2 || goes16Ms1 || goes16Ms2 ?
        <div id='mesoscale' className={styles.folder}>
          <span className={styles.folderTitle}>Mesoscale</span>
          <div className={styles.product}>
            {goes18Ms1 && channels.map((channel, index) => {
              var files = fs.readdirSync(dir + '/IMAGES/GOES-18/Mesoscale 1').filter(file => file.includes(channel.fsDesig) && !file.includes('.gif'))
              return (
                <GoesImage
                  key={index}
                  sat='G18'
                  name={channel.name}
                  channel={channel.fsDesig}
                  meso='Mesoscale 1'
                  descriptor={channel.descriptor}
                  files={files}
                  gif={true}
                  dir={dir + dirG18M1}
                />
              )
            })}
            {goes18Ms2 && channels.map((channel, index) => {
              var files = fs.readdirSync(dir + dirG18M2).filter(file => file.includes(channel.fsDesig) && !file.includes('.gif'))
              return (
                <GoesImage
                  key={index}
                  sat='G18'
                  name={channel.name}
                  channel={channel.fsDesig}
                  meso='Mesoscale 2'
                  descriptor={channel.descriptor}
                  files={files}
                  gif={true}
                  dir={dir + dirG18M2}
                />
              )
            })}
            {goes16Ms1 && channels.map((channel, index) => {
              var files = fs.readdirSync(dir + dirG16M1).filter(file => file.includes(channel.fsDesig) && !file.includes('.gif'))
              return (
                <GoesImage
                  key={index}
                  sat='G16'
                  name={channel.name}
                  channel={channel.fsDesig}
                  meso='Mesoscale 1'
                  descriptor={channel.descriptor}
                  files={files}
                  gif={true}
                  dir={dir + dirG16M1}
                />
              )
            })}
            {goes16Ms2 && channels.map((channel, index) => {
              var files = fs.readdirSync(dir + dirG16M2).filter(file => file.includes(channel.fsDesig) && !file.includes('.gif'))
              return (
                <GoesImage
                  key={index}
                  sat='G16'
                  name={channel.name}
                  channel={channel.fsDesig}
                  meso='Mesoscale 2'
                  descriptor={channel.descriptor}
                  files={files}
                  gif={true}
                  dir={dir + dirG16M2}
                />
              )
            })}
          </div>
        </div>
        : null}
        {nws ?
        <div id='nws' className={styles.folder}>
          <span className={styles.folderTitle}>NWS</span>
          <div className={styles.product}>
            {nws && nwsChannels.map((channel, index) => {
              var files = fs.readdirSync(dir + '/IMAGES/NWS').filter(file => file.includes(channel.fsDesig))
              return (
                <GoesImage
                  key={index}
                  sat='NWS'
                  name={channel.name}
                  meso={false}
                  descriptor={channel.descriptor}
                  files={files}
                  gif={false}
                  dir={dir + '/IMAGES/NWS'}
                />
              )
            })}
          </div>
        </div>
        : null}
      </div>
    </div>
  )
}