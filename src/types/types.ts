export interface ObservableValue<TValue = any> {
    get(): TValue
    set(newValue: TValue): void
    use(): [TValue, ValueSetter<TValue>]
    listen(callback: ValueListener<TValue>, options?: ValueListenOptions<TValue>): ValueListenerUnsubscribe
  }
  
  export type ValueConfig<TValue> = {
    differ: ValueDiffer<TValue>
  }
  
  export type ValueListenOptions<TValue> = {
    immediate?: boolean
    differ?: ValueDiffer<TValue>
  }
  
  export type ValueListener<TValue> = (newValue: TValue) => void
  export type ValueListenerUnsubscribe = () => void
  export type ValueDiffer<TValue> = (oldValue: TValue, newValue: TValue) => boolean
  export type CreateValue = <TValue>(initialValue: TValue, options?: ValueConfig<TValue>) => ObservableValue<TValue>
  export type CreateValueSetter = <TValue>(value: ObservableValue<TValue>) => ValueSetter<TValue>
  export type ValueSetter<TValue = any> = (newValue: TValue | ((oldValue: TValue) => TValue)) => void