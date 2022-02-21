import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/models'
    }, {
        path: 'about',
        loadChildren: () => import( './containers/about/about.module').then( m => m.AboutModule )
    }, {
        path: 'docs',
        loadChildren: () => import( './containers/docs/docs.module').then( m => m.DocsModule )
    }, {
        path: 'models',
        loadChildren: () => import( './containers/dst/dst.module').then( m => m.DstModule )
    }, {
        path: '**',
        redirectTo: ''
    }
];
