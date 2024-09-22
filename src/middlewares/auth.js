const adminAuth = (req, res, next) => {
    const token = "abc";
    const authToken = token === "abc";
    if (!authToken) {
        res.status(401).send("Unauthoriased Admin access!!")
    } else {
        next()
    }
}
const userAuth = (req, res, next) => {
    const token = "abc";
    const authToken = token === "abc";
    if (!authToken) {
        res.status(401).send("Unauthoriased user access!!")
    } else {
        next()
    }
}
module.exports={
    adminAuth,
    userAuth
}