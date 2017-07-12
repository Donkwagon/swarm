import { NgModule }                          from '@angular/core';
import { Routes, RouterModule }              from '@angular/router';

import { SiteComponent }                     from './site/site.component';
import { PostsComponent }                    from './site/posts/posts.component';
import { AuthorsComponent }                  from './site/authors/authors.component';
import { EntrancesComponent }                from './site/entrances/entrances.component';
import { BacklogsComponent }                 from './site/backlogs/backlogs.component';
import { SitemapComponent }                  from './site/sitemap/sitemap.component';

import { ClusterComponent }                  from './cluster/cluster.component';

import { SitesComponent }                    from './sites/sites.component';
import { SitesOverallComponent }             from './sites/sites-overall/sites-overall.component';

import { NewSiteComponent }                  from './sites/new-site/new-site.component';

import { WebsiteComponent }                  from './sites/website/website.component';
import { WebsiteOverallComponent }           from './sites/website/website-overall/website-overall.component';
import { MappersComponent }                  from './sites/website/mappers/mappers.component';
import { SettingsComponent }                 from './sites/website/settings/settings.component';
import { CrawlersComponent }                 from './sites/website/crawlers/crawlers.component';

import { CrawlersOverallComponent }          from './sites/website/crawlers/crawlers-overall/crawlers-overall.component';
import { CrawlerDocumentationComponent }     from './sites/website/crawlers/crawler/crawler-documentation/crawler-documentation.component';
import { CrawlerSettingsComponent }          from './sites/website/crawlers/crawler/crawler-settings/crawler-settings.component';
import { CrawlerOverallComponent }           from './sites/website/crawlers/crawler/crawler-overall/crawler-overall.component';
import { CrawlerCodeComponent }              from './sites/website/crawlers/crawler/crawler-code/crawler-code.component';


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
import { DeveloperInboxComponent }           from './developer/developer-inbox/developer-inbox.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full'},
  { path: 'sites', component: SitesComponent, children: [
      { path: '', redirectTo: 'overall', pathMatch: 'full' },
      { path: 'overall', component: SitesOverallComponent},
      { path: 'new', component: NewSiteComponent},
      { path: ':siteName', component: WebsiteComponent, children: [
          { path: '', redirectTo: 'overall', pathMatch: 'full' },
          { path: 'overall', component: WebsiteOverallComponent},
          { path: 'mappers', component: MappersComponent},
          { path: 'status', component: StatusComponent},
          { path: 'settings', component: SettingsComponent},
          { path: 'crawlers', component: CrawlersComponent, children: [
            { path: '', redirectTo: 'overall', pathMatch: 'full' },
            { path: 'overall', component: CrawlersOverallComponent},
            { path: 'new', component: CrawlerSettingsComponent},
            { path: ':crawlerId', component: CrawlerComponent, children: [
              { path: '', redirectTo: 'overall', pathMatch: 'full' },
              { path: 'overall', component: CrawlerOverallComponent},
              { path: 'code', component: CrawlerCodeComponent},
              { path: 'documentation', component: CrawlerDocumentationComponent},
              { path: 'settings', component: CrawlerSettingsComponent}
            ]}
          ]}
        ]
      }
  ]},
  { path: 'colors', component: ColorPaletteComponent},
  { path: 'developer', component: DeveloperComponent, children: [
      { path: '', redirectTo: 'overall', pathMatch: 'full' },
      { path: 'overall', component: DeveloperOverallComponent},
      { path: 'settings', component: DeveloperSettingsComponent},
      { path: 'activities', component: DeveloperActivitiesComponent},
      { path: 'profile', component: DeveloperProfileComponent},
      { path: 'tasks', component: DeveloperTasksComponent},
      { path: 'inbox', component: DeveloperInboxComponent}
  ]},
  { path: 'cluster', component: ClusterComponent},
  { path: 'site/:sitename', component: SiteComponent, children: [
      { path: '', redirectTo: 'site', pathMatch: 'full' },
      { path: 'sitemap', component: SitemapComponent},
      { path: 'posts', component: PostsComponent},
      { path: 'authors', component: AuthorsComponent},
      { path: 'entrances', component: EntrancesComponent},
      { path: 'backlogs', component: BacklogsComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule { }
