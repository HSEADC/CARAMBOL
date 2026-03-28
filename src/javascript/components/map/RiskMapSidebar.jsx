import React, { useState, useEffect } from 'react'

const RiskMapSidebar = ({ onFilterChange }) => {
  const [riskTypes, setRiskTypes] = useState({
    toxic: false,
    contact: false,
    seasonal: false,
    poisonous: false,
    catDanger: false,
    dogDanger: false
  })

  const [phases, setPhases] = useState({
    flowering: false,
    fruiting: false,
    springActive: false,
    summerActive: false,
    fallActive: false
  })

  const [zones, setZones] = useState({
    home: false,
    yard: false,
    city: false,
    forest: false
  })

  const [expandedSections, setExpandedSections] = useState({
    riskTypes: false,
    phases: false,
    zones: false
  })

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    })
  }

  const toggleRiskType = (type) => {
    setRiskTypes({ ...riskTypes, [type]: !riskTypes[type] })
  }

  const togglePhase = (phase) => {
    setPhases({ ...phases, [phase]: !phases[phase] })
  }

  const toggleZone = (zone) => {
    setZones({ ...zones, [zone]: !zones[zone] })
  }

  useEffect(() => {
    const activeFilters = [
      ...Object.keys(riskTypes).filter((key) => riskTypes[key]),
      ...Object.keys(phases).filter((key) => phases[key]),
      ...Object.keys(zones).filter((key) => zones[key])
    ]

    if (onFilterChange) {
      onFilterChange(activeFilters)
    }
  }, [riskTypes, phases, zones])

  return (
    <div className="O_riskMapSidebar">
      <div className="W_sidebarHeader">
        <h1>Карта рисков</h1>
        <p className="A_cityName">г. Москва</p>
      </div>

      <div className="W_filterSection">
        <div
          className="W_filterSectionHeader"
          onClick={() => toggleSection('riskTypes')}
        >
          <p>Тип риска</p>
          <span className="A_toggleIcon">{expandedSections.riskTypes ? '−' : '+'}</span>
        </div>
        <div className={`W_filterButtons ${expandedSections.riskTypes ? 'W_filterButtonsExpanded' : ''}`}>
          <button
            className={`A_filterButton ${riskTypes.toxic ? 'A_filterButtonActive' : ''}`}
            onClick={() => toggleRiskType('toxic')}
          >
            #Токсичные растения
          </button>
          <button
            className={`A_filterButton ${riskTypes.contact ? 'A_filterButtonActive' : ''}`}
            onClick={() => toggleRiskType('contact')}
          >
            #Контактно-опасные растения
          </button>
          <button
            className={`A_filterButton ${riskTypes.seasonal ? 'A_filterButtonActive' : ''}`}
            onClick={() => toggleRiskType('seasonal')}
          >
            #Сезонные аллергены
          </button>
          <button
            className={`A_filterButton ${riskTypes.poisonous ? 'A_filterButtonActive' : ''}`}
            onClick={() => toggleRiskType('poisonous')}
          >
            #Ядовитые дикие растения
          </button>
          <button
            className={`A_filterButton ${riskTypes.catDanger ? 'A_filterButtonActive' : ''}`}
            onClick={() => toggleRiskType('catDanger')}
          >
            #Опасные для кошек
          </button>
          <button
            className={`A_filterButton ${riskTypes.dogDanger ? 'A_filterButtonActive' : ''}`}
            onClick={() => toggleRiskType('dogDanger')}
          >
            #Опасные для собак
          </button>
        </div>
      </div>

      <div className="W_filterSection">
        <div
          className="W_filterSectionHeader"
          onClick={() => toggleSection('phases')}
        >
          <p>Фаза активности</p>
          <span className="A_toggleIcon">{expandedSections.phases ? '−' : '+'}</span>
        </div>
        <div className={`W_filterButtons ${expandedSections.phases ? 'W_filterButtonsExpanded' : ''}`}>
          <button
            className={`A_filterButton ${phases.flowering ? 'A_filterButtonActive' : ''}`}
            onClick={() => togglePhase('flowering')}
          >
            #Сейчас цветёт
          </button>
          <button
            className={`A_filterButton ${phases.fruiting ? 'A_filterButtonActive' : ''}`}
            onClick={() => togglePhase('fruiting')}
          >
            #Период плодоношения
          </button>
          <button
            className={`A_filterButton ${phases.springActive ? 'A_filterButtonActive' : ''}`}
            onClick={() => togglePhase('springActive')}
          >
            #Активно весной
          </button>
          <button
            className={`A_filterButton ${phases.summerActive ? 'A_filterButtonActive' : ''}`}
            onClick={() => togglePhase('summerActive')}
          >
            #Активно летом
          </button>
          <button
            className={`A_filterButton ${phases.fallActive ? 'A_filterButtonActive' : ''}`}
            onClick={() => togglePhase('fallActive')}
          >
            #Активно осенью
          </button>
        </div>
      </div>

      <div className="W_filterSection">
        <div
          className="W_filterSectionHeader"
          onClick={() => toggleSection('zones')}
        >
          <p>Зона активности</p>
          <span className="A_toggleIcon">{expandedSections.zones ? '−' : '+'}</span>
        </div>
        <div className={`W_filterButtons ${expandedSections.zones ? 'W_filterButtonsExpanded' : ''}`}>
          <button
            className={`A_filterButton ${zones.home ? 'A_filterButtonActive' : ''}`}
            onClick={() => toggleZone('home')}
          >
            #Комната/дом
          </button>
          <button
            className={`A_filterButton ${zones.yard ? 'A_filterButtonActive' : ''}`}
            onClick={() => toggleZone('yard')}
          >
            #Во дворе
          </button>
          <button
            className={`A_filterButton ${zones.city ? 'A_filterButtonActive' : ''}`}
            onClick={() => toggleZone('city')}
          >
            #Город
          </button>
          <button
            className={`A_filterButton ${zones.forest ? 'A_filterButtonActive' : ''}`}
            onClick={() => toggleZone('forest')}
          >
            #Лес
          </button>
        </div>
      </div>

      <p className="A_disclaimer">
        Карта аллергенных зон может быть неточной — проверьте дату обновления и
        уровень точности; при сомнениях избегайте зоны и сообщите о проблеме,
        загрузив фото или отчёт.
      </p>
    </div>
  )
}

export default RiskMapSidebar
