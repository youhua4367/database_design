import axios from 'axios'

const api = {
    login(data) {
        return axios.post('/student/login', data)
    },
    register(data) {
        return axios.post('/student/register', data)
    },
    getCourses() {
        return axios.get('/courses')
    },
    getCourseDetail(id) {
        return axios.get(`/courses/${id}`)
    },
    enrollCourse(courseId) {
        return axios.post(`/courses/${courseId}/enroll`)
    },
    getMyCourses() {
        return axios.get('/student/mycourses')
    },
    getStudyContent(courseId) {
        return axios.get(`/courses/${courseId}/content`)
    },
    getProgress() {
        return axios.get('/student/progress')
    },
    getDiscussion(courseId) {
        return axios.get(`/courses/${courseId}/discussion`)
    },
    postDiscussion(courseId, content) {
        return axios.post(`/courses/${courseId}/discussion`, { content })
    }
}

export default api
