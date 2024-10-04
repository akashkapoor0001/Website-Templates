import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { IntroComponent } from './components/intro/intro.component';
import { ECommerceComponent } from './components/websites-showcase/e-commerce/e-commerce.component';
import { EducationComponent } from './components/websites-showcase/education/education.component';
import { BusinessComponent } from './components/websites-showcase/business/business.component';
import { HealthComponent } from './components/websites-showcase/health/health.component';
import { LandingComponent } from './components/websites-showcase/landing/landing.component';
import { BlogComponent } from './components/websites-showcase/blog/blog.component';
import { RealEstateComponent } from './components/websites-showcase/real-estate/real-estate.component';
import { TravelComponent } from './components/websites-showcase/travel/travel.component';
import { PortfolioComponent } from './components/websites-showcase/portfolio/portfolio.component';
import { PaymentGatewayComponent } from './components/payment-gateway/payment-gateway.component';

export const routes: Routes = [
    {path: '', component: IntroComponent},
    {path: 'login', component: LoginComponent},
    {path: 'ecommerce', component: ECommerceComponent},
    {path: 'education', component: EducationComponent},
    {path: 'business', component: BusinessComponent},
    {path: 'health', component: HealthComponent},
    {path: 'landing-page', component: LandingComponent},
    {path: 'blog', component: BlogComponent},
    {path: 'real-estate', component: RealEstateComponent},
    {path: 'travel', component: TravelComponent},
    {path: 'portfolio', component: PortfolioComponent},
    {path: 'payment-gateway', component: PaymentGatewayComponent},
    {path: '', redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
