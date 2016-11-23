import React from 'react'
import TeamGameLine from './TeamGameLine'

const GameView =({date, homeTeam, homeScore, roadTeam, roadScore}) => (
<div>
	<span>{date}</span>
	<TeamGameLine teamName={homeTeam} score={homeScore} />
	<TeamGameLine teamName={roadTeam} score={roadScore} />
	<hr />
</div>
	)

export default GameView