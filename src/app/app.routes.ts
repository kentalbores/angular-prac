import { Routes } from '@angular/router';
import { PlatformsComponent } from './components/platforms/platforms.component';
import { AccountsComponent } from './components/accounts/accounts.component';

export const routes: Routes = [
    {path: '', component: PlatformsComponent},
    {path: 'platform/:name', component: AccountsComponent}
];