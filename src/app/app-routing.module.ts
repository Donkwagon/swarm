import { NgModule }                          from '@angular/core';
import { Routes, RouterModule }              from '@angular/router';

import { SiteComponent }                     from './site/site.component';
import { PostsComponent }                    from './site/posts/posts.component';
import { AuthorsComponent }                  from './site/authors/authors.component';
import { EntrancesComponent }                from './site/entrances/entrances.component';
import { LogsComponent }                     from './site/logs/logs.component';
import { BacklogsComponent }                 from './site/backlogs/backlogs.component';
import { SitemapComponent }                  from './site/sitemap/sitemap.component';

import { ClusterComponent }                  from './cluster/cluster.component';

import { SitesComponent }                    from './sites/sites.component';
import { WebsiteComponent }                  from './sites/website/website.component';
import { MappersComponent }                  from './sites/website/mappers/mappers.component';
import { SettingsComponent }                 from './sites/website/settings/settings.component';
import { CrawlersComponent }                 from './sites/website/crawlers/crawlers.component';
import { NewCrawlerComponent }               from './sites/website/crawlers/new-crawler/new-crawler.component';
import { CrawlerComponent }                  from './sites/website/crawlers/crawler/crawler.component';
import { StatusComponent }                   from './sites/website/status/status.component';
import { NewSiteComponent }                  from './sites/new-site/new-site.component';

import { ColorPaletteComponent }             from './color-palette/color-palette.component';


const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full'},
  { path: 'sites', component: SitesComponent, children: [
      { path: 'new', component: NewSiteComponent},
      { path: ':siteName', component: WebsiteComponent, children: [
          { path: 'mappers', component: MappersComponent},
          { path: 'status', component: StatusComponent},
          { path: 'settings', component: SettingsComponent},
          { path: 'crawlers', component: CrawlersComponent, children: [
            { path: 'new', component: NewCrawlerComponent},
            { path: ':crawlerId', component: CrawlerComponent}
          ]}
        ]
      }
  ]},
  { path: 'colors', component: ColorPaletteComponent},
  { path: 'cluster', component: ClusterComponent},
  { path: 'site/:sitename', component: SiteComponent, children: [
      { path: '', redirectTo: 'site', pathMatch: 'full' },
      { path: 'sitemap', component: SitemapComponent},
      { path: 'posts', component: PostsComponent},
      { path: 'authors', component: AuthorsComponent},
      { path: 'entrances', component: EntrancesComponent},
      { path: 'backlogs', component: BacklogsComponent},
      { path: 'logs', component: LogsComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule { }
