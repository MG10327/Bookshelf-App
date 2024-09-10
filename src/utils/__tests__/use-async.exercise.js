import {renderHook, act} from '@testing-library/react'
import {useAsync} from '../hooks'

// 💰 I'm going to give this to you. It's a way for you to create a promise
// which you can imperatively resolve or reject whenever you want.
// function deferred() {
//   let resolve, reject
//   const promise = new Promise((res, rej) => {
//     resolve = res
//     reject = rej
//   })
//   return {promise, resolve, reject}
// }

// Use it like this:
// const {promise, resolve} = deferred()
// promise.then(() => console.log('resolved'))
// do stuff/make assertions you want to before calling resolve
// resolve()
// await promise
// do stuff/make assertions you want to after the promise has resolved

// 🐨 flesh out these tests

function deferred() {
    let resolve, reject
    const promise = new Promise((res, rej) =>{
        resolve = res
        reject = rej
    })
    return {promise, resolve, reject}
}

test('calling run with a promise which resolves', async () => {
    const {promise, resolve} = deferred()
    const {result} = renderHook(() => useAsync())
        expect(result.current).toEqual({
            status: 'idle',
            error: null,
            data: null,

            isIdle: true,
            isLoading: false,
            isError: false,
            isSuccess: false,

            run: expect.any(Function),
            reset: expect.any(Function),
            setData: expect.any(Function),
            setError: expect.any(Function)
        })
        let p
        act(() => {
           p = result.current.run(promise)
        })

        expect(result.current).toEqual({
            status: 'pending',
            error: null,
            data: null,

            isIdle: false,
            isLoading: true,
            isError: false,
            isSuccess: false,

            run: expect.any(Function),
            reset: expect.any(Function),
            setData: expect.any(Function),
            setError: expect.any(Function)
        })
        const resolvedValue = Symbol('resolved value')
        await act(async () => {
            resolve(resolvedValue)
            await p
        })

        expect(result.current).toEqual({
            status: 'resolved',
            error: null,
            data: resolvedValue,

            isIdle: false,
            isLoading: false,
            isError: false,
            isSuccess: true,

            run: expect.any(Function),
            reset: expect.any(Function),
            setData: expect.any(Function),
            setError: expect.any(Function)
        })

        act(() => {
            result.current.reset()
        })
})


test('calling run with a promise which rejects', async () => {})


test('can specify an initial state', async () => {})
// 💰 useAsync(customInitialState)

test('can set the data', async () => {})
// 💰 result.current.setData('whatever you want')

test('can set the error', async () => {})
// 💰 result.current.setError('whatever you want')

test('No state updates happen if the component is unmounted while pending', async () => {})
// 💰 const {result, unmount} = renderHook(...)

test('calling "run" without a promise results in an early error', async () => {})
