import { connect } from 'react-redux'
import { changeSearchTerm, changeTeamDropdown } from '../actions'
import TeamSearchBar from '../components/TeamSearchBar'


const mapStateToProps = (state) => {
	console.log()
	return {
		defaultName : state.defaultSearchName,
		visibleDrop : state.teamDropdownVisible
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSearchChange: (searchTermEvent) => {
			dispatch(changeSearchTerm(searchTermEvent.target.value));
			dispatch(changeTeamDropdown(searchTermEvent.target.value))
		}
	}
}

const TeamSearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamSearchBar)

export default TeamSearchContainer