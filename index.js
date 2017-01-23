const type = {
  omregistrerade: 'OMREG',
  user: 'USER',
  course: 'COURSE',
  students: 'STUDENT',
  teachers: 'TEACHER',
  courseresponsibles: 'Course Responsible',
  assistants: 'TA',
  unknown: 'UNKNOWN'
}

module.exports = {
  type,
  addDescription(msg) {
    const result = Object.assign({}, msg)
    if (result.ugClass === 'user') {
      result._desc = {
        type: type.user
      }
      return result
    }

    if (!result.ug1Name) {
      result._desc = {
        type: type.unknown
      }
      return result
    }

    const isTeacherRegExp = /edu\.courses\.\w{2}\.\w{6}\.\d{5}\.\d\.\bteachers\b/
    const isAssistantsRegExp = /edu\.courses\.\w{2}\.\w{6}\.\d{5}\.\d\.\bassistants\b/
    const isCourseResponsibleRegExp = /edu\.courses\.\w{2}\.\w{6}\.\d{5}\.\d\.\bcourseresponsible\b/
    const isStudentsRegExp = /ladok2\.kurser.\w{2}\.\w{4}.registrerade_\d{5}\.\d/
    const isOmregRegexp = /ladok2\.kurser.\w{2}\.\w{4}.omregistrerade_\d{5}/
                        //ladok2.kurser.KD.1070.omregistrerade_20171
    if (result.ug1Name.match(isTeacherRegExp)) {
      result._desc = {
        type: type.course,
        userType: type.teachers
      }
    } else if (result.ug1Name.match(isAssistantsRegExp)) {
      result._desc = {
        type: type.course,
        userType: type.assistants
      }
    } else if (result.ug1Name.match(isCourseResponsibleRegExp)) {
      result._desc = {
        type: type.course,
        userType: type.courseresponsibles
      }
    } else if (result.ug1Name.match(isStudentsRegExp)) {
      result._desc = {
        type: type.course,
        userType: type.students
      }
    }  else if (result.ug1Name.match(isOmregRegexp)) {
      result._desc = {
        type: type.course,
        userType: type.omregistrerade
      }
    } else {
      result._desc = {
        type: type.unknown
      }
    }
    return result
  }
}
