import { BrowserModule }                     from '@angular/platform-browser';
import { NgModule }                          from '@angular/core';
import { FormsModule }                       from '@angular/forms';
import { HttpModule }                        from '@angular/http';

import { LocationStrategy }                  from '@angular/common';
import { HashLocationStrategy }              from '@angular/common';

import { environment }                       from '../environments/environment';

//////////////////////////////////////////////////////////////////////////////////
//external libraries
import { AngularFireModule }                 from 'angularfire2';
import { AngularFireDatabaseModule }         from 'angularfire2/database';
import { AngularFireAuthModule }             from 'angularfire2/auth';

import { AceEditorModule }                   from 'ng2-ace-editor';

import { CKEditorModule }                    from 'ng2-ckeditor';

import { CookieModule }                      from 'ngx-cookie';

//////////////////////////////////////////////////////////////////////////////////

import { AppRoutingModule }                  from './app-routing.module';
import { AppComponent }                      from './app.component';

import { HomeComponent }                     from './home/home.component';

import { ClusterComponent }                  from './cluster/cluster.component';
import { ServerComponent }                   from './cluster/server/server.component';
import { ClusterOverallComponent }           from './cluster/cluster-overall/cluster-overall.component';

import { SitesComponent }                    from './sites/sites.component';
import { SitesOverallComponent }             from './sites/sites-overall/sites-overall.component';
import { NewSiteComponent }                  from './sites/new-site/new-site.component';

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

import { DeveloperComponent }                from './developer/developer.component';
import { DeveloperSettingsComponent }        from './developer/developer-settings/developer-settings.component';
import { DeveloperSettingsBasicComponent }   from './developer/developer-settings/developer-settings-basic/developer-settings-basic.component';
import { DeveloperSettingsAccountComponent } from './developer/developer-settings/developer-settings-account/developer-settings-account.component';

import { DeveloperActivitiesComponent }      from './developer/developer-activities/developer-activities.component';
import { DeveloperProfileComponent }         from './developer/developer-profile/developer-profile.component';
import { DeveloperTasksComponent }           from './developer/developer-tasks/developer-tasks.component';
import { DeveloperNewTaskComponent }         from './developer/developer-tasks/developer-new-task/developer-new-task.component';
import { DeveloperTasksOverallComponent }    from './developer/developer-tasks/developer-tasks-overall/developer-tasks-overall.component';
import { DeveloperTaskComponent }            from './developer/developer-tasks/developer-task/developer-task.component';

import { DeveloperInboxComponent }           from './developer/developer-inbox/developer-inbox.component';
import { DeveloperOverallComponent }         from './developer/developer-overall/developer-overall.component';

import { SharedModule }                      from './@core/shared/shared.module';

import { CrawlerComponent }                  from './crawler/crawler.component';
import { CrawlerOverallComponent }           from './crawler/crawler-overall/crawler-overall.component';
import { CrawlerDocumentationComponent }     from './crawler/crawler-documentation/crawler-documentation.component';
import { CrawlerSettingsComponent }          from './crawler/crawler-settings/crawler-settings.component';
import { CrawlerCodeComponent }              from './crawler/crawler-code/crawler-code.component';
import { CrawlerEditHistoryComponent }       from './crawler/crawler-edit-history/crawler-edit-history.component';

import { AdminComponent }                    from './admin/admin.component';
import { CrawlersPageComponent }             from './crawlers-page/crawlers-page.component';

import { DevelopmentComponent }              from './development/development.component';
import { UMLComponent }                      from './development/uml/uml.component';
import { DatabaseComponent }                 from './development/database/database.component';
import { DevelopmentOverallComponent }       from './development/development-overall/development-overall.component';
import { AppRouteMapComponent }              from './development/app-route-map/app-route-map.component';

import { MessagesComponent }                 from './messages/messages.component';
import { ConversationComponent }             from './messages/conversation/conversation.component';

import { FinancialDataComponent }            from './financial-data/financial-data.component';
import { FinancialDataOverallComponent }     from './financial-data/financial-data-overall/financial-data-overall.component';
import { ExchangesComponent }                from './financial-data/exchanges/exchanges.component';
import { SecuritiesComponent }               from './financial-data/securities/securities.component';
import { ExchangeComponent }                 from './financial-data/exchanges/exchange/exchange.component';
import { ExchangesOverallComponent }         from './financial-data/exchanges/exchanges-overall/exchanges-overall.component';
import { ExchangeOverallComponent }          from './financial-data/exchanges/exchange/exchange-overall/exchange-overall.component';
import { ExchangeSecuritiesComponent }       from './financial-data/exchanges/exchange/exchange-securities/exchange-securities.component';
import { ExchangeSecuritiesOverallComponent } from './financial-data/exchanges/exchange/exchange-securities/exchange-securities-overall/exchange-securities-overall.component';
import { ExchangeSecurityComponent }         from './financial-data/exchanges/exchange/exchange-securities/exchange-security/exchange-security.component';
import { ExchangeSettingsComponent }         from './financial-data/exchanges/exchange/exchange-settings/exchange-settings.component';
import { FinancialDataMaintenanceComponent } from './financial-data/financial-data-maintenance/financial-data-maintenance.component';

import { DataComponent } from './data/data.component';
import { SecurityComponent } from './security/security.component';



@NgModule({
  declarations: [
    AppComponent, SitesComponent,WebsiteComponent, 
    NewSiteComponent, MappersComponent, SettingsComponent, CrawlersComponent,
    StatusComponent, NewCrawlerComponent, CrawlerComponent,
    DeveloperComponent, DeveloperSettingsComponent, DeveloperSettingsBasicComponent,
    DeveloperSettingsAccountComponent, DeveloperActivitiesComponent,
    DeveloperProfileComponent, DeveloperTasksComponent, DeveloperNewTaskComponent, 
    DeveloperTasksOverallComponent, DeveloperInboxComponent, DeveloperOverallComponent,
    SitesOverallComponent, WebsiteOverallComponent, CrawlersOverallComponent,
    CrawlerOverallComponent, CrawlerDocumentationComponent, CrawlerSettingsComponent, CrawlerCodeComponent,
    CrawlerEditHistoryComponent, WebsiteDataComponent, WebsiteUsersComponent,
    AdminComponent, CrawlersPageComponent,
    ClusterComponent, ServerComponent, ClusterOverallComponent, DeveloperTaskComponent, HomeComponent, 
    DevelopmentComponent, UMLComponent, DatabaseComponent, AppRouteMapComponent, DevelopmentOverallComponent,
    MessagesComponent, ConversationComponent,
    FinancialDataComponent, FinancialDataOverallComponent, ExchangesComponent,
    SecuritiesComponent, ExchangeComponent, ExchangesOverallComponent,
    ExchangeOverallComponent, ExchangeSecuritiesComponent,
    ExchangeSecuritiesOverallComponent, ExchangeSecurityComponent, ExchangeSettingsComponent, 
    FinancialDataMaintenanceComponent, DataComponent, SecurityComponent
  ],
  imports: [
    BrowserModule,FormsModule,HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AceEditorModule,
    CKEditorModule,
    CookieModule.forRoot(),
    SharedModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }