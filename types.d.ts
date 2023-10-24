declare module '*.vue' {
  import { ComponentOptions } from 'vue'
  const componentOptions: ComponentOptions
  export default componentOptions
}

declare module '*.jpg' {
  const value: any;
  export default value;
}

declare module '*.png' {
  const value: any;
  export default value;
}
