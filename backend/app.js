// // backend/app.js

// const express = require('express');
// const cors = require('cors');
// const morgan = require('morgan');
// const authRoutes = require('./routes/authRoutes');
// const carRoutes = require('./routes/carRoutes');
// const swaggerUi = require('swagger-ui-express');
// const swaggerJsDoc = require('swagger-jsdoc');

// const app = express();

// // Middleware
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL || 'http://localhost:5173',
//     credentials: true,
//   })
// );
// app.use(express.json());
// app.use(morgan('dev'));

// // Swagger setup (optional)
// const swaggerOptions = {
//   swaggerDefinition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Car Management API',
//       version: '1.0.0',
//       description: 'API documentation for the Car Management Application',
//     },
//     servers: [
//       {
//         url: process.env.BACKEND_URL || 'http://localhost:5000',
//       },
//     ],
//   },
//   apis: ['./routes/*.js'],
// };

// const swaggerDocs = swaggerJsDoc(swaggerOptions);
// app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/cars', carRoutes);

// // Error Handling Middleware
// app.use((err, req, res, next) => {
//   console.error('Unhandled Error:', err.message);
//   res.status(500).json({ error: 'An unexpected error occurred.' });
// });

// module.exports = app;










// // backend/app.js

// const express = require('express');
// const cors = require('cors');
// const morgan = require('morgan');
// const authRoutes = require('./routes/authRoutes');
// const carRoutes = require('./routes/carRoutes');
// const swaggerUi = require('swagger-ui-express');
// const swaggerJsDoc = require('swagger-jsdoc');

// const app = express();

// // Middleware
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL || 'http://localhost:5173',
//     credentials: true,
//   })
// );
// app.use(express.json());
// app.use(morgan('dev'));

// // Swagger setup (optional)
// const swaggerOptions = {
//   swaggerDefinition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Car Management API',
//       version: '1.0.0',
//       description: 'API documentation for the Car Management Application',
//     },
//     servers: [
//       {
//         url: process.env.BACKEND_URL || 'http://localhost:5000',
//       },
//     ],
//   },
//   apis: ['./routes/*.js'],
// };

// const swaggerDocs = swaggerJsDoc(swaggerOptions);
// app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/cars', carRoutes);

// // Error Handling Middleware
// app.use((err, req, res, next) => {
//   console.error('Unhandled Error:', err.message);
//   res.status(500).json({ error: 'An unexpected error occurred.' });
// });

// module.exports = app;











// // backend/app.js

// const express = require('express');
// const cors = require('cors');
// const morgan = require('morgan');
// const authRoutes = require('./routes/authRoutes');
// const carRoutes = require('./routes/carRoutes');
// const swaggerUi = require('swagger-ui-express');
// const swaggerJsDoc = require('swagger-jsdoc');

// const app = express();

// // Middleware
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL || 'http://localhost:5173',
//     credentials: true,
//   })
// );
// app.use(express.json());
// app.use(morgan('dev'));

// // Swagger setup (optional)
// const swaggerOptions = {
//   swaggerDefinition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Car Management API',
//       version: '1.0.0',
//       description: 'API documentation for the Car Management Application',
//     },
//     servers: [
//       {
//         url: process.env.BACKEND_URL || 'http://localhost:5000',
//       },
//     ],
//   },
//   apis: ['./routes/*.js'],
// };

// const swaggerDocs = swaggerJsDoc(swaggerOptions);
// app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// // Routes
// app.use('/api/auth', authRoutes); // Mount authRoutes at /api/auth
// app.use('/api/cars', carRoutes);

// // Error Handling Middleware
// app.use((err, req, res, next) => {
//   console.error('Unhandled Error:', err.message);
//   res.status(500).json({ error: 'An unexpected error occurred.' });
// });

// module.exports = app;














// backend/app.js

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');
const carRoutes = require('./routes/carRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      'https://car-project-management-frontend-v-1.onrender.com', // Deployed frontend URL
      'http://localhost:5173', // Allow local development as well
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan('dev'));

// Swagger setup (optional)
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Car Management API',
      version: '1.0.0',
      description: 'API documentation for the Car Management Application',
    },
    servers: [
      {
        url: process.env.BACKEND_URL || 'http://localhost:5000',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api/auth', authRoutes); // Mount authRoutes at /api/auth
app.use('/api/cars', carRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.message);
  res.status(500).json({ error: 'An unexpected error occurred6.' });
});

module.exports = app;
