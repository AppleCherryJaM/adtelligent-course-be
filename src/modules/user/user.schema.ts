// schemas/user.schema.ts
const RegistrationSchema = {
  tags: ['user'],
  summary: "Register new user",
  description: "Create a new user account with JWT token",
  body: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { 
        type: 'string', 
        format: 'email',
        minLength: 7
      },
      password: { 
        type: 'string', 
        minLength: 5
      },
    }
  },
  response: {
    201: {
      description: 'Successful registration',
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            email: { type: 'string' }
          }
        },
        token: { type: 'string' }
      }
    },
    400: {
      description: 'Validation error',
      type: 'object',
      properties: {
        error: { type: 'string' },
        message: { type: 'string' }
      }
    },
    500: {
      description: 'Server error',
      type: 'object',
      properties: {
        error: { type: 'string' },
        message: { type: 'string' }
      }
    }
  }
} as const;

const LoginSchema = {
  tags: ['user'],
  summary: "Login user",
  description: "Authenticate user and return JWT token",
  querystring: {  
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { 
        type: 'string', 
        format: 'email',
        minLength: 7
      },
      password: { 
        type: 'string', 
        minLength: 5
      },
    }
  },
  response: {
    200: {
      description: 'Successful login',
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            email: { type: 'string' }
          }
        },
        token: { type: 'string' },
        message: { type: 'string' }
      }
    },
    401: {
      description: 'Authentication failed',
      type: 'object',
      properties: {
        error: { type: 'string' },
        message: { type: 'string' }
      }
    },
    404: {
      description: 'User not found',
      type: 'object',
      properties: {
        error: { type: 'string' },
        message: { type: 'string' }
      }
    }
  }
} as const;

export { RegistrationSchema, LoginSchema };