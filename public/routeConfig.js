
const routeConfig = [
    { path: '/',
        component: App,
        indexRoute: { component: Main },
        childRoutes: [
            { path: 'note/:id', component: Content},
            { path: 'folder/:id', component: Main}
        ]
    }
];

export default routeConfig;
