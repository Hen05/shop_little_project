exports.getAccessToken = (req) => {
    const accessToken = req.cookies.access_token;
    if (accessToken) {
        return accessToken;
    }
    return null;
};