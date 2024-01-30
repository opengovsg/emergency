import { type PluginFunc } from 'dayjs'

const plugin: PluginFunc = (_option, dayjsClass, _dayjsFactory) => {
  dayjsClass.prototype.toLocalDateOnly = function (): Date {
    return new Date(this.format('YYYY-MM-DD'))
  }
  dayjsClass.prototype.toLocalDateOnlyString = function (): string {
    return this.format('YYYY-MM-DD')
  }
}

declare module 'dayjs' {
  interface Dayjs {
    toLocalDateOnly(): Date
    toLocalDateOnlyString(): string
  }
}

export default plugin
