import { ChangeEventHandler, useState } from "react"

type ResetFunction = () => void
type Return<T> = {
  state: T
  changeHandler: ChangeEventHandler<any>
  reset: ResetFunction
}

/**
 * A custom React hook that simplifies form management by providing a state object, change handler, and reset function.
 *
 * @template T - The type of the state object.
 * @param {T} initialValue - The initial value for the state object.
 * @returns {Object} - An object containing the state object, change handler function, and reset function.
 * @property {T} state - The current state of the form.
 * @property {function} changeHandler - A function that handles changes to form input values.
 * @property {function} reset - A function that resets the state of the form to its initial value.
 */

export default function useForm<T>(initialValue: T): Return<T> {
  const [state, setState] = useState<T>(initialValue)

  const changeHandler: ChangeEventHandler<any> = event => {
    const { name, value } = event.target
    setState(pre => ({ ...pre, [name]: value }))
  }

  const reset: ResetFunction = () => {
    setState(initialValue)
  }

  return {
    changeHandler,
    state,
    reset,
  }
}
