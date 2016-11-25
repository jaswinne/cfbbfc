import React from 'react'

const TeamSearchBar = ({defaultName, onSearchChange, visibleDrop}) =>(
<div>
	<textarea 
		id='teamSearchBar'
		rows="1" 
		cols="20" 
		autoFocus="true" 
		defaultValue={defaultName} 
		onChange={onSearchChange}></textarea>
</div>
	)



export default TeamSearchBar