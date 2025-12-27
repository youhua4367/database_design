// 假学生账号数据
const fakeStudent = {
    userId: 1,
    username: "student01",
    role: 1,       // 学生
    token: "fake-jwt-token-123456"
}

// 模拟登录：存入 localStorage
localStorage.setItem('studentLoggedIn', 'true')
localStorage.setItem('studentToken', fakeStudent.token)
localStorage.setItem('studentInfo', JSON.stringify(fakeStudent))
