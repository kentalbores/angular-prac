import { RouterModule, Routes } from '@angular/router';
import { PlatformsComponent } from './components/platforms/platforms.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {path: '', component: PlatformsComponent},
    {path: 'platform/:name', component: AccountsComponent}
] 

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}