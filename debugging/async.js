/**
 * Function with a nested chain of async operations
 * 
 * Fetch user data
 * 
 * Get user posts
 * 
 * Process posts (this will cause an error for userId = 3)
 * 
 * Will fail if content is undefined
 * 
 */
async function processUserData(userId) {
    try {
        console.log(`Processing data for user ${userId}...`);
        
        const userData = await fetchUserData(userId);
        console.log(`User data retrieved: ${userData.name}`);

        const posts = await getUserPosts(userId);
        console.log(`Retrieved ${posts.length} posts for user`);

        const processedPosts = posts.map(post => {
            return {
                id: post.id,
                title: post.title.toUpperCase(),
                contentLength: post.content.length
            };
        });
        return { user: userData, posts: processedPosts };
    } catch (err) {
        console.error(`OPS! Error processing user data: `, err);
    }
}

/**
 * Simulated API call
 * 
 */
function fetchUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId <= 0)
                reject(new Error("OPS! Invalid user ID"));
            else
                resolve({ id: userId, name: `User ${userId}` });
        }, 500);
    });
}

/**
 * Simulated database query
 * 
 * Bug: post with undefined content for userId 3
 * 
 */
function getUserPosts(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (userId === 3) {
                resolve([
                    { id: 1, title: 'Resistência', content: 'Que a força esteja com você' },
                    { id: 2, title: 'O império', content: undefined }
                ]);
            } else {
                resolve([
                    { id: 1, title: 'Resistência 2', content: 'Que a força esteja com você 2' },
                    { id: 2, title: 'O império 2', content: 'O mal vencerá' }
                ]);
            }
        }, 300);
    });
}

processUserData(2)
    .catch(err => console.error("OPS! Caught at top level: ", error.message));

