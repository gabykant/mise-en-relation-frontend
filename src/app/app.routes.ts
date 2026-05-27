import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { Login } from './features/auth/login/login';
import { ServiceRequestList } from './admin/components/service-request-list/service-request-list';
import { AdminLayout } from './admin/admin-layout/admin-layout';
import { ArtisanList } from './admin/components/artisan-list/artisan-list';
import { ArtisanCreate } from './admin/components/artisan-create/artisan-create';

export const routes: Routes = [
    { path: 'login', component: Login },
    {
        path: 'admin',
        component: AdminLayout,
        canActivate: [authGuard],
        children: [
            { path: 'requests', component: ServiceRequestList },
            { path: 'artisans', component: ArtisanList },
            { path: 'artisans/create', component: ArtisanCreate },
            { path: '', redirectTo: 'requests', pathMatch: 'full' }
        ]
    },
    { 
        path: '', 
        canActivate: [authGuard],
        children: [
            // { path: 'artisans', component: ArtisanListComponent },
            // { path: 'requests', component: RequestListComponent },
            { path: '', redirectTo: 'requests', pathMatch: 'full' }
        ]
    },
    { path: '**', redirectTo: 'login', pathMatch: 'full' }
];
