import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { IntroComponent } from './components/intro/intro.component';

export const routes: Routes = [
    {path: '', component: IntroComponent},
    {path: 'login', component: LoginComponent},
    {path: '', redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
