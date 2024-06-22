import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ManageComponent } from './components/manage/manage.component';
import { HistoryComponent } from './components/history/history.component';
import { UserComponent } from './components/user/user.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Jearsoi - Home'
    },
    {
        path: 'menus',
        component: MenuComponent,
        title: 'Menu'
    },
    {
        path: 'cart',
        component: CartComponent,
        title: 'Your Cart'
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Sign In'
    },
    {
        path: 'register',
        component: RegisterComponent,
        title: 'Create new account'
    },
    {
        path: 'user',
        component: UserComponent,
        title: 'Jearsoi - User'
    },
    {
        path: 'manage',
        component: ManageComponent,
        title: 'Jearsoi - Manager'
    },
    {
        path: 'history/:id',
        component: HistoryComponent,
        title: 'Order'
    },
    {
        path: 'history',
        component: HistoryComponent,
        title: 'Order'
    }
];
