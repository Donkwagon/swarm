import { BrowserModule }                     from '@angular/platform-browser';
import { NgModule }                          from '@angular/core';
import { FormsModule }                       from '@angular/forms';
import { HttpModule }                        from '@angular/http';

import { LocationStrategy }                  from '@angular/common';
import { HashLocationStrategy }              from '@angular/common';

import { environment }                       from '../environments/environment';
import { AngularFireModule }                 from 'angularfire2';
import { AngularFireDatabaseModule }         from 'angularfire2/database';
import { AngularFireAuthModule }             from 'angularfire2/auth';

import { AceEditorDirective }                from 'ng2-ace-editor';

import { ChartsModule }                      from 'ng2-charts/ng2-charts';

import { PerfectScrollbarModule }            from 'angular2-perfect-scrollbar';
import { PerfectScrollbarConfigInterface }   from 'angular2-perfect-scrollbar';

const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {suppressScrollX: true};

import { AppRoutingModule }                  from './app-routing.module';
import { AppComponent }                      from './app.component';

import { SiteComponent }                     from './site/site.component';
import { PostsComponent }                    from './site/posts/posts.component';

import { AuthorsComponent }                  from './site/authors/authors.component';
import { EntrancesComponent }                from './site/entrances/entrances.component';
import { LogsComponent }                     from './site/logs/logs.component';
import { SitemapComponent }                  from './site/sitemap/sitemap.component';
import { BacklogsComponent }                 from './site/backlogs/backlogs.component';

import { ClusterComponent }                  from './cluster/cluster.component';

import { ColorPaletteComponent }             from './color-palette/color-palette.component';

import { SitesComponent }                    from './sites/sites.component';

import { WebsiteComponent }                  from './sites/website/website.component';
import { MappersComponent }                  from './sites/website/mappers/mappers.component';
import { SettingsComponent }                 from './sites/website/settings/settings.component';
import { StatusComponent }                   from './sites/website/status/status.component';
import { CrawlersComponent }                 from './sites/website/crawlers/crawlers.component';
import { NewCrawlerComponent }               from './sites/website/crawlers/new-crawler/new-crawler.component';
import { CrawlerComponent }                  from './sites/website/crawlers/crawler/crawler.component';

import { NewSiteComponent }                  from './sites/new-site/new-site.component';
import { DeveloperComponent }                from './developer/developer.component';

@NgModule({
  declarations: [
    AppComponent,
    SiteComponent,
    PostsComponent,AuthorsComponent,EntrancesComponent,LogsComponent,SitemapComponent, BacklogsComponent, ClusterComponent, SitesComponent,AceEditorDirective,
    WebsiteComponent, ColorPaletteComponent,
    NewSiteComponent, MappersComponent, SettingsComponent, CrawlersComponent, StatusComponent, NewCrawlerComponent, CrawlerComponent, DeveloperComponent
  ],
  imports: [
    BrowserModule,FormsModule,HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG),
    ChartsModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }