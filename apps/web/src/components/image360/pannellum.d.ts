interface PannellumPropType {
  width?: string;
  height?: string;
  image?: string;
  haov?: number;
  vaov?: number;
  vOffsect?: number;
  yaw?: number;
  pitch?: number;
  hfov?: number;
  maxHfov?: number;
  minHfov?: number;
  maxPitch?: number;
  minPitch?: number;
  maxYaw?: number;
  minYaw?: number;
  autoRotate?: number;
  compass?: boolean;
  title?: string;
  author?: string;
  preview?: string;
  previewTitle?: string;
  previewAuthor?: string;
  autoLoad?: boolean;
  orientationOnByDefault?: boolean;
  showZoomCtrl?: boolean;
  keyboardZoom?: boolean;
  disableKeyboardCtrl?: boolean;
  mouseZoom?: boolean;
  draggable?: boolean;
  showFullscreenCtrl?: boolean;
  showControls?: boolean;
  onLoad?: () => void;
  onRender?: () => void;
  onError?: () => void;
  onErrorcleared?: () => void;
  onMousedown?: () => void;
  onMouseup?: () => void;
  onTouchstart?: () => void;
  onTouchend?: () => void;
  hotspotDebug?: boolean;
  children?: React.ReactNode;
}

function Pannellum(props: PannellumPropType): JSX.Element;

interface PannellumVideoPropType {
  video?: string;
  loop?: boolean;
  autoplay?: boolean;
  controls?: boolean;
  muted?: boolean;

  width?: string;
  height?: string;
  video?: string;
  yaw?: number;
  pitch?: number;
  hfov?: number;
  maxHfov?: number;
  minHfov?: number;
  maxPitch?: number;
  minPitch?: number;
  maxYaw?: number;
  minYaw?: number;
  autoRotate?: number;
  mouseZoom?: boolean;
  hotspotDebug?: boolean;

  children?: React.ReactNode;
}

function PannellumVideo(props: PannellumVideoPropType): JSX.Element;

interface PannellumHotspotPropType {
  type: 'info';
  pitch?: number;
  yaw?: number;
  text?: string;
  URL?: string;
}
interface PannellumHotspotCustomPropType {
  type: 'custom';
  pitch?: number;
  yaw?: number;
  tooltip?: () => void;
  tooltipArg?: object;
  handleClick?: () => void;
  handleClickArg?: object;
  cssClass?: string;
}

declare module 'pannellum-react/es/elements/Pannellum' {
  export default Pannellum;
  export { Pannellum, PannellumVideo };
}
