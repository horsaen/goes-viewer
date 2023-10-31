'use client'
import { useState } from 'react'
import Image from 'next/image'

import ImageLoader from '@/lib/ImageLoader'
import PostGif from '@/lib/PostGif'

import { BsFiletypeGif, BsFillFileEarmarkImageFill } from 'react-icons/bs'
import { PiWarning } from 'react-icons/pi'

import styles from './Image.module.css'

export default function GoesImage(props) {
  var sat = props.sat, meso = props.meso, band = props.name, channel = props.channel, descriptor = props.descriptor,
  imgArray = props.files, gif = props.gif

  const [image, setImage] = useState(imgArray.length - 1)
  const [isGif, setIsGif] = useState(false)

  var imageString = imgArray[0] && imgArray[image]
  var dateSubstring = imageString && imageString.split(channel).pop().slice(0, -4)
  var year = dateSubstring && dateSubstring.slice(0, 4)
  var month = dateSubstring && dateSubstring.slice(4, 6)
  var day = dateSubstring && dateSubstring.slice(6, 8)
  var hour = dateSubstring && dateSubstring.slice(9, 11)
  var minute = dateSubstring && dateSubstring.slice(11, 13)
  const date = new Date(Date.UTC(year, month - 1, day, hour, minute));
  var formattedDate = date.toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'});
  
  return (
    <>
      {imgArray[0] ?
      <>
      {isGif ?
        <div className={styles.imageContainer}>
        <div className={styles.imageTitleContainer}>
          <span>{`${band} | ${sat}`}</span>
          <span>{meso}</span>
          <span>{descriptor}</span>
        </div>
        <Image priority={true} loader={ImageLoader} src={props.dir + '/' +  props.channel + 'gif.gif'} alt='image' width={500} height={500} />
        <div>
          <button className={styles.gif2Img} onClick={() => setIsGif(false)}><BsFillFileEarmarkImageFill /></button>
        </div>
      </div>
      :
        <div className={styles.imageContainer}>
          <div className={styles.imageTitleContainer}>
            <span>{`${band} | ${sat}`}</span>
            <span>{meso}</span>
            <span>{descriptor}</span>
          </div>
          {props.sat == 'NWS' ? 
            <Image priority={true} loader={ImageLoader} src={props.dir + '/' + imgArray[image]} alt='image' width={590} height={360} />
          : 
            <Image priority={true} loader={ImageLoader} src={props.dir + '/' + imgArray[image]} alt='image' width={500} height={500} />
          }
          <div className={styles.imageControlContainer}>
            <div className={styles.imageControl}>
              <span>{`${image + 1 + '/' + imgArray.length} | ${formattedDate}`}</span>
              <div className={styles.controlButtons}>
                <button onClick={() => setImage(0)} disabled={image === 0}>{`<<`}</button>
                <button onClick={() => setImage(image - 1)} disabled={image === 0}>Prev</button>
                <button onClick={() => setImage(image + 1)} disabled={image === imgArray.length - 1}>Next</button>
                <button onClick={() => setImage(imgArray.length - 1)} disabled={image === imgArray.length - 1}>{`>>`}</button>
              </div>
            </div>
            {gif ? 
              <button className={styles.gifButton} onClick={async () => {
                var gif = await PostGif(props.dir, imgArray, props.channel, props.sat)
                if (gif) {
                  setIsGif(true)
                }
              }}><BsFiletypeGif /></button>
            : null }
          </div>
        </div>
      }
      </>
      : null }
    </>
  )
}