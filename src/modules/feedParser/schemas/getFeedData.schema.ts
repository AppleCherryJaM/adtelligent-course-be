export const schema ={
    tags: ['feed'],
        summary: 'Feed data',
        description: 'Feed data',
        response: {
        200: {
            type: 'object',
                properties: {
                hello: {
                    type: 'string',
                }
            }
        }
    }
} as const