const { abs, floor, min, sin, PI } = Math

const ratioWidthHeight = abs(sin(PI / 3))
const ratioHeightWidth = 1 / ratioWidthHeight

export type Dimensions = {
  width: number
  height: number
}

export type Axes = {
  horizontal: number
  vertical: number
}

export type MapStyle = 'Sector' | 'Wilderness'

export const isMapStyle = (arg: unknown): arg is MapStyle => {
  return arg === 'Sector' || arg === 'Wilderness'
}

export type State = {
  mapStyle: MapStyle
  mapSize: Dimensions
  screenSize: Dimensions
  margins: Axes
  usableSize: Dimensions
  renderSize: Dimensions
  offsets: Axes
  dynamicUnitSize: number
  unit: number
  rowHeight: number
  radiusFactor: number
  isInverted: boolean
  isStaticUnits: boolean
  staticUnitSize: number
}

const getScreenSize = () => {
  return {
    width: window.innerWidth * 2,
    height: window.innerHeight * 2
  }
}

const getUsableSize = (screenSize: Dimensions, margins: Axes) => {
  return {
    width: screenSize.width - margins.horizontal * 2,
    height: screenSize.height - margins.vertical * 2
  }
}

const getDynamicHorizontalUnits = (mapSize: Dimensions) => {
  return (
    floor(mapSize.width / 2) * 3 +
    (mapSize.width % 2 === 0 ? 0 : 2) + // Add 2 if widthMap is odd
    (mapSize.width % 2 === 0 ? 0.5 : 0) // Add 0.5 if widthMap is even
  )
}

const getDynamicHorizontalUnitSize = (width: number, units: number) => {
  return width / units
}

const getDynamicVerticalRows = (mapSize: Dimensions) => {
  return mapSize.height * 2 + (mapSize.width > 1 ? 1 : 0)
}

const getDynamicVerticalUnitSize = (height: number, rows: number) => {
  return (height / rows) * ratioHeightWidth
}

type PartialState = Pick<
  State,
  | 'mapStyle'
  | 'screenSize'
  | 'mapSize'
  | 'margins'
  | 'radiusFactor'
  | 'isInverted'
  | 'isStaticUnits'
  | 'staticUnitSize'
>

const getFullState = (partialState: PartialState): State => {
  const { screenSize, mapSize, margins, isStaticUnits, staticUnitSize } =
    partialState

  const usableSize = getUsableSize(screenSize, margins)

  const dynamicHorizontalUnits = getDynamicHorizontalUnits(mapSize)
  const dynamicHorizontalUnitSize = getDynamicHorizontalUnitSize(
    usableSize.width,
    dynamicHorizontalUnits
  )

  const dynamicVerticalRows = getDynamicVerticalRows(mapSize)
  const dynamicVerticalUnitSize = getDynamicVerticalUnitSize(
    usableSize.height,
    dynamicVerticalRows
  )

  const dynamicUnitSize = min(
    dynamicHorizontalUnitSize,
    dynamicVerticalUnitSize
  )

  const unit = isStaticUnits ? staticUnitSize : dynamicUnitSize

  const rowHeight = ratioWidthHeight * unit

  const renderSize = {
    width: unit * dynamicHorizontalUnits,
    height: rowHeight * dynamicVerticalRows
  }

  const offsets = {
    horizontal: (usableSize.width - renderSize.width) / 2,
    vertical: (usableSize.height - renderSize.height) / 2
  }

  return {
    ...partialState,
    usableSize,
    renderSize,
    offsets,
    dynamicUnitSize,
    rowHeight,
    unit
  }
}

export const getInitialState = () => {
  const defaultMapStyle = 'Sector'

  const defaultMapSize = {
    width: 8,
    height: 5
  }

  const defaultMargins = {
    horizontal: 100,
    vertical: 100
  }

  const defaultRadiusFactor = 0.9

  const defaultInversion = false

  const defaultStaticUnits = false
  const defaultStaticUnitSize = 150

  const screenSize = getScreenSize()

  const initialState = getFullState({
    mapStyle: defaultMapStyle,
    screenSize,
    mapSize: defaultMapSize,
    margins: defaultMargins,
    radiusFactor: defaultRadiusFactor,
    isInverted: defaultInversion,
    isStaticUnits: defaultStaticUnits,
    staticUnitSize: defaultStaticUnitSize
  })

  return initialState
}

export const updateScreenSize = () => {
  return {
    type: 'UPDATE_SCREEN_SIZE'
  } as const
}

export const updateMargins = (margins: Axes) => {
  return {
    type: 'UPDATE_MARGINS',
    margins
  } as const
}

export const updateMapSize = (mapSize: Dimensions) => {
  return {
    type: 'UPDATE_MAPSIZE',
    mapSize
  } as const
}

export const updateRadiusFactor = (radiusFactor: number) => {
  return {
    type: 'UPDATE_RADIUS_FACTOR',
    radiusFactor
  } as const
}

export const setMapStyle = (mapStyle: MapStyle) => {
  return {
    type: 'SET_MAP_STYLE',
    mapStyle
  } as const
}

export const toggleInversion = () => {
  return {
    type: 'TOGGLE_INVERSION'
  } as const
}

export const useStaticUnits = (isStaticUnits: boolean) => {
  return {
    type: 'USE_STATIC_UNITS',
    isStaticUnits
  } as const
}

export const setStaticUnitSize = (staticUnitSize: number) => {
  return {
    type: 'SET_STATIC_UNIT_SIZE',
    staticUnitSize
  } as const
}

export type Action =
  | ReturnType<typeof updateScreenSize>
  | ReturnType<typeof updateMargins>
  | ReturnType<typeof updateMapSize>
  | ReturnType<typeof updateRadiusFactor>
  | ReturnType<typeof setMapStyle>
  | ReturnType<typeof toggleInversion>
  | ReturnType<typeof useStaticUnits>
  | ReturnType<typeof setStaticUnitSize>

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'UPDATE_SCREEN_SIZE':
      if (
        getScreenSize().width < state.margins.horizontal * 2 ||
        getScreenSize().height < state.margins.vertical * 2
      )
        return state

      return getFullState({ ...state, screenSize: getScreenSize() })
    case 'UPDATE_MARGINS':
      return getFullState({ ...state, margins: action.margins })
    case 'UPDATE_MAPSIZE':
      return getFullState({ ...state, mapSize: action.mapSize })
    case 'UPDATE_RADIUS_FACTOR':
      return getFullState({ ...state, radiusFactor: action.radiusFactor })
    case 'SET_MAP_STYLE':
      return getFullState({ ...state, mapStyle: action.mapStyle })
    case 'TOGGLE_INVERSION':
      return getFullState({ ...state, isInverted: !state.isInverted })
    case 'USE_STATIC_UNITS':
      return getFullState({ ...state, isStaticUnits: action.isStaticUnits })
    case 'SET_STATIC_UNIT_SIZE':
      return getFullState({ ...state, staticUnitSize: action.staticUnitSize })
  }
}
