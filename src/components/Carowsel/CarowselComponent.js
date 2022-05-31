import React, { useRef } from 'react'
import { View } from 'react-native'
import { carouselItems, windowWidth } from '../../Constants'
import Carousel from 'react-native-snap-carousel'
import MenuItem from '../MenuItem/MenuItem'
import styles from './styles'

const CarouselComponent = ({ activeIndex, setActiveIndex }) => {
  const carousel = useRef()

  const renderCarouselItem = ({ item, index }) => {
    return (
      <MenuItem
        item={item}
        index={index}
        activeIndex={activeIndex}
        carousel={carousel.current}
      />
    )
  }

  return (
    <View style={styles.container}>
      <Carousel
        ref={carousel}
        firstItem={1}
        activeSlideOffset={0}
        swipeThreshold={0}
        callbackOffsetMargin={20}
        data={carouselItems}
        sliderWidth={windowWidth > 480 ? windowWidth * 0.75 : windowWidth}
        itemWidth={windowWidth > 480 ? windowWidth * 0.25 : windowWidth / 3}
        sliderHeight={60}
        itemHeight={60}
        renderItem={renderCarouselItem}
        onSnapToItem={(index) => setActiveIndex(index)}
      />
    </View>
  )
}

export default CarouselComponent
