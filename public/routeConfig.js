
import App from './components/app'
//import Main from './components/main'
import Main from './containers/mainContainer'
//import Content from './components/content.js'
import Content from './containers/contentContainer'
import NotFound from './components/notFound'

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
