import { NgModule }                          from '@angular/core';
import { Routes, RouterModule }              from '@angular/router';

import { HomeComponent } from './home/home.component';

import { ClusterComponent }                  from './cluster/cluster.component';
import { ClusterOverallComponent }           from './cluster/cluster-overall/cluster-overall.component';
import { ServerComponent }                   from './cluster/server/server.component';

import { SitesComponent }                    from './sites/sites.component';
import { SitesOverallComponent }             from './sites/sites-overall/sites-overall.component';

import { NewSiteComponent }                  from './sites/new-site/new-site.component';

import { WebsiteComponent }                  from './sites/website/website.component';
import { WebsiteOverallComponent }           from './sites/website/website-overall/website-overall.component';
import { WebsiteDataComponent }              from './sites/website/website-data/website-data.component';
import { WebsiteUsersComponent }             from './sites/website/website-users/website-users.component';
import { MappersComponent }                  from './sites/website/mappers/mappers.component';
import { SettingsComponent }                 from './sites/website/settings/settings.component';
import { CrawlersComponent }                 from './sites/website/crawlers/crawlers.component';

import { CrawlersOverallComponent }          from './sites/website/crawlers/crawlers-overall/crawlers-overall.component';
import { CrawlerDocumentationComponent }     from './sites/website/crawlers/crawler/crawler-documentation/crawler-documentation.component';
import { CrawlerSettingsComponent }          from './sites/website/crawlers/crawler/crawler-settings/crawler-settings.component';
import { CrawlerOverallComponent }           from './sites/website/crawlers/crawler/crawler-overall/crawler-overall.component';
import { CrawlerCodeComponent }              from './sites/website/crawlers/crawler/crawler-code/crawler-code.component';
import { CrawlerEditHistoryComponent }       from './sites/website/crawlers/crawler/crawler-edit-history/crawler-edit-history.component';


import { NewCrawlerComponent }               from './sites/website/crawlers/new-crawler/new-crawler.component';
import { CrawlerComponent }                  from './sites/website/crawlers/crawler/crawler.component';
import { StatusComponent }                   from './sites/website/status/status.component';

import { ColorPaletteComponent }             from './color-palette/color-palette.component';

import { DeveloperComponent }                from './developer/developer.component';
import { DeveloperOverallComponent }         from './developer/developer-overall/developer-overall.component';
import { DeveloperSettingsComponent }        from './developer/developer-settings/developer-settings.component';
import { DeveloperActivitiesComponent }      from './developer/developer-activities/developer-activities.component';
import { DeveloperProfileComponent }         from './developer/developer-profile/developer-profile.component';
import { DeveloperTasksComponent }           from './developer/developer-tasks/developer-tasks.component';
import { DeveloperNewTaskComponent }         from './developer/developer-tasks/developer-new-task/developer-new-task.component';
import { DeveloperTasksOverallComponent }    from './developer/developer-tasks/developer-tasks-overall/developer-tasks-overall.component';
import { DeveloperTaskComponent } from './developer/developer-tasks/developer-task/developer-task.component';

import { DeveloperInboxComponent }           from './developer/developer-inbox/developer-inbox.component';

import { ResourcesComponent }                from './resources/resources.component';
import { AdminComponent }                    from './admin/admin.component';
import { CrawlersPageComponent }             from './crawlers-page/crawlers-page.component';
import { DocsPageComponent }                 from './docs-page/docs-page.component';
import { DatabasePageComponent }             from './database-page/database-page.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'sites', component: SitesComponent, children: [
      { path: '', redirectTo: 'overall', pathMatch: 'full' },
      { path: 'overall', component: SitesOverallComponent},
      { path: 'new', component: NewSiteComponent},
      { path: ':siteName', component: WebsiteComponent, children: [
          { path: '', redirectTo: 'overall', pathMatch: 'full' },
          { path: 'overall', component: WebsiteOverallComponent},
          { path: 'mappers', component: MappersComponent},
          { path: 'status', component: StatusComponent},
          { path: 'data', component: WebsiteDataComponent},
          { path: 'users', component: WebsiteUsersComponent},
          { path: 'settings', component: SettingsComponent},
          { path: 'crawlers', component: CrawlersComponent, children: [
            { path: '', redirectTo: 'overall', pathMatch: 'full' },
            { path: 'overall', component: CrawlersOverallComponent},
            { path: 'new', component: NewCrawlerComponent},
            { path: ':crawlerId', component: CrawlerComponent, children: [
              { path: '', redirectTo: 'overall', pathMatch: 'full' },
              { path: 'overall', component: CrawlerOverallComponent},
              { path: 'code', component: CrawlerCodeComponent},
              { path: 'documentation', component: CrawlerDocumentationComponent},
              { path: 'settings', component: CrawlerSettingsComponent},
              { path: 'history', component: CrawlerEditHistoryComponent}
            ]}
          ]}
        ]
      }
  ]},
  { path: 'colors', component: ColorPaletteComponent},
  { path: 'resources', component: ResourcesComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'crawlers', component: CrawlersPageComponent},
  { path: 'developer', component: DeveloperComponent, children: [
      { path: '', redirectTo: 'overall', pathMatch: 'full' },
      { path: 'overall', component: DeveloperOverallComponent},
      { path: 'settings', component: DeveloperSettingsComponent},
      { path: 'activities', component: DeveloperActivitiesComponent},
      { path: 'profile', component: DeveloperProfileComponent},
      { path: 'tasks', component: DeveloperTasksComponent,children: [
        { path: '', redirectTo: 'overall', pathMatch: 'full' },
        { path: 'overall', component: DeveloperTasksOverallComponent},
        { path: 'new', component: DeveloperNewTaskComponent},
        { path: ':taskId', component: DeveloperTaskComponent}
      ]},
      { path: 'inbox', component: DeveloperInboxComponent}
  ]},
  { path: 'cluster', component: ClusterComponent, children: [
      { path: '', redirectTo: 'overall', pathMatch: 'full' },
      { path: 'overall', component: ClusterOverallComponent},
      { path: 'server/:serverId', component: ServerComponent}
  ]},
  { path: 'docs', component: DocsPageComponent},
  { path: 'database', component: DatabasePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule { }