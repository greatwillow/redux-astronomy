import { 
    AnyState, 
    AstronomyStore, 
    DimensionStore 
} from './types'

const createDimensionStore = <
    TState extends AnyState
    >(
        store: AstronomyStore<TState>, 
        storeKey: string
    ): DimensionStore<TState> => {
    const getState = () => store.getState()[storeKey]

    return {
        getState,
        subscribe: (callback: CallableFunction) => {
            let lastState = getState()
            return store.subscribe(
                () => {
                    if(lastState !== getState())
                        callback((lastState = getState()))
                },
            )
        },
    }
}

export { createDimensionStore }
