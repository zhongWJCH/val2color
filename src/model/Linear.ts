import {LinearConfig} from '../types'
import {lerp} from 'zrender/lib/tool/color'
import LRU from 'zrender/lib/core/LRU'
import {minMaxNormalization} from '../utils';

export class Linear {
  protected readonly DefaultConfig: LinearConfig = {
    min: 0,
    max: 100,
    colorList: ['rgb(0,0,0)', 'rgb(255,255,255)']
  }
  config: LinearConfig
  linearLRUCache: LRU<string>

  constructor(config?: LinearConfig) {
    if (!config.min) console.warn('min value will be default 1')
    if (!config.max) console.warn('max value will be default 100')
    if (!config.colorList) console.warn('color will be calculated from rgb(0,0,0) to rgb(255,255,255)')
    if (config.min >= config.max) {
      throw new Error('min value must less than max value')
    }
    this.config = {
      ...config,
      ...this.DefaultConfig
    }

    if (this.config.cache) {
      this.linearLRUCache = new LRU<string>(20)
    }
  }

  calcValue(value: number): string {
    const normalizedValue = minMaxNormalization(this.config.min, this.config.max, value)
    let color = ''
    if (this.config.cache) {
      color = this.linearLRUCache.get(normalizedValue)
      if (color) return color
      else {
        color = lerp(normalizedValue, this.config.colorList)
        this.linearLRUCache.put(normalizedValue, color)
      }
    } else {
      color = lerp(normalizedValue, this.config.colorList)
    }
    return color
  }

  calcValues(values: number[]): string[] {
    const res = []
    for (let val of values) {
      res.push(this.calcValue(val))
    }
    return res
  }
}
