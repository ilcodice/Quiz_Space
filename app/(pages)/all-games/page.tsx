import React from 'react'
import GamesList from '../../../client/src/components/custom_components/games-list'

export default async function page() {
  let response = await fetch("http://localhost:5001/all-games")
  let games = await response.json()
  console.log(games)
  return (
    <div>
      games
    </div>
  )
}
