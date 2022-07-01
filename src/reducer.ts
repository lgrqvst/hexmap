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

export type State = {
  mapSize: Dimensions
  screenSize: Dimensions
  margins: Axes
  usableSize: Dimensions
  renderSize: Dimensions
  offsets: Axes
  unit: number
  rowHeight: number
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
  screenSize: Dimensions,
  mapSize: Dimensions,
  margins: Axes
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
    mapSize,
    screenSize,
    margins,
    usableSize,
    renderSize,
    offsets,
    unit,
    rowHeight
  }
}

export const getInitialState = () => {
  const defaultMapSize = {
    width: 5,
    height: 3
  }

  const defaultMargins = {
    horizontal: 100,
    vertical: 100
  }

  const screenSize = getScreenSize()

  const initialState = getFullState(screenSize, defaultMapSize, defaultMargins)

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

type Action =
  | ReturnType<typeof updateScreenSize>
  | ReturnType<typeof updateMargins>
  | ReturnType<typeof updateMapSize>

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'UPDATE_SCREEN_SIZE':
      if (
        getScreenSize().width < state.margins.horizontal * 2 ||
        getScreenSize().height < state.margins.vertical * 2
      )
        return state

      return getFullState(getScreenSize(), state.mapSize, state.margins)
      break
    case 'UPDATE_MARGINS':
      return getFullState(state.screenSize, state.mapSize, action.margins)
      break
    case 'UPDATE_MAPSIZE':
      return getFullState(state.screenSize, action.mapSize, state.margins)
      break
  }
}
