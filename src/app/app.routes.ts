import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { Login } from './features/auth/login/login';
import { ServiceRequestList } from './admin/components/service-request-list/service-request-list';
import { AdminLayout } from './admin/admin-layout/admin-layout';
import { ArtisanList } from './admin/components/artisan-list/artisan-list';
import { ArtisanCreate } from './admin/components/artisan-create/artisan-create';
import { ArtisanEdit } from './components/artisan-edit/artisan-edit';
import { ArtisanView } from './admin/components/artisan-view/artisan-view';
import { Zone } from './admin/metadata/zone/zone';
import { ClientList } from './admin/components/client-list/client-list';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'logout', component: Login },
    {
        path: 'admin',
        component: AdminLayout,
        canActivate: [authGuard],
        children: [
            { path: 'requests', component: ServiceRequestList },
            { path: 'clients', component: ClientList },
            { path: 'artisans', component: ArtisanList },
            { path: 'areas', component: Zone },
            { path: 'artisans/create', component: ArtisanCreate },
            { path: 'artisans/edit/:id', component: ArtisanEdit },
            { path: 'artisans/view/:id', component: ArtisanView },
            { path: '', redirectTo: 'requests', pathMatch: 'full' }
        ]
    },
    // { 
    //     path: '', 
    //     canActivate: [authGuard],
    //     children: [
    //         { path: '', redirectTo: 'requests', pathMatch: 'full' }
    //     ]
    // },
    
];
