import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import * as courseActions from '../../actions/courseActions'
import { bindActionCreators } from 'redux'

class CoursesPage extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      course: {title: ''}
    }

    this.onTitleChange = this.onTitleChange.bind(this)
    this.onClickSave = this.onClickSave.bind(this)
    // this.courseRow = this.courseRow.bind(this)
  }

  onTitleChange(event) {
    const course = this.state.course
    let courseValue = event.target.value
    course.title = courseValue
    this.setState({course: course})
    courseValue = ''
  }

  onClickSave() {
    this.props.actions.createCourse(this.state.course)
  }

  courseRow(course, index) {
    return <div key={index}>{course.title}</div>
  }

  render() {
    return(
      <div>
        <h1>Courses</h1>
        {this.props.courses.map(this.courseRow)}
        <h2>Add Course</h2>
        <input
          type="text"
          onChange={this.onTitleChange}
          value={this.state.course.title}
        />
        <input
          type="submit"
          value="Save"
          onClick={this.onClickSave}
        />
      </div>
    )
  }
}

// same as
// const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps)
// export default connectedStateAndProps(CoursePage)

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    courses: state.courses
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  }
}

// function mapDispatchToProps(dispatch) {
//   return {
//     createCourse: course => dispatch(courseActions.createCourse(course))
//   }
// }


export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage)
