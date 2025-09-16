// 事件总线，用于组件间通信
import { ref } from 'vue'

export interface EventBusEvents {
  'assessment-submitted': { linkId: string | null }
  'data-refresh-needed': void
}

class EventBus {
  private events: Map<string, Function[]> = new Map()

  // 监听事件
  on<K extends keyof EventBusEvents>(event: K, callback: (data: EventBusEvents[K]) => void) {
    if (!this.events.has(event)) {
      this.events.set(event, [])
    }
    this.events.get(event)!.push(callback)
  }

  // 移除事件监听
  off<K extends keyof EventBusEvents>(event: K, callback: (data: EventBusEvents[K]) => void) {
    const callbacks = this.events.get(event)
    if (callbacks) {
      const index = callbacks.indexOf(callback)
      if (index > -1) {
        callbacks.splice(index, 1)
      }
    }
  }

  // 触发事件
  emit<K extends keyof EventBusEvents>(event: K, data: EventBusEvents[K]) {
    const callbacks = this.events.get(event)
    if (callbacks) {
      callbacks.forEach(callback => callback(data))
    }
    console.log(`事件触发: ${event}`, data)
  }

  // 清除所有事件监听
  clear() {
    this.events.clear()
  }
}

export const eventBus = new EventBus()