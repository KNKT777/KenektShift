
    import { ApolloServer } from 'apollo-server';
    import { ApolloGateway } from '@apollo/gateway';

    const gateway = new ApolloGateway({
      serviceList: [
        { name: 'user', url: 'http://user_service:5001/graphql' },
        { name: 'job', url: 'http://job_management_service:5002/graphql' },
        { name: 'billing', url: 'http://billing_service:5003/graphql' },
      ],
    });

    const server = new ApolloServer({
      gateway,
      subscriptions: false,
    });

    server.listen().then(({ url }) => {
      console.log(`🚀 Gateway ready at ${url}`);
    }).catch(err => {
      console.error(err);
    });
    