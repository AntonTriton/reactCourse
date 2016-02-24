
import App from './components/app.js'
import Main from './components/main.js'
import Content from './components/content.js'
import NotFound from './components/notFound.js'

const routeConfig = [
    { path: '/',
        component: App,
        indexRoute: { component: Main },
        childRoutes: [
            { path: 'note/:id', component: Content},
            { path: 'folder/:id', component: Main},
            { path: '*', component: NotFound}
        ]
    }
];

export default routeConfig;
