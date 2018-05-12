import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ImageToDataUrlModule } from 'ngx-image2dataurl';
import { Routes, RouterModule } from '@angular/router';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ToastyModule } from 'ng2-toasty';
import { AppComponent } from './app.component';
import { UserListComponent } from './components/user-list.component';
import { NotFoundComponent } from './components/shared/not-found.component';
import { UserComponent } from './components/user.component';

const appRoutes: Routes =[
  { path: '', component: UserListComponent },
  { path: 'user', component: UserComponent },
  { path: 'user/:id', component: UserComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports:[
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    SlimLoadingBarModule.forRoot(),
    ToastyModule.forRoot(),
    ImageToDataUrlModule
  ],
  declarations: [
    AppComponent,
    NotFoundComponent,
    UserListComponent,
    UserComponent
  ],
  bootstrap:[AppComponent]
})


export class AppModule{}