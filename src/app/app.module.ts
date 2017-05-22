import { BrowserModule }                     from '@angular/platform-browser';
import { NgModule }                          from '@angular/core';
import { FormsModule }                       from '@angular/forms';
import { HttpModule }                        from '@angular/http';

import { environment }                       from '../environments/environment';
import { AngularFireModule }                 from 'angularfire2';
import { AngularFireDatabaseModule }         from 'angularfire2/database';
import { AngularFireAuthModule }             from 'angularfire2/auth';


import { AppRoutingModule }                  from './app-routing.module';
import { AppComponent }                      from './app.component';

import { SiteComponent }                     from './site/site.component';
import { EntranceListComponent }             from './entrance-list/entrance-list.component';
import { PostListComponent }                 from './post-list/post-list.component';
import { AuthorListComponent }               from './author-list/author-list.component';
import { PostsComponent }                    from './site/posts/posts.component';

import { AuthorsComponent }                  from './site/authors/authors.component';
import { EntrancesComponent }                from './site/entrances/entrances.component';
import { LogsComponent }                     from './site/logs/logs.component';
import { SitemapComponent }                  from './site/sitemap/sitemap.component';
import { BacklogsComponent }                 from './site/backlogs/backlogs.component';

@NgModule({
  declarations: [
    AppComponent,
    SiteComponent,
    EntranceListComponent,
    PostListComponent,
    AuthorListComponent,
    PostsComponent,AuthorsComponent,EntrancesComponent,LogsComponent,SitemapComponent, BacklogsComponent
  ],
  imports: [
    BrowserModule,FormsModule,HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule // imports firebase/auth, only needed for auth features
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
