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

import { AceEditorModule } from 'ng2-ace-editor';

import { ChartsModule }                      from 'ng2-charts/ng2-charts';

import { PerfectScrollbarModule }            from 'angular2-perfect-scrollbar';
import { PerfectScrollbarConfigInterface }   from 'angular2-perfect-scrollbar';

const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {suppressScrollX: true};

import { CKEditorModule } from 'ng2-ckeditor';

import { AppRoutingModule }                  from './app-routing.module';
import { AppComponent }                      from './app.component';

import { HomeComponent }                     from './home/home.component';

import { ClusterComponent }                  from './cluster/cluster.component';
import { ServerComponent }                   from './cluster/server/server.component';
import { ClusterOverallComponent }           from './cluster/cluster-overall/cluster-overall.component';


import { ColorPaletteComponent }             from './color-palette/color-palette.component';

import { SitesComponent }                    from './sites/sites.component';
import { SitesOverallComponent }             from './sites/sites-overall/sites-overall.component';

import { WebsiteComponent }                  from './sites/website/website.component';
import { WebsiteOverallComponent }           from './sites/website/website-overall/website-overall.component';
import { MappersComponent }                  from './sites/website/mappers/mappers.component';
import { WebsiteDataComponent }              from './sites/website/website-data/website-data.component';
import { WebsiteUsersComponent }             from './sites/website/website-users/website-users.component';
import { SettingsComponent }                 from './sites/website/settings/settings.component';
import { StatusComponent }                   from './sites/website/status/status.component';
import { CrawlersComponent }                 from './sites/website/crawlers/crawlers.component';
import { CrawlersOverallComponent }          from './sites/website/crawlers/crawlers-overall/crawlers-overall.component';
import { NewCrawlerComponent }               from './sites/website/crawlers/new-crawler/new-crawler.component';
import { CrawlerComponent }                  from './sites/website/crawlers/crawler/crawler.component';
import { CrawlerOverallComponent }           from './sites/website/crawlers/crawler/crawler-overall/crawler-overall.component';

import { NewSiteComponent }                  from './sites/new-site/new-site.component';

import { DeveloperComponent }                from './developer/developer.component';
import { DeveloperSettingsComponent }        from './developer/developer-settings/developer-settings.component';
import { DeveloperActivitiesComponent }      from './developer/developer-activities/developer-activities.component';
import { DeveloperProfileComponent }         from './developer/developer-profile/developer-profile.component';
import { DeveloperTasksComponent }           from './developer/developer-tasks/developer-tasks.component';
import { DeveloperNewTaskComponent }         from './developer/developer-tasks/developer-new-task/developer-new-task.component';
import { DeveloperTasksOverallComponent }    from './developer/developer-tasks/developer-tasks-overall/developer-tasks-overall.component';
import { DeveloperTaskComponent }            from './developer/developer-tasks/developer-task/developer-task.component';

import { DeveloperInboxComponent }           from './developer/developer-inbox/developer-inbox.component';
import { DeveloperOverallComponent }         from './developer/developer-overall/developer-overall.component';

import { SharedModule }                      from './@core/shared/shared.module';
import { CrawlerDocumentationComponent }     from './sites/website/crawlers/crawler/crawler-documentation/crawler-documentation.component';
import { CrawlerSettingsComponent }          from './sites/website/crawlers/crawler/crawler-settings/crawler-settings.component';
import { CrawlerCodeComponent }              from './sites/website/crawlers/crawler/crawler-code/crawler-code.component';
import { CrawlerEditHistoryComponent }       from './sites/website/crawlers/crawler/crawler-edit-history/crawler-edit-history.component';

import { ResourcesComponent }                from './resources/resources.component';
import { AdminComponent }                    from './admin/admin.component';
import { CrawlersPageComponent }             from './crawlers-page/crawlers-page.component';
import { DocsPageComponent }                 from './docs-page/docs-page.component';
import { DatabasePageComponent }             from './database-page/database-page.component';

import { DevelopmentComponent }              from './development/development.component';
import { UMLComponent }                      from './development/uml/uml.component';
import { DatabaseComponent }                 from './development/database/database.component';
import { DevelopmentOverallComponent }       from './development/development-overall/development-overall.component';


@NgModule({
  declarations: [
    AppComponent, SitesComponent,
    WebsiteComponent, ColorPaletteComponent,
    NewSiteComponent, MappersComponent, SettingsComponent, CrawlersComponent,
    StatusComponent, NewCrawlerComponent, CrawlerComponent,
    DeveloperComponent, DeveloperSettingsComponent, DeveloperActivitiesComponent,
    DeveloperProfileComponent, DeveloperTasksComponent, DeveloperNewTaskComponent, 
    DeveloperTasksOverallComponent, DeveloperInboxComponent, DeveloperOverallComponent,
    SitesOverallComponent, WebsiteOverallComponent, CrawlersOverallComponent,
    CrawlerOverallComponent, CrawlerDocumentationComponent, CrawlerSettingsComponent, CrawlerCodeComponent,
    CrawlerEditHistoryComponent, WebsiteDataComponent, WebsiteUsersComponent,
    ResourcesComponent, AdminComponent, CrawlersPageComponent, DocsPageComponent, DatabasePageComponent,
    ClusterComponent, ServerComponent, ClusterOverallComponent, DeveloperTaskComponent, HomeComponent, 
    DevelopmentComponent, UMLComponent, DatabaseComponent, DevelopmentOverallComponent
  ],
  imports: [
    BrowserModule,FormsModule,HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG),
    ChartsModule,
    AceEditorModule,
    CKEditorModule,
    SharedModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }