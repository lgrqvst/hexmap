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
  unit: number
  rowHeight: number
  radiusFactor: number
  isInverted: boolean
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

const getFullState = (
  mapStyle: MapStyle,
  screenSize: Dimensions,
  mapSize: Dimensions,
  margins: Axes,
  radiusFactor: number,
  isInverted: boolean
): State => {
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

  const unit = min(dynamicHorizontalUnitSize, dynamicVerticalUnitSize)

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
    mapStyle,
    mapSize,
    screenSize,
    margins,
    usableSize,
    renderSize,
    offsets,
    unit,
    rowHeight,
    radiusFactor,
    isInverted
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

  const screenSize = getScreenSize()

  const initialState = getFullState(
    defaultMapStyle,
    screenSize,
    defaultMapSize,
    defaultMargins,
    defaultRadiusFactor,
    defaultInversion
  )

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

export type Action =
  | ReturnType<typeof updateScreenSize>
  | ReturnType<typeof updateMargins>
  | ReturnType<typeof updateMapSize>
  | ReturnType<typeof updateRadiusFactor>
  | ReturnType<typeof setMapStyle>
  | ReturnType<typeof toggleInversion>

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'UPDATE_SCREEN_SIZE':
      if (
        getScreenSize().width < state.margins.horizontal * 2 ||
        getScreenSize().height < state.margins.vertical * 2
      )
        return state

      return getFullState(
        state.mapStyle,
        getScreenSize(),
        state.mapSize,
        state.margins,
        state.radiusFactor,
        state.isInverted
      )
      break
    case 'UPDATE_MARGINS':
      return getFullState(
        state.mapStyle,
        state.screenSize,
        state.mapSize,
        action.margins,
        state.radiusFactor,
        state.isInverted
      )
      break
    case 'UPDATE_MAPSIZE':
      return getFullState(
        state.mapStyle,
        state.screenSize,
        action.mapSize,
        state.margins,
        state.radiusFactor,
        state.isInverted
      )
      break
    case 'UPDATE_RADIUS_FACTOR':
      return getFullState(
        state.mapStyle,
        state.screenSize,
        state.mapSize,
        state.margins,
        action.radiusFactor,
        state.isInverted
      )
    case 'SET_MAP_STYLE':
      return getFullState(
        action.mapStyle,
        state.screenSize,
        state.mapSize,
        state.margins,
        state.radiusFactor,
        state.isInverted
      )
    case 'TOGGLE_INVERSION':
      return getFullState(
        state.mapStyle,
        state.screenSize,
        state.mapSize,
        state.margins,
        state.radiusFactor,
        !state.isInverted
      )
  }
}
