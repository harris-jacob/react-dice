import { assertDefined } from './utils'

export type OnResultCallback = (result: number) => void

/** class that observes results of rolls and envokes the appropriate callback */
export class ResultObserver {
  callbacks: Map<string, OnResultCallback>

  public constructor() {
    this.callbacks = new Map()
  }

  /** register a result callback with its associated roll id */
  public register(id: string, callback: OnResultCallback) {
    this.callbacks.set(id, callback)
  }

  /** Execute callback for roll and remove from the list of pending callbacks */
  public execute(id: string, result: number) {
    const callback = this.callbacks.get(id)
    this.callbacks.delete(id)
    assertDefined(callback, 'callback matching roll-id not found')
    callback(result)
  }
}
