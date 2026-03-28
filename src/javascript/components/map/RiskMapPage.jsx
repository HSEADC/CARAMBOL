import React, { useState, useEffect, useRef } from 'react'
import RiskMapSidebar from './RiskMapSidebar'
import riskPoints from '../../data/riskPoints.json'

const RiskMapPage = () => {
  const [showTooltip, setShowTooltip] = useState(true)
  const [activeFilters, setActiveFilters] = useState([])
  const mapRef = useRef(null)
  const placemarks = useRef([])

  useEffect(() => {
    const initMap = () => {
      if (window.ymaps && !mapRef.current) {
        window.ymaps.ready(() => {
          const map = new window.ymaps.Map('yandex-map', {
            center: [55.751574, 37.573856],
            zoom: 10,
            controls: []
          })

          mapRef.current = map
          createPlacemarks(map, riskPoints)
        })
      }
    }

    if (window.ymaps) {
      initMap()
    } else {
      const checkYmaps = setInterval(() => {
        if (window.ymaps) {
          clearInterval(checkYmaps)
          initMap()
        }
      }, 100)

      return () => clearInterval(checkYmaps)
    }
  }, [])

  useEffect(() => {
    if (mapRef.current && placemarks.current.length > 0) {
      filterPlacemarks()
    }
  }, [activeFilters])

  const createPlacemarks = (map, points) => {
    points.forEach((point) => {
      const placemark = new window.ymaps.Placemark(
        point.coordinates,
        {
          balloonContent: point.name
        },
        {
          preset: 'islands#orangeDotIcon'
        }
      )

      placemark.properties.set('types', point.types)
      map.geoObjects.add(placemark)
      placemarks.current.push(placemark)
    })
  }

  const filterPlacemarks = () => {
    placemarks.current.forEach((placemark) => {
      const types = placemark.properties.get('types')

      if (activeFilters.length === 0) {
        placemark.options.set('visible', true)
      } else {
        const isVisible = activeFilters.some((filter) => types.includes(filter))
        placemark.options.set('visible', isVisible)
      }
    })
  }

  const handleFilterChange = (filters) => {
    setActiveFilters(filters)
  }

  return (
    <div className="O_riskMapPage">
      <RiskMapSidebar onFilterChange={handleFilterChange} />

      <div className="W_mapContainer">
        <div className="W_mapWrapper" id="yandex-map"></div>

        {showTooltip && (
          <>
            <div
              className="W_tooltipOverlay"
              onClick={() => setShowTooltip(false)}
            />
            <div className="W_shareTooltip">
              <div className="W_tooltipContent">
                <div className="A_shareIcon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="55"
                    height="70"
                    viewBox="0 0 55 70"
                    fill="none"
                  >
                    <path
                      d="M27.5 45.5363C29.2112 45.5363 30.5622 44.1436 30.5622 42.5087V12.4438L30.3221 7.9628L32.0633 10.2336L35.9962 14.4723C36.5366 15.0779 37.2871 15.3806 38.0377 15.3806C39.5087 15.3806 40.7396 14.2907 40.7396 12.7465C40.7396 11.9593 40.4394 11.3538 39.899 10.8088L29.8717 1.08997C29.0611 0.302768 28.3106 0 27.5 0C26.6894 0 25.9088 0.302768 25.1283 1.08997L15.101 10.8088C14.5306 11.3538 14.2303 11.9593 14.2303 12.7465C14.2303 14.2907 15.4612 15.3806 16.9323 15.3806C17.6829 15.3806 18.4634 15.0779 18.9738 14.4723L22.9367 10.2336L24.6779 7.9628L24.4078 12.4438V42.5087C24.4078 44.1436 25.7888 45.5363 27.5 45.5363ZM10.1774 70H44.8226C51.4874 70 55 66.4576 55 59.827V30.3374C55 23.7067 51.4874 20.1644 44.8226 20.1644H36.8668V26.9161H44.2522C46.8641 26.9161 48.3051 28.2785 48.3051 31.0337V59.1306C48.3051 61.9161 46.8641 63.2483 44.2522 63.2483H10.7478C8.1059 63.2483 6.69487 61.9161 6.69487 59.1306V31.0337C6.69487 28.2785 8.1059 26.9161 10.7478 26.9161H18.2233V20.1644H10.1774C3.54258 20.1644 0 23.7067 0 30.3374V59.827C0 66.4879 3.54258 70 10.1774 70Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <p className="A_tooltipText">
                  На этой карте ты можешь увидеть активность аллергенов и
                  опасных растений и поделиться их локацией с друзьями
                </p>
                <div className="W_tooltipHeader">
                  <button
                    className="A_closeTooltip"
                    onClick={() => setShowTooltip(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12.5 25C19.4036 25 25 19.4034 25 12.5C25 5.59656 19.4036 0 12.5 0C5.59643 0 0 5.59656 0 12.5C0 19.4034 5.59643 25 12.5 25ZM18.0378 6.96232C18.4972 7.42152 18.4972 8.1665 18.0378 8.62606L14.1638 12.5L18.0378 16.3739C18.4972 16.8335 18.4972 17.5785 18.0378 18.0377C17.5783 18.4972 16.8335 18.4972 16.374 18.0377L12.5 14.1637L8.62602 18.0377C8.16659 18.4972 7.4217 18.4972 6.96223 18.0377C6.5028 17.5785 6.5028 16.8335 6.96223 16.3739L10.8362 12.5L6.96223 8.62606C6.5028 8.1665 6.5028 7.42152 6.96223 6.96232C7.42165 6.50276 8.16655 6.50276 8.62602 6.96232L12.5 10.8363L16.374 6.96232C16.8335 6.50276 17.5783 6.50276 18.0378 6.96232Z"
                        fill="white"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <p className="A_disclaimer A_disclaimerMobile">
        Карта аллергенных зон может быть неточной — проверьте дату обновления и
        уровень точности; при сомнениях избегайте зоны и сообщите о проблеме,
        загрузив фото или отчёт.
      </p>
    </div>
  )
}

export default RiskMapPage
