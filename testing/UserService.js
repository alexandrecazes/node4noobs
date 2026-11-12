class UserService {
    constructor(db) {
        this.db = db;
    }

    async getUserById(id) {
        const user = await this.db.findById(id);

        if (!user) 
            throw new Error("OPS! User not found");
        
        return user;
    }
}

module.exports = UserService;