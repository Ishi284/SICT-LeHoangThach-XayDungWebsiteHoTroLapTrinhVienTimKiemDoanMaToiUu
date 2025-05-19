import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatSessionComponent } from './components/chat-session/chat-session.component';
import { AuthGuard } from './services/auth-guard.service';
import { NavbarComponent } from './components/navbar/navbar.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { 
    path: 'login',
    component: LoginComponent
  },
  { 
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    component: NavbarComponent,
    canActivate: [AuthGuard],
    children: [
      { 
        path: 'chats',
        component: ChatListComponent
      },
      { 
        path: 'chat/:id',
        component: ChatSessionComponent
      }
    ]
  }
];