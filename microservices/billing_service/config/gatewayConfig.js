import express from 'express';

        // Configuration for microservice communication via Kong Gateway
        const API_GATEWAY_URL = process.env.API_GATEWAY_URL || 'http://localhost:8000';

        export default {
            API_GATEWAY_URL
        };
        