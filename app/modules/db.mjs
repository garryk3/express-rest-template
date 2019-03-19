const users = [{
    username: 'test-user',
    password: 'my-password',
    id: 1
}];

const findById = (id, cb) => {
    process.nextTick(() => {
        const idx = id - 1;
        if (users[idx]) {
            cb(null, users[idx]);
        } else {
            cb(new Error('User does not exist'));
        }
    });
};

const findByUsername = (username, cb) => {
    process.nextTick(() => {
    // eslint-disable-next-line no-plusplus
        for (let i = 0, len = users.length; i < len; i++) {
            const user = users[i];
            if (user.username === username) {
                return cb(null, user);
            }
        }
        return cb(null, null);
    });
};

export { findById, findByUsername };
