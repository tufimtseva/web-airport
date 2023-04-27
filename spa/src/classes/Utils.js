class Utils {
    static isLoggedIn() {
        return (localStorage.getItem('email')  ? true : false);
    }
}

export default Utils;