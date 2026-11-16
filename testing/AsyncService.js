class AsyncService {
    async fetchData() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ status: 'success', data: [83, 12, 25] });
            }, 100);
        });
    }

    async processData() {
        const result = await this.fetchData();
        return result.data.map(num => num * 2);
    }
}

module.exports = AsyncService;

