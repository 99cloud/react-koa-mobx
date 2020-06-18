/*
 * Created: Fri May 22 2020
 * Author: Apple
 */

import React from 'react'
import { useLocalStore, useObserver } from 'mobx-react' // 6.x

export const Home = () => {
  const todo = useLocalStore(() => ({
    title: 'Click to toggle',
    done: false,
    toggle() {
      todo.done = !todo.done
    },
    get emoji() {
      return todo.done ? '😜' : '🏃'
    },
  }))

  return useObserver(() => (
    <>
      <h2>Use React Hooks Example:</h2>
      <h3 onClick={todo.toggle}>
        {todo.title} {todo.emoji}
      </h3>
    </>
  ))
}
